// ============================================
// PG QUOTA REGISTRATION PORTAL
// Frontend JavaScript (app.js) - Time-Based
// ============================================

// Configuration
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw6am8LEttl7cg3WXNGEe1FooeNvKDv-ED9MqbB-U-ctX7uuymy8Gfs7ptZOYPwEKFo/exec";

const SLOTS_PER_DEPARTMENT = 6;
const EXTRA_SLOTS = 10;
const TOTAL_TARGET_SLOTS = 100;

// Phase 1: Saturday 9:20 PM - 9:25 PM (department-based, 6 slots each)
// Phase 2: Saturday 9:25 PM - 9:30 PM (global pool: remaining slots + 10)
// Closed: All other times

// Complete student database with departments
const STUDENT_DATABASE = {
    "16074": { name: "Abdul Hadhi E", department: "Quran and Related Sciences" },
    "16075": { name: "Fasil Zaman Pk", department: "Quran and Related Sciences" },
    "16077": { name: "Muhammed Shamil M", department: "Quran and Related Sciences" }
    // ... all other students data remains the same ...
};

const ALL_DEPARTMENTS = [...new Set(Object.values(STUDENT_DATABASE).map(s => s.department))];

// ============================================
// GLOBAL STATE
// ============================================
let registrationsData = [];
let departmentSlots = {};
let currentStudent = null;
let currentPhase = 'closed'; // 'phase1', 'phase2', 'closed'
let globalRemainingSlots = 0;
let globalTotalSlots = 0;

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
const timerCountdown = document.getElementById('timerCountdown');
const phaseInfo = document.getElementById('phaseInfo');
const phaseText = document.getElementById('phaseText');
const selectionLabel = document.getElementById('selectionLabel');
const phaseMessage = document.getElementById('phaseMessage');
const phaseMessageText = document.getElementById('phaseMessageText');

// ============================================
// TIME-BASED PHASE DETECTION (IST = UTC+5:30)
// ============================================
function getCurrentPhase() {
    const now = new Date();
    
    // Convert to IST
    const istOffset = 5.5 * 60;
    const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    let istMinutes = utcMinutes + istOffset;
    if (istMinutes >= 1440) istMinutes -= 1440;
    if (istMinutes < 0) istMinutes += 1440;
    
    const istHours = Math.floor(istMinutes / 60);
    const istMins = istMinutes % 60;
    const totalMinutes = istHours * 60 + istMins;
    const day = now.getUTCDay();
    // Adjust day for IST
    const istDay = (utcMinutes + istOffset >= 1440) ? (day + 1) % 7 : day;
    
    // Saturday = 6
    const isSaturday = (istDay === 6);
    
    // Phase 1: Saturday 9:20 PM to 9:25 PM
    // 9:20 PM = 21:20 = 21*60+20 = 1280 minutes
    // 9:25 PM = 21:25 = 21*60+25 = 1285 minutes
    const phase1Start = 21 * 60 + 20; // 1280 (9:20 PM)
    const phase1End = 21 * 60 + 25;   // 1285 (9:25 PM)
    
    // Phase 2: Saturday 9:25 PM to 9:30 PM
    // 9:25 PM = 21:25 = 21*60+25 = 1285 minutes
    // 9:30 PM = 21:30 = 21*60+30 = 1290 minutes
    const phase2Start = 21 * 60 + 25;  // 1285 (9:25 PM)
    const phase2End = 21 * 60 + 30;    // 1290 (9:30 PM)
    
    if (!isSaturday) return 'closed';
    if (totalMinutes >= phase1Start && totalMinutes < phase1End) return 'phase1';
    if (totalMinutes >= phase2Start && totalMinutes < phase2End) return 'phase2';
    return 'closed';
}

