// ============================================
// PG QUOTA REGISTRATION PORTAL
// Frontend JavaScript (app.js) - Time-Based
// Phase 1: 6 slots per department (strict limit)
// Phase 2: Unlimited slots per department
// ============================================

// Configuration
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxXB1AvSRvz5LA0F3fTlNBFLLn0_PZJ0nMt5PuOwnh_6JVWuKyqYCUlk78u81_oY48/exec";
const STUDENT_DATA_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVGIPl0D_8tsJi38WRpOJrme6f-6EITTlKsepIAQj9jDqpAlG8AaeMjtsmUMFghwwRAeigIPlgN8Ru/pub?gid=0&single=true&output=csv";

const SLOTS_PER_DEPARTMENT = 6; // Only applies to Phase 1

// Student database (will be loaded from CSV)
let STUDENT_DATABASE = {};

// ============================================
// CSV PARSER
// ============================================
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    // Find column indices
    const enrolIdx = headers.findIndex(h => h === 'enrl no' || h === 'enrol no' || h === 'enrol');
    const nameIdx = headers.findIndex(h => h === 'name');
    const deptIdx = headers.findIndex(h => h === 'department');
    
    if (enrolIdx === -1 || nameIdx === -1 || deptIdx === -1) {
        console.error('Required columns not found in CSV');
        return {};
    }
    
    const database = {};
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // Skip empty lines
        
        // Handle CSV parsing properly (respecting quotes)
        const values = parseCSVLine(lines[i]);
        
        if (values.length < Math.max(enrolIdx, nameIdx, deptIdx) + 1) continue;
        
        const enrol = values[enrolIdx]?.trim();
        const name = values[nameIdx]?.trim();
        const department = values[deptIdx]?.trim();
        
        if (enrol && name && department) {
            database[enrol] = { name, department };
        }
    }
    
    return database;
}

// Helper function to parse a CSV line respecting quotes
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

// ============================================
// LOAD STUDENT DATA FROM CSV
// ============================================
async function loadStudentData() {
    try {
        console.log('📥 Loading student data from CSV...');
        const response = await fetch(STUDENT_DATA_CSV_URL);
        const csvText = await response.text();
        STUDENT_DATABASE = parseCSV(csvText);
        
        // Update ALL_DEPARTMENTS
        window.ALL_DEPARTMENTS = [...new Set(Object.values(STUDENT_DATABASE).map(s => s.department))].sort();
        
        console.log(`✅ Loaded ${Object.keys(STUDENT_DATABASE).length} students from CSV`);
        console.log(`📚 ${window.ALL_DEPARTMENTS.length} departments found`);
    } catch (error) {
        console.error('❌ Failed to load student data:', error);
        showAlert('Failed to load student data. Please refresh the page.', true);
    }
}

// ALL_DEPARTMENTS will be populated after CSV load
let ALL_DEPARTMENTS = [];

// ============================================
// GLOBAL STATE
// ============================================
let registrationsData = [];
let departmentSlots = {}; // Only used for Phase 1 display
let currentStudent = null;
let currentPhase = 'closed'; // 'phase1', 'phase2', 'closed'
let phase2RegistrationCount = 0; // Track Phase 2 total registrations
let userSubmissionPosition = null; // Track user's position in submissions

// DOM Elements
const enrolInput = document.getElementById('enrolNo');
const studentNameField = document.getElementById('studentName');
const studentDepartmentField = document.getElementById('studentDepartment');
const departmentContainer = document.getElementById('departmentContainer');
const departmentSlotInfo = document.getElementById('departmentSlotInfo');
const submitBtn = document.getElementById('submitBtn');
const alertPopup = document.getElementById('alertPopup');
const enrolError = document.getElementById('enrolError');
const statusContainer = document.getElementById('statusContainer');
const statusDisplay = document.getElementById('statusDisplay');
const selectionContainer = document.getElementById('selectionContainer');
const timerBox = document.getElementById('timerBox');
const timerText = document.getElementById('timerText');
const phaseInfo = document.getElementById('phaseInfo');
const phaseText = document.getElementById('phaseText');
const selectionLabel = document.getElementById('selectionLabel');
const phaseMessage = document.getElementById('phaseMessage');
const phaseMessageText = document.getElementById('phaseMessageText');
const phase2Stats = document.getElementById('phase2Stats');

// ============================================
// TIME-BASED PHASE DETECTION (IST = UTC+5:30)
// ============================================
function getCurrentPhase() {
    const now = new Date();

    // Convert to IST
    const istOffset = 5.5 * 60; // 5 hours 30 minutes in minutes
    const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    let istMinutes = utcMinutes + istOffset;
    if (istMinutes >= 1440) istMinutes -= 1440;
    if (istMinutes < 0) istMinutes += 1440;

    const totalMinutes = istMinutes;
    const day = now.getUTCDay();
    // Adjust day for IST
    const istDay = (utcMinutes + istOffset >= 1440) ? (day + 1) % 7 : day;

    // Thursday = 4
    const isThursday = (istDay === 4);

    // Phase 1: 6:20 AM to 7:20 AM (380 to 440 minutes)
    const phase1Start = 6 * 60 + 20; // 380 (6:20 AM)
    const phase1End = 7 * 60 + 20; // 440 (7:20 AM)

    // Phase 2: 7:20 AM to 8:45 AM (440 to 525 minutes)
    const phase2Start = 7 * 60 + 20; // 440 (7:20 AM)
    const phase2End = 8 * 60 + 45; // 525 (8:45 AM)

    if (!isThursday) return 'closed';
    if (totalMinutes >= phase1Start && totalMinutes < phase1End) return 'phase1';
    if (totalMinutes >= phase2Start && totalMinutes < phase2End) return 'phase2';
    return 'closed';
}

// ============================================
// TIMER UI
// ============================================
function updateTimer() {
    currentPhase = getCurrentPhase();

    if (currentPhase === 'phase1') {
        timerBox.className = 'timer-box';
        timerText.innerHTML = '<i class="fas fa-clock mr-1"></i> Phase 1: Department Registration Open (6 slots per dept)';
        phaseInfo.classList.remove('hidden');
        phaseInfo.className = 'info-banner';
        phaseText.textContent = 'Phase 1: Each department has 6 slots. First come, first served. (6:20 AM - 7:20 AM)';
        selectionLabel.textContent = 'Confirm Your Department Registration';

    } else if (currentPhase === 'phase2') {
        timerBox.className = 'timer-box';
        timerText.innerHTML = '<i class="fas fa-clock mr-1"></i> Phase 2: Open Registration (No per-department limit)';
        phaseInfo.classList.remove('hidden');
        phaseInfo.className = 'info-banner';
        phaseText.textContent = 'Phase 2: Registration is open to everyone. No department limits. (7:20 AM - 8:45 AM)';
        selectionLabel.textContent = 'Register Now';

    } else {
        timerBox.className = 'timer-box timer-closed';
        timerText.innerHTML = '<i class="fas fa-lock mr-1"></i> Registration Closed';
        phaseInfo.classList.remove('hidden');
        phaseInfo.className = 'info-banner';
        phaseText.textContent = 'Registration only open on Thursdays from 6:20 AM to 8:45 AM IST.';
    }
}

// ============================================
// INIT
// ============================================
setupEventListeners();