function getNextSaturdayInfo() {
    const now = new Date();
    const istOffset = 5.5 * 60;
    const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    let istMinutes = utcMinutes + istOffset;
    if (istMinutes >= 1440) istMinutes -= 1440;
    if (istMinutes < 0) istMinutes += 1440;
    
    const day = now.getUTCDay();
    const istDay = (utcMinutes + istOffset >= 1440) ? (day + 1) % 7 : day;
    
    let targetSaturday = new Date(now);
    let daysUntilSaturday = (6 - istDay + 7) % 7; // 6 = Saturday
    
    const phase1StartMinutes = 21 * 60 + 20; // 9:20 PM
    const currentTotalMinutes = istMinutes;
    
    if (daysUntilSaturday === 0 && currentTotalMinutes >= phase1StartMinutes) {
        daysUntilSaturday = 7; // Next Saturday
    }
    if (daysUntilSaturday === 0 && currentTotalMinutes < phase1StartMinutes) {
        daysUntilSaturday = 0; // Today is Saturday before 9:20 PM
    }
    
    targetSaturday.setDate(now.getDate() + daysUntilSaturday);
    targetSaturday.setUTCHours(21 - 5.5, 20, 0, 0); // 9:20 PM IST (21:20)
    
    return targetSaturday;
}