(async function init() {
    // Load student data from CSV first
    await loadStudentData();
    
    await loadRegistrationsData();
    analyzeRegistrations();
    computeDepartmentSlots();
    updateTimer();
    updateUIForPhase();

    console.log('🚀 Portal ready - Phase 1: 6/dept | Phase 2: Unlimited submissions');
    console.log(`📚 Departments: ${ALL_DEPARTMENTS.length} | Students: ${Object.keys(STUDENT_DATABASE).length}`);

    // Check phase every 30 seconds
    setInterval(() => {
        const newPhase = getCurrentPhase();
        if (newPhase !== currentPhase) {
            currentPhase = newPhase;
            updateTimer();
            updateUIForPhase();
            if (currentStudent) {
                checkExistingRegistration();
                renderSelectionCard();
            }
        }
    }, 30000);

    // Background refresh
    setInterval(async () => {
        await loadRegistrationsData();
        analyzeRegistrations();
        computeDepartmentSlots();
        if (currentStudent) {
            checkExistingRegistration();
            renderSelectionCard();
        }
        updateUIForPhase();
    }, 15000);
})();

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    let debounceTimeout;

    enrolInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
            if (val.length > 0) {
                lookupStudent(val);
            } else {
                resetStudentUI();
            }
        }, 300);
    });

    submitBtn.addEventListener('click', submitRegistration);
}

// ============================================
// STUDENT LOOKUP
// ============================================
function lookupStudent(enrol) {
    const cleanEnrol = String(enrol).trim();

    if (!cleanEnrol) {
        resetStudentUI();
        return;
    }

    // Check if student data is loaded
    if (Object.keys(STUDENT_DATABASE).length === 0) {
        enrolError.textContent = "⏳ Loading student data... Please wait.";
        enrolError.classList.remove("hidden");
        return;
    }

    // If registration is closed, show status only
    if (currentPhase === 'closed') {
        enrolError.textContent = "🔒 Registration is currently closed. Opens Thursday 6:20 AM - 8:45 AM.";
        enrolError.classList.remove("hidden");
        const studentData = STUDENT_DATABASE[cleanEnrol];
        if (studentData) {
            currentStudent = {
                enrol: cleanEnrol,
                name: studentData.name,
                department: studentData.department
            };
            studentNameField.value = currentStudent.name;
            studentDepartmentField.value = currentStudent.department;
            checkExistingRegistration();
            selectionContainer.classList.add('hidden');
            statusContainer.classList.remove('hidden');
            if (!registrationsData.some(r => String(r.enrol).trim() === cleanEnrol && r.department)) {
                statusDisplay.innerHTML = `<span class="status-badge status-not-submitted"><i class="fas fa-times-circle mr-1"></i> Not yet registered</span>`;
            }
        } else {
            resetStudentUI();
            enrolError.textContent = "❌ Enrolment number not found in database";
            enrolError.classList.remove("hidden");
        }
        return;
    }

    const studentData = STUDENT_DATABASE[cleanEnrol];

    if (!studentData) {
        enrolError.textContent = "❌ Enrolment number not found in database";
        enrolError.classList.remove("hidden");
        resetStudentUI();
        return;
    }

    enrolError.classList.add("hidden");

    currentStudent = {
        enrol: cleanEnrol,
        name: studentData.name,
        department: studentData.department
    };

    studentNameField.value = currentStudent.name;
    studentDepartmentField.value = currentStudent.department;

    checkExistingRegistration();
    renderSelectionCard();
}

function checkExistingRegistration() {
    const existingRegistration = registrationsData.find(r =>
        String(r.enrol).trim() === String(currentStudent.enrol).trim()
    );

    if (existingRegistration && existingRegistration.department) {
        statusContainer.classList.remove("hidden");
        const regPhase = existingRegistration.phase || 'unknown';
        const regDate = existingRegistration.submission_date || '';
        
        // Find user's position in all submissions
        const allSubmissions = registrationsData
            .filter(r => r.department && r.submission_date)
            .sort((a, b) => new Date(a.submission_date) - new Date(b.submission_date));
        
        const userPosition = allSubmissions.findIndex(r => 
            String(r.enrol).trim() === String(currentStudent.enrol).trim()
        ) + 1;
        
        let phaseLabel = '';
        if (regPhase === 'phase1') {
            phaseLabel = 'Phase 1 (Department Phase)';
        } else if (regPhase === 'phase2') {
            phaseLabel = 'Phase 2 (Open Phase)';
        } else {
            phaseLabel = regPhase;
        }
        
        statusDisplay.innerHTML = `
            <span class="status-badge status-submitted">
                <i class="fas fa-check-circle mr-1"></i> 
                Already Registered (${phaseLabel})<br>
                <small>Department: ${existingRegistration.department}</small><br>
                <small>Position: #${userPosition} of ${allSubmissions.length}</small><br>
                <small>Time: ${regDate}</small>
            </span>
        `;
        selectionContainer.classList.add("hidden");
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";
        submitBtn.style.cursor = "not-allowed";
    } else {
        statusContainer.classList.add("hidden");
        if (currentPhase !== 'closed') {
            selectionContainer.classList.remove("hidden");
        }
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    }
}

function resetStudentUI() {
    studentNameField.value = '';
    studentDepartmentField.value = '';
    currentStudent = null;
    statusContainer.classList.add("hidden");
    selectionContainer.classList.add("hidden");
    departmentContainer.innerHTML = '';
    departmentSlotInfo.innerHTML = '';
    phase2Stats.classList.add('hidden');
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
    userSubmissionPosition = null;
}

// ============================================
// LOAD REGISTRATIONS
// ============================================
async function loadRegistrationsData() {
    try {
        const response = await fetch(`${APPS_SCRIPT_URL}?action=getAllRegistrations&t=${Date.now()}`);
        const data = await response.json();

        if (data.error) {
            console.error("Error loading registrations:", data.error);
            return;
        }

        if (Array.isArray(data)) {
            registrationsData = data;
        } else if (data.data && Array.isArray(data.data)) {
            registrationsData = data.data;
        }

        console.log(`✅ Loaded ${registrationsData.length} registrations`);
    } catch (err) {
        console.warn("Registrations fetch failed:", err);
    }
}

// ============================================
// ANALYZE REGISTRATIONS
// ============================================
function analyzeRegistrations() {
    // Count Phase 2 registrations
    phase2RegistrationCount = 0;
    
    for (const reg of registrationsData) {
        const phase = reg.phase || 'phase1';
        
        if (phase === 'phase2') {
            phase2RegistrationCount++;
        }
    }
    
    console.log(`Phase 1: ${registrationsData.filter(r => (r.phase || 'phase1') === 'phase1').length} registrations`);
    console.log(`Phase 2: ${phase2RegistrationCount} registrations`);
}

// ============================================
// DEPARTMENT SLOTS (Phase 1 only)
// ============================================
function computeDepartmentSlots() {
    departmentSlots = {};
    
    // Initialize all departments with 0 filled
    ALL_DEPARTMENTS.forEach(dept => {
        departmentSlots[dept] = { filled: 0, remaining: SLOTS_PER_DEPARTMENT };
    });
    
    // Count Phase 1 registrations per department
    for (const reg of registrationsData) {
        const dept = reg.department;
        const phase = reg.phase || 'phase1';
        
        if (phase === 'phase1' && dept && departmentSlots[dept] !== undefined) {
            departmentSlots[dept].filled++;
            departmentSlots[dept].remaining = Math.max(0, SLOTS_PER_DEPARTMENT - departmentSlots[dept].filled);
        }
    }
    
    console.log('Department slots (Phase 1):', 
        Object.entries(departmentSlots).map(([dept, data]) => `${dept}: ${data.filled}/${SLOTS_PER_DEPARTMENT}`));
}

// ============================================
// RENDER SELECTION CARD
// ============================================
function renderSelectionCard() {
    if (!currentStudent) {
        departmentContainer.innerHTML = '';
        departmentSlotInfo.innerHTML = '';
        phase2Stats.classList.add('hidden');
        return;
    }

    if (currentPhase === 'phase1') {
        renderPhase1Card();
    } else if (currentPhase === 'phase2') {
        renderPhase2Card();
    }
}