// ============================================
// TIMER UI
// ============================================
function updateTimer() {
    currentPhase = getCurrentPhase();
    
    if (currentPhase === 'phase1') {
        timerBox.className = 'timer-box';
        timerText.innerHTML = '<i class="fas fa-clock mr-1"></i> Phase 1: Department Registration Open';
        
        const now = new Date();
        const phase1End = new Date(now);
        phase1End.setUTCHours(21 - 5.5, 25, 0, 0); // 9:25 PM IST (21:25)
        
        const diff = phase1End - now;
        if (diff > 0) {
            const mins = Math.floor(diff / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            timerCountdown.textContent = `Closes in: ${mins}m ${secs}s | 6 slots per department`;
        }
        
        phaseInfo.classList.remove('hidden');
        phaseInfo.className = 'info-banner';
        phaseText.textContent = 'Phase 1: Select your department (6 slots each). First come, first served.';
        selectionLabel.textContent = 'Confirm Your Department Registration';
        
    } else if (currentPhase === 'phase2') {
        timerBox.className = 'timer-box';
        timerText.innerHTML = '<i class="fas fa-clock mr-1"></i> Phase 2: Global Pool Open';
        
        const now = new Date();
        const phase2End = new Date(now);
        phase2End.setUTCHours(21 - 5.5, 30, 0, 0); // 9:30 PM IST (21:30)
        
        const diff = phase2End - now;
        if (diff > 0) {
            const mins = Math.floor(diff / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            timerCountdown.textContent = `Closes in: ${mins}m ${secs}s | Global pool: ${globalRemainingSlots} slots`;
        }
        
        phaseInfo.classList.remove('hidden');
        phaseInfo.className = 'info-banner';
        phaseText.textContent = `Phase 2: ${globalRemainingSlots} global slots available (remaining +10). Any department student can apply.`;
        selectionLabel.textContent = 'Register Now (Global Pool)';
        
    } else {
        timerBox.className = 'timer-box timer-closed';
        timerText.innerHTML = '<i class="fas fa-lock mr-1"></i> Registration Closed';
        
        const nextSaturday = getNextSaturdayInfo();
        const diff = nextSaturday - new Date();
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            timerCountdown.textContent = `Opens in: ${days}d ${hours}h ${mins}m ${secs}s (Saturday 9:20 PM)`;
        }
        
        phaseInfo.classList.remove('hidden');
        phaseInfo.className = 'info-banner';
        phaseText.textContent = 'Registration is only open on Saturdays from 9:20 PM to 9:30 PM IST.';
    }
}

// ============================================
// INIT
// ============================================
setupEventListeners();

(async function init() {
    await loadRegistrationsData();
    computeDepartmentSlots();
    calculateGlobalSlots();
    updateTimer();
    updateUIForPhase();
    
    console.log('✅ Portal ready');
    
    // Update timer every second
    setInterval(() => {
        updateTimer();
        updateUIForPhase();
    }, 1000);
    
    // Background refresh
    setInterval(async () => {
        await loadRegistrationsData();
        computeDepartmentSlots();
        calculateGlobalSlots();
        if (currentStudent) {
            checkExistingRegistration();
            renderSelectionCard();
        }
        updateUIForPhase();
    }, 30000);
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
    
    if (currentPhase === 'closed') {
        enrolError.textContent = "❌ Registration is currently closed. Opens Saturday 9:20 PM - 9:30 PM IST.";
        enrolError.classList.remove("hidden");
        resetStudentUI();
        return;
    }
    
    const studentData = STUDENT_DATABASE[cleanEnrol];
    
    if (!studentData) {
        enrolError.textContent = "❌ Enrolment number not found";
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
        statusDisplay.innerHTML = `<span class="status-badge status-submitted"><i class="fas fa-check-circle mr-1"></i> Already Registered for ${existingRegistration.department}</span>`;
        selectionContainer.classList.add("hidden");
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";
        submitBtn.style.cursor = "not-allowed";
    } else {
        statusContainer.classList.add("hidden");
        selectionContainer.classList.remove("hidden");
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
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
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
        
        console.log(`📋 Loaded ${registrationsData.length} registrations`);
    } catch (err) {
        console.warn("Registrations fetch failed");
    }
}

// ============================================
// DEPARTMENT SLOTS
// ============================================
function computeDepartmentSlots() {
    departmentSlots = {};
    ALL_DEPARTMENTS.forEach(dept => {
        departmentSlots[dept] = { filled: 0, remaining: SLOTS_PER_DEPARTMENT };
    });
    
    for (const reg of registrationsData) {
        const dept = reg.department;
        if (dept && departmentSlots[dept] !== undefined) {
            departmentSlots[dept].filled++;
        }
    }
    
    ALL_DEPARTMENTS.forEach(dept => {
        departmentSlots[dept].remaining = Math.max(0, SLOTS_PER_DEPARTMENT - departmentSlots[dept].filled);
    });
}

function calculateGlobalSlots() {
    let totalRemaining = 0;
    ALL_DEPARTMENTS.forEach(dept => {
        totalRemaining += departmentSlots[dept].remaining;
    });
    
    globalRemainingSlots = totalRemaining + EXTRA_SLOTS;
    globalTotalSlots = globalRemainingSlots;
}

// ============================================
// RENDER SELECTION CARD
// ============================================
function renderSelectionCard() {
    if (!currentStudent) {
        departmentContainer.innerHTML = '';
        departmentSlotInfo.innerHTML = '';
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
    const available = remaining > 0;
    const isAlreadyRegistered = registrationsData.some(r => 
        String(r.enrol).trim() === String(currentStudent.enrol).trim() && r.department
    );
    
    phaseMessage.classList.remove('hidden');
    phaseMessageText.textContent = `Phase 1: ${remaining} of ${SLOTS_PER_DEPARTMENT} slots remaining in ${dept}. Select to register.`;
    
    let cardHtml = '';
    
    if (isAlreadyRegistered) {
        cardHtml = `
            <div class="department-card disabled">
                <h3 class="font-semibold text-gray-800 text-sm mb-2">${dept}</h3>
                <div class="slot-badge ${!available ? 'slot-full' : 'bg-emerald-100 text-emerald-700'}">
                    ${remaining} slots left
                </div>
                <p class="text-xs text-gray-500 mt-2">Already registered</p>
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
                <div class="slot-badge slot-full">Full</div>
                <p class="text-xs text-red-500 mt-2">No slots available. Try Phase 2.</p>
            </div>
        `;
        departmentSlotInfo.innerHTML = '<i class="fas fa-exclamation-triangle mr-1 text-red-500"></i> All slots filled. Wait for Phase 2 (9:25 PM).';
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
                    ${remaining} slots left
                </div>
                <p class="text-xs text-emerald-600 mt-2">Click to select</p>
            </div>
        `;
        departmentSlotInfo.innerHTML = `<i class="fas fa-info-circle mr-1"></i> ${remaining} slots remaining for ${dept}`;
        window._selectedDepartment = dept;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    }
    
    departmentContainer.innerHTML = cardHtml;
}

function renderPhase2Card() {
    const isAlreadyRegistered = registrationsData.some(r => 
        String(r.enrol).trim() === String(currentStudent.enrol).trim() && r.department
    );
    
    phaseMessage.classList.remove('hidden');
    phaseMessageText.textContent = `Phase 2: ${globalRemainingSlots} global slots available (any department). First come, first served.`;
    
    let cardHtml = '';
    
    if (isAlreadyRegistered) {
        cardHtml = `
            <div class="global-slot-card disabled">
                <span class="phase-indicator phase-2">Phase 2 - Global Pool</span>
                <h3 class="font-semibold text-gray-800 mb-2">Already Registered</h3>
                <p class="text-sm text-gray-500">You have already secured a slot.</p>
            </div>
        `;
        departmentSlotInfo.innerHTML = '';
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";
        submitBtn.style.cursor = "not-allowed";
    } else if (globalRemainingSlots <= 0) {
        cardHtml = `
            <div class="global-slot-card disabled">
                <span class="phase-indicator phase-closed">Phase 2 - Global Pool</span>
                <h3 class="font-semibold text-gray-800 mb-2">All Slots Filled</h3>
                <p class="text-sm text-red-500">No more slots available. Try next Saturday.</p>
            </div>
        `;
        departmentSlotInfo.innerHTML = '<i class="fas fa-exclamation-triangle mr-1 text-red-500"></i> All slots exhausted.';
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";
        submitBtn.style.cursor = "not-allowed";
    } else {
        cardHtml = `
            <div class="global-slot-card cursor-pointer hover:shadow-md transition-all selected" 
                 onclick="selectDepartment('${currentStudent.department.replace(/'/g, "\\'")}')">
                <span class="phase-indicator phase-2">Phase 2 - Global Pool</span>
                <h3 class="font-semibold text-gray-800 mb-2">Register Now</h3>
                <div class="text-3xl font-bold text-emerald-700 mb-1">${globalRemainingSlots}</div>
                <p class="text-sm text-gray-600">slots remaining</p>
                <p class="text-xs text-emerald-600 mt-2">Click to claim your slot</p>
            </div>
        `;
        departmentSlotInfo.innerHTML = `<i class="fas fa-info-circle mr-1"></i> ${globalRemainingSlots} global slots available. Register quickly!`;
        window._selectedDepartment = currentStudent.department;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    }
    
    departmentContainer.innerHTML = cardHtml;
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
    
    if (currentPhase === 'phase1') {
        const remaining = departmentSlots[department] ? departmentSlots[department].remaining : 0;
        if (remaining <= 0) {
            showAlert(`No available slots for ${department}. Wait for Phase 2.`);
            return;
        }
    }
    
    if (currentPhase === 'phase2') {
        if (globalRemainingSlots <= 0) {
            showAlert("No slots available. All global slots are filled.");
            return;
        }
    }
    
    window._selectedDepartment = department;
    showAlert(`Ready to register for ${department}`, false);
};

// ============================================
// UPDATE UI FOR PHASE
// ============================================
function updateUIForPhase() {
    if (currentPhase === 'closed') {
        enrolInput.disabled = false;
        enrolInput.placeholder = "Registration closed";
    } else {
        enrolInput.disabled = false;
        enrolInput.placeholder = "Enter your enrolment number (e.g., 16074)";
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
        showAlert("❌ Registration is closed. Opens Saturday 9:20 PM - 9:30 PM IST.");
        return;
    }
    
    const alreadyRegistered = registrationsData.some(r => 
        String(r.enrol).trim() === String(currentStudent.enrol).trim() && r.department
    );
    
    if (alreadyRegistered) {
        showAlert("⚠️ You have already registered. Registration cannot be changed.");
        return;
    }
    
    const dept = window._selectedDepartment || currentStudent.department;
    
    if (currentPhase === 'phase1') {
        const deptData = departmentSlots[dept];
        if (!deptData || deptData.remaining <= 0) {
            showAlert(`❌ No slots available for ${dept}.`);
            renderPhase1Card();
            return;
        }
    }
    
    if (currentPhase === 'phase2') {
        if (globalRemainingSlots <= 0) {
            showAlert("❌ No global slots available.");
            renderPhase2Card();
            return;
        }
    }
    
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
                phase: currentPhase
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            registrationsData.push({
                enrol: currentStudent.enrol,
                name: currentStudent.name,
                department: dept,
                submission_date: new Date().toISOString()
            });
            
            computeDepartmentSlots();
            calculateGlobalSlots();
            
            showAlert(`✅ Success! Registered for ${dept}.`, false);
            
            statusContainer.classList.remove("hidden");
            statusDisplay.innerHTML = `<span class="status-badge status-submitted"><i class="fas fa-check-circle mr-1"></i> Registered for ${dept}</span>`;
            selectionContainer.classList.add("hidden");
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.6";
            submitBtn.style.cursor = "not-allowed";
        } else {
            showAlert(`❌ Registration failed: ${result.error || "Unknown error"}`);
            await loadRegistrationsData();
            computeDepartmentSlots();
            calculateGlobalSlots();
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
    }, 3000);
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

console.log('%c⚡ PG Quota Registration Portal - Time-Based ⚡', 'color: #059669; font-size: 16px; font-weight: bold;');