function renderPhase1Card() {
    const dept = currentStudent.department;
    const deptData = departmentSlots[dept];
    const remaining = deptData ? deptData.remaining : 0;
    const filled = deptData ? deptData.filled : 0;
    const available = remaining > 0;
    const isAlreadyRegistered = registrationsData.some(r =>
        String(r.enrol).trim() === String(currentStudent.enrol).trim() && r.department
    );

    phaseMessage.classList.remove('hidden');
    phaseMessageText.innerHTML = `
        <strong>Phase 1:</strong> ${filled}/${SLOTS_PER_DEPARTMENT} slots filled in ${dept}. 
        ${remaining > 0 ? `<span class="text-emerald-700 font-semibold">${remaining} slots remaining</span>` : '<span class="text-red-600 font-semibold">DEPARTMENT FULL</span>'}
    `;

    let cardHtml = '';

    if (isAlreadyRegistered) {
        cardHtml = `
            <div class="department-card disabled">
                <h3 class="font-semibold text-gray-800 text-sm mb-2">${dept}</h3>
                <div class="slot-badge ${!available ? 'slot-full' : 'bg-emerald-100 text-emerald-700'}">
                    ${remaining} slots left
                </div>
                <p class="text-xs text-gray-500 mt-2"><i class="fas fa-check-circle text-green-600 mr-1"></i> Already registered</p>
            </div>
        `;
        departmentSlotInfo.innerHTML = '';
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";
        submitBtn.style.cursor = "not-allowed";
    } else if (!available) {
        cardHtml = `
            <div class="department-card disabled">
                <h3 class="font-semibold text-gray-800 text-sm mb-2">${dept}</h3>
                <div class="slot-badge slot-full">
                    <i class="fas fa-ban mr-1"></i> Full (${SLOTS_PER_DEPARTMENT}/${SLOTS_PER_DEPARTMENT})
                </div>
                <p class="text-xs text-red-500 mt-2">
                    <i class="fas fa-clock mr-1"></i> Your department is full. 
                    <br>Please wait for <strong>Phase 2 at 7:20 AM</strong> (no department limits).
                </p>
            </div>
        `;
        departmentSlotInfo.innerHTML = '<i class="fas fa-exclamation-triangle mr-1 text-red-500"></i> Department full! Phase 2 opens at 7:20 AM with no per-department limits.';
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";
        submitBtn.style.cursor = "not-allowed";
    } else {
        cardHtml = `
            <div class="department-card highlight cursor-pointer hover:shadow-md transition-all selected" 
                 onclick="selectDepartment('${dept.replace(/'/g, "\\'")}')" 
                 data-department="${dept}">
                <h3 class="font-semibold text-gray-800 text-sm mb-2">${dept}</h3>
                <div class="slot-badge bg-emerald-100 text-emerald-700">
                    <i class="fas fa-circle text-green-500 mr-1" style="font-size: 0.5rem;"></i>
                    ${remaining} slots left
                </div>
                <p class="text-xs text-emerald-600 mt-2">
                    <i class="fas fa-hand-pointer mr-1"></i> Click to register (Phase 1)
                </p>
            </div>
        `;
        departmentSlotInfo.innerHTML = `<i class="fas fa-info-circle mr-1"></i> ${remaining} slots remaining for ${dept}. Register now!`;
        window._selectedDepartment = dept;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    }

    departmentContainer.innerHTML = cardHtml;
    phase2Stats.classList.add('hidden');
}

function renderPhase2Card() {
    const isAlreadyRegistered = registrationsData.some(r =>
        String(r.enrol).trim() === String(currentStudent.enrol).trim() && r.department
    );

    phaseMessage.classList.remove('hidden');
    phaseMessageText.innerHTML = `
        <strong>Phase 2:</strong> Open registration - No department limits! 
        <span class="text-blue-700 font-semibold">Everyone can register</span>
    `;

    let cardHtml = '';

    if (isAlreadyRegistered) {
        cardHtml = `
            <div class="global-slot-card disabled">
                <span class="phase-indicator phase-2">Phase 2</span>
                <h3 class="font-semibold text-gray-800 mb-2">Already Registered</h3>
                <p class="text-sm text-gray-500"><i class="fas fa-check-circle text-green-600 mr-1"></i> You have already secured a slot.</p>
            </div>
        `;
        departmentSlotInfo.innerHTML = '';
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";
        submitBtn.style.cursor = "not-allowed";
    } else {
        cardHtml = `
            <div class="global-slot-card cursor-pointer hover:shadow-md transition-all selected" 
                 onclick="selectDepartment('${currentStudent.department.replace(/'/g, "\\'")}')">
                <span class="phase-indicator phase-2">Phase 2</span>
                <h3 class="font-semibold text-gray-800 mb-2">
                    <i class="fas fa-unlock mr-2"></i> Open Registration
                </h3>
                <p class="text-sm text-gray-600">No department limits</p>
                <p class="text-xs text-emerald-600 mt-2 font-semibold">
                    <i class="fas fa-hand-pointer mr-1"></i> Click to register now!
                </p>
                <p class="text-xs text-gray-500 mt-1">Department: ${currentStudent.department}</p>
            </div>
        `;
        departmentSlotInfo.innerHTML = '<i class="fas fa-info-circle mr-1 text-blue-600"></i> Phase 2: Open registration - No per-department limits. Register now!';
        window._selectedDepartment = currentStudent.department;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    }

    departmentContainer.innerHTML = cardHtml;
    
    // Show Phase 2 stats
    phase2Stats.classList.remove('hidden');
    phase2Stats.innerHTML = `
        <i class="fas fa-chart-bar mr-1"></i> 
        <strong>Phase 2 Statistics:</strong> ${phase2RegistrationCount} registrations so far
    `;
}

// Global function for department selection
window.selectDepartment = function(department) {
    if (!currentStudent) {
        showAlert("Please enter a valid enrolment number first");
        return;
    }

    const alreadyRegistered = registrationsData.some(r =>
        String(r.enrol).trim() === String(currentStudent.enrol).trim() && r.department
    );

    if (alreadyRegistered) {
        showAlert("You have already registered. Registration cannot be changed.");
        return;
    }

    // Phase 1: Check department slots (6 per department limit applies)
    if (currentPhase === 'phase1') {
        const remaining = departmentSlots[department] ? departmentSlots[department].remaining : 0;
        if (remaining <= 0) {
            showAlert(`Your department is full (${SLOTS_PER_DEPARTMENT}/${SLOTS_PER_DEPARTMENT}). Please wait for Phase 2 at 7:20 AM.`);
            return;
        }
    }

    // Phase 2: No limits - everyone can register
    if (currentPhase === 'phase2') {
        showAlert(`✅ Ready to register for ${department} (Phase 2 - Open Registration)`, false);
        return;
    }

    window._selectedDepartment = department;
    showAlert(`✅ Ready to register for ${department} (Phase 1 - ${departmentSlots[department].remaining} slots remaining)`, false);
};

// ============================================
// UPDATE UI FOR PHASE
// ============================================
function updateUIForPhase() {
    if (currentPhase === 'closed') {
        enrolInput.placeholder = "Registration closed - enter number to check status";
    } else if (currentPhase === 'phase1') {
        enrolInput.placeholder = "Enter enrolment number (Phase 1: 6 slots/dept)";
    } else {
        enrolInput.placeholder = "Enter enrolment number (Phase 2: Open registration)";
    }

    if (!currentStudent && currentPhase !== 'closed') {
        selectionContainer.classList.add('hidden');
    }

    if (currentStudent) {
        renderSelectionCard();
    }
}

// ============================================
// SUBMIT REGISTRATION
// ============================================
async function submitRegistration() {
    if (!currentStudent) {
        showAlert("❌ Please enter a valid enrolment number first.");
        return;
    }

    if (currentPhase === 'closed') {
        showAlert("🔒 Registration is closed. Opens Thursday 6:20 AM - 8:45 AM IST.");
        return;
    }

    const alreadyRegistered = registrationsData.some(r =>
        String(r.enrol).trim() === String(currentStudent.enrol).trim() && r.department
    );

    if (alreadyRegistered) {
        showAlert("✅ You have already registered. Registration cannot be changed.");
        return;
    }

    const dept = window._selectedDepartment || currentStudent.department;

    // ============================================
    // PHASE 1: Check 6 per department limit
    // ============================================
    if (currentPhase === 'phase1') {
        const deptData = departmentSlots[dept];
        if (!deptData || deptData.remaining <= 0) {
            showAlert(`❌ Your department (${dept}) has reached its ${SLOTS_PER_DEPARTMENT}-slot limit. Please wait for Phase 2.`);
            renderPhase1Card();
            return;
        }
    }

    // Phase 2: No limit check needed

    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loading-spinner"></div> Submitting...';

    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                action: "updateStatus",
                enrolNo: currentStudent.enrol,
                department: dept,
                name: currentStudent.name,
                phase: currentPhase, // 'phase1' or 'phase2'
                registrationTime: new Date().toISOString()
            })
        });

        const result = await response.json();

        if (result.success) {
            // Add to local data
            registrationsData.push({
                enrol: currentStudent.enrol,
                name: currentStudent.name,
                department: dept,
                phase: currentPhase,
                submission_date: new Date().toISOString()
            });

            // Update tracking
            if (currentPhase === 'phase2') {
                phase2RegistrationCount++;
            }

            computeDepartmentSlots();

            // Find user's position
            const allSubmissions = registrationsData
                .filter(r => r.department && r.submission_date)
                .sort((a, b) => new Date(a.submission_date) - new Date(b.submission_date));
            
            const userPosition = allSubmissions.findIndex(r => 
                String(r.enrol).trim() === String(currentStudent.enrol).trim()
            ) + 1;

            const phaseLabel = currentPhase === 'phase2' ? 'Phase 2 (Open)' : 'Phase 1 (Department)';
            showAlert(`✅ Success! Registered for ${dept} via ${phaseLabel}. Position: #${userPosition}`, false);

            statusContainer.classList.remove("hidden");
            statusDisplay.innerHTML = `
                <span class="status-badge status-submitted">
                    <i class="fas fa-check-circle mr-1"></i> 
                    Registered for ${dept} (${phaseLabel})<br>
                    <small>Position: #${userPosition} of ${allSubmissions.length}</small><br>
                    <small>Time: ${new Date().toLocaleString()}</small>
                </span>
            `;
            selectionContainer.classList.add("hidden");
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.6";
            submitBtn.style.cursor = "not-allowed";
            
            // Update the timer display
            updateTimer();
        } else {
            showAlert(`❌ Registration failed: ${result.error || "Unknown error"}`);
            await loadRegistrationsData();
            analyzeRegistrations();
            computeDepartmentSlots();
            renderSelectionCard();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.style.opacity = "1";
            submitBtn.style.cursor = "pointer";
        }
    } catch (error) {
        console.error("Submit error:", error);
        showAlert("Network error. Please try again.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    }
}

// ============================================
// UI HELPERS
// ============================================
function showAlert(message, isError = true) {
    alertPopup.textContent = message;
    alertPopup.style.background = isError ? "#dc2626" : "#059669";
    alertPopup.classList.add('show');
    setTimeout(() => {
        alertPopup.classList.remove('show');
    }, 4000);
}

// ============================================
// SECURITY
// ============================================
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

document.addEventListener("keydown", function(e) {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && (e.key === "u" || e.key === "U"))
    ) {
        e.preventDefault();
    }
});

console.log('%c🌟 PG Quota Portal - Phase 1: 6/dept | Phase 2: Unlimited 🌟', 'color: #059669; font-size: 16px; font-weight: bold;');
