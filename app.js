// ============================================
// PG QUOTA REGISTRATION PORTAL
// Frontend JavaScript (app.js) - Time-Based
// Phase 1: 6 slots per department (strict limit)
// Phase 2: First 100 submissions only (no visible counter)
// ============================================

// Configuration
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw6am8LEttl7cg3WXNGEe1FooeNvKDv-ED9MqbB-U-ctX7uuymy8Gfs7ptZOYPwEKFo/exec";

const SLOTS_PER_DEPARTMENT = 6; // Only applies to Phase 1
const PHASE2_TOTAL_SLOTS = 100; // Phase 2: only first 100 submissions

// Student database (simplified entries)
const STUDENT_DATABASE = {
    "16074": { name: "Abdul Hadhi E", department: "Quran and Related Sciences" },
    "16075": { name: "Fasil Zaman Pk", department: "Quran and Related Sciences" },
    "16077": { name: "Muhammed Shamil M", department: "Quran and Related Sciences" },
    "16078": { name: "Muhammad Raoof", department: "Quran and Related Sciences" },
    "16082": { name: "Muhammed Anas U", department: "Quran and Related Sciences" },
    "16110": { name: "Muhammad Jalal M.A", department: "Quran and Related Sciences" },
    "16122": { name: "Muhammed Nihal Nk", department: "Quran and Related Sciences" },
    "16128": { name: "Muhammed Siyad Pk", department: "Quran and Related Sciences" },
    "16138": { name: "Midlaj At", department: "Quran and Related Sciences" },
    "16146": { name: "Jasir Ameen", department: "Quran and Related Sciences" },
    "16148": { name: "Muhammed Sinan", department: "Quran and Related Sciences" },
    "16150": { name: "Muhammed Basim Pp", department: "Quran and Related Sciences" },
    "16156": { name: "Aboobacker Sidheeque Tp", department: "Quran and Related Sciences" },
    "16158": { name: "Muhammed Nabeel Ak", department: "Quran and Related Sciences" },
    "16160": { name: "Muhammed Swalih T", department: "Quran and Related Sciences" },
    "16172": { name: "Muhammed Aslam P", department: "Quran and Related Sciences" },
    "16176": { name: "Muhammed Riyas N", department: "Quran and Related Sciences" },
    "16178": { name: "Muhammed Yoonus V", department: "Quran and Related Sciences" },
    "16179": { name: "Muhammed Savad .Pp", department: "Quran and Related Sciences" },
    "16185": { name: "Muhammed Ma", department: "Quran and Related Sciences" },
    "16187": { name: "Muhammed Mubaris M", department: "Quran and Related Sciences" },
    "16194": { name: "Aboo Noorul Arshad U", department: "Quran and Related Sciences" },
    "16195": { name: "Md Zaid", department: "Quran and Related Sciences" },
    "16196": { name: "Asraful Alom", department: "Quran and Related Sciences" },
    "16207": { name: "Muhammed Bujair", department: "Quran and Related Sciences" },
    "16215": { name: "Muhammad Ahmmed", department: "Quran and Related Sciences" },
    "16219": { name: "Muhammed Shahid Ck", department: "Quran and Related Sciences" },
    "16222": { name: "Althaf Ashraf", department: "Quran and Related Sciences" },
    "16227": { name: "Mohammad Ismail Sinan Km", department: "Quran and Related Sciences" },
    "16229": { name: "Gulam Muhiyuddin Qadiri", department: "Quran and Related Sciences" },
    "16232": { name: "Muhammed Muhsin K", department: "Quran and Related Sciences" },
    "16234": { name: "Ahammed Fais Pa", department: "Quran and Related Sciences" },
    "16245": { name: "Mohammad Jaseem", department: "Quran and Related Sciences" },
    "16248": { name: "Muhammed Fayiz", department: "Quran and Related Sciences" },
    "16262": { name: "Shah Safar T", department: "Quran and Related Sciences" },
    "16271": { name: "Muhammed Bisher E", department: "Quran and Related Sciences" },
    "16273": { name: "Muhammed Rabeeh Kt", department: "Quran and Related Sciences" },
    "16274": { name: "Muhammed Nafi' P", department: "Quran and Related Sciences" },
    "16279": { name: "Shaheer Ali", department: "Quran and Related Sciences" },
    "16297": { name: "Subhan V", department: "Quran and Related Sciences" },
    "16300": { name: "Umarul Farook K .K", department: "Quran and Related Sciences" },
    "16308": { name: "Khaleelul Rahman Ck", department: "Quran and Related Sciences" },
    "16334": { name: "Muhammad Shahood", department: "Quran and Related Sciences" },
    "16349": { name: "Md Sofiyan", department: "Quran and Related Sciences" },
    "16382": { name: "Muhammed Swalih Kt", department: "Quran and Related Sciences" },
    "16383": { name: "Ajsal Manakkadavan", department: "Quran and Related Sciences" },
    "16552": { name: "Muhammed Nasik Kv", department: "Quran and Related Sciences" },
    "16612": { name: "Athaullah", department: "Quran and Related Sciences" },
    "16620": { name: "Ajmal Nassar. N.T", department: "Quran and Related Sciences" },
    "16622": { name: "Muhammed Jasim M", department: "Quran and Related Sciences" },
    "16628": { name: "Anfas C", department: "Quran and Related Sciences" },
    "16635": { name: "Abdullah Shakir", department: "Quran and Related Sciences" },
    "16648": { name: "Munshid P", department: "Quran and Related Sciences" },
    "16649": { name: "Muhammed Adnan Saqaf C P", department: "Quran and Related Sciences" },
    "16651": { name: "Shamseer Muhammed P", department: "Quran and Related Sciences" },
    "16663": { name: "Muhammed Sawad", department: "Quran and Related Sciences" },
    "16666": { name: "Muhammed Minhaj P", department: "Quran and Related Sciences" },
    "16668": { name: "Irfan Yasir P", department: "Quran and Related Sciences" },
    "16678": { name: "Mohammad Nawaz", department: "Quran and Related Sciences" },
    "16683": { name: "Mohamed Shibil P P", department: "Quran and Related Sciences" },
    "16691": { name: "Muhammed Ansar", department: "Quran and Related Sciences" },
    "16696": { name: "Muhammed Suhail", department: "Quran and Related Sciences" },
    "16701": { name: "Muhammed Jazeel V", department: "Quran and Related Sciences" },
    "16709": { name: "Sahl Nm", department: "Quran and Related Sciences" },
    "16715": { name: "Muhammed Shafnas", department: "Quran and Related Sciences" },
    "16716": { name: "Md Sajid Raza", department: "Quran and Related Sciences" },
    "16739": { name: "Muhammed Sahal Ap", department: "Quran and Related Sciences" },
    "16751": { name: "Muhammed Iqbal Ma", department: "Quran and Related Sciences" },
    "16770": { name: "Zulfikarali", department: "Quran and Related Sciences" },
    "16784": { name: "Javad Ahmed Bilal P", department: "Quran and Related Sciences" },
    "16798": { name: "Muhammad Swabeeh P M", department: "Quran and Related Sciences" },
    "16807": { name: "Muhammed Anas T K", department: "Quran and Related Sciences" },
    "16810": { name: "Azam Rabbani", department: "Quran and Related Sciences" },
    "16821": { name: "Zakkariya Pk", department: "Quran and Related Sciences" },
    "16823": { name: "Mahammad Shabeer", department: "Quran and Related Sciences" },
    "16835": { name: "Abid Ba", department: "Quran and Related Sciences" },
    "16846": { name: "Muhammed Uwaiz K A", department: "Quran and Related Sciences" },
    "16855": { name: "Muhammad Murshid", department: "Quran and Related Sciences" },
    "16875": { name: "Muhammed Anshad P", department: "Quran and Related Sciences" },
    "16889": { name: "Muzammil Chekkalakunnan", department: "Quran and Related Sciences" },
    "16960": { name: "Muhammed Alfas Am", department: "Quran and Related Sciences" },
    "17028": { name: "Moosa Fayiz P K", department: "Quran and Related Sciences" },
    "17047": { name: "Mohammed Muzammil P.M", department: "Quran and Related Sciences" },
    "17106": { name: "Muhammad Sabith", department: "Quran and Related Sciences" },
    "17195": { name: "Muhammed Hinan KN", department: "Quran and Related Sciences" },

    // 2. Hadith and Related Sciences
    "16007": { name: "Ubaidah Abul Hasanat", department: "Hadith and Related Sciences" },
    "16061": { name: "Shanif", department: "Hadith and Related Sciences" },
    "16086": { name: "Althaf C.N", department: "Hadith and Related Sciences" },
    "16093": { name: "Ibrahim Tp", department: "Hadith and Related Sciences" },
    "16152": { name: "Muhammed Rafi Kk", department: "Hadith and Related Sciences" },
    "16170": { name: "Ibrahim Khaleel", department: "Hadith and Related Sciences" },
    "16269": { name: "Jamshid K", department: "Hadith and Related Sciences" },
    "16282": { name: "Ahammad Jaseel S", department: "Hadith and Related Sciences" },
    "16299": { name: "Mohammed Marzook Am", department: "Hadith and Related Sciences" },
    "16305": { name: "Abdul Razak Pk", department: "Hadith and Related Sciences" },
    "16313": { name: "P. Muhammed Shabnas", department: "Hadith and Related Sciences" },
    "16314": { name: "Muhammed Ajmal T", department: "Hadith and Related Sciences" },
    "16340": { name: "Ahammed Siddiqul Afrid", department: "Hadith and Related Sciences" },
    "16345": { name: "Sobibur Rahaman", department: "Hadith and Related Sciences" },
    "16347": { name: "Muhammad Raafiu K", department: "Hadith and Related Sciences" },
    "16348": { name: "Salmanul Faris Kp", department: "Hadith and Related Sciences" },
    "16350": { name: "Muhammed Mirshad Pt", department: "Hadith and Related Sciences" },
    "16358": { name: "Muhammed Salman C", department: "Hadith and Related Sciences" },
    "16375": { name: "Hasain T", department: "Hadith and Related Sciences" },
    "16388": { name: "Ibnu Mashood P P", department: "Hadith and Related Sciences" },
    "16393": { name: "Mishal", department: "Hadith and Related Sciences" },
    "16399": { name: "Abdul Basith C", department: "Hadith and Related Sciences" },
    "16435": { name: "Jadheer Ahmed K", department: "Hadith and Related Sciences" },
    "16455": { name: "Zainul Abid C", department: "Hadith and Related Sciences" },
    "16465": { name: "Mohammed Mubashir P", department: "Hadith and Related Sciences" },
    "16471": { name: "Nehel Chand", department: "Hadith and Related Sciences" },
    "16490": { name: "Muhammad Musthafa K", department: "Hadith and Related Sciences" },
    "16492": { name: "Farhan Ali N.A", department: "Hadith and Related Sciences" },
    "16537": { name: "Hinan Np", department: "Hadith and Related Sciences" },
    "16547": { name: "Arshad K.K", department: "Hadith and Related Sciences" },
    "16568": { name: "Ashik K.I", department: "Hadith and Related Sciences" },
    "16575": { name: "Abdul Farhad Mk", department: "Hadith and Related Sciences" },
    "16580": { name: "Zisan Reza", department: "Hadith and Related Sciences" },
    "16591": { name: "Aman Sk", department: "Hadith and Related Sciences" },
    "16601": { name: "Muhammed Finan Pk", department: "Hadith and Related Sciences" },
    "16613": { name: "Muhammad Ashiq N", department: "Hadith and Related Sciences" },
    "16661": { name: "Muhammed Shaneed", department: "Hadith and Related Sciences" },
    "16670": { name: "Hasim Shan P K", department: "Hadith and Related Sciences" },
    "16677": { name: "Shibili M.K", department: "Hadith and Related Sciences" },
    "16717": { name: "Muhammed Safvan Vp", department: "Hadith and Related Sciences" },
    "16725": { name: "Muhammed Munawar Mattathor", department: "Hadith and Related Sciences" },
    "16745": { name: "Muhammed Sinan", department: "Hadith and Related Sciences" },
    "16749": { name: "Mohammed Basil M", department: "Hadith and Related Sciences" },
    "16752": { name: "Mohammed Nishad P T", department: "Hadith and Related Sciences" },
    "16761": { name: "Sharif Alam", department: "Hadith and Related Sciences" },
    "16773": { name: "Muhammed Shahid", department: "Hadith and Related Sciences" },
    "16783": { name: "Muhammed Swabeeh O T", department: "Hadith and Related Sciences" },
    "16795": { name: "Muhammed Thahir P Panayampadam", department: "Hadith and Related Sciences" },
    "16883": { name: "Muhammed Naseerudheen A", department: "Hadith and Related Sciences" },
    "16888": { name: "Husainar A", department: "Hadith and Related Sciences" },
    "16931": { name: "Ashiq Muhammed P", department: "Hadith and Related Sciences" },
    "16932": { name: "Adil Muhammed P", department: "Hadith and Related Sciences" },
    "16949": { name: "Mohammed Rabeeh P", department: "Hadith and Related Sciences" },
    "16955": { name: "Muhammed Adil", department: "Hadith and Related Sciences" },
    "16956": { name: "Mohammed Salim Pk", department: "Hadith and Related Sciences" },
    "16971": { name: "Muhammed Midlaj Kuttikkodan", department: "Hadith and Related Sciences" },
    "16975": { name: "Al Ameen S", department: "Hadith and Related Sciences" },
    "17008": { name: "Muhammed Unais K A", department: "Hadith and Related Sciences" },
    "17011": { name: "Mohammed Nizafar", department: "Hadith and Related Sciences" },
    "17017": { name: "Mohammed Husni Karattil", department: "Hadith and Related Sciences" },
    "17049": { name: "Mohammed Nafih", department: "Hadith and Related Sciences" },
    "17054": { name: "Obidur Rahaman", department: "Hadith and Related Sciences" },
    "17083": { name: "Mohammed Kaunain Raza", department: "Hadith and Related Sciences" },
    "17089": { name: "Muhammad Razi", department: "Hadith and Related Sciences" },
    "17104": { name: "Muhammed Ibrahim Badusha Sudheer", department: "Hadith and Related Sciences" },
    "17128": { name: "Muhammed Fasalul Abidheen", department: "Hadith and Related Sciences" },
    "17162": { name: "Muhammed Hanan K M", department: "Hadith and Related Sciences" },
    "17179": { name: "SAMIUL ALOM KHAN", department: "Hadith and Related Sciences" },
    "17181": { name: "RAMJAN ALI", department: "Hadith and Related Sciences" },
    "17186": { name: "Muhammed Nabeel Np", department: "Hadith and Related Sciences" },
    "17193": { name: "DEWAN MAMINUL ISLAM", department: "Hadith and Related Sciences" },
    "17206": { name: "Sayyad Mohammed Vasil", department: "Hadith and Related Sciences" },

    // 3. Fiqh and Usul al-Fiqh
    "15825": { name: "Muhammed Adhil Cp", department: "Fiqh and Usul al-Fiqh" },
    "15881": { name: "Shaik Mohammed Yaseen", department: "Fiqh and Usul al-Fiqh" },
    "15994": { name: "Nasiruddin Ajmal", department: "Fiqh and Usul al-Fiqh" },
    "16021": { name: "Abu Taher", department: "Fiqh and Usul al-Fiqh" },
    "16067": { name: "Swalahudheen Ka", department: "Fiqh and Usul al-Fiqh" },
    "16068": { name: "Abdulrahman P.H", department: "Fiqh and Usul al-Fiqh" },
    "16071": { name: "Muhammed Ishaque K", department: "Fiqh and Usul al-Fiqh" },
    "16072": { name: "Basil Irfan C", department: "Fiqh and Usul al-Fiqh" },
    "16080": { name: "Muhammed A", department: "Fiqh and Usul al-Fiqh" },
    "16088": { name: "Muhammed Ismaeel Kp", department: "Fiqh and Usul al-Fiqh" },
    "16090": { name: "Abdul Basith Pk", department: "Fiqh and Usul al-Fiqh" },
    "16096": { name: "Muhammed Hibathulla Mk", department: "Fiqh and Usul al-Fiqh" },
    "16107": { name: "Muhammed Sahal Vk", department: "Fiqh and Usul al-Fiqh" },
    "16112": { name: "Muhammed Shahin K", department: "Fiqh and Usul al-Fiqh" },
    "16123": { name: "Munavvar Km", department: "Fiqh and Usul al-Fiqh" },
    "16127": { name: "Muhammed Shabeeb T", department: "Fiqh and Usul al-Fiqh" },
    "16134": { name: "Muhammed Asif", department: "Fiqh and Usul al-Fiqh" },
    "16140": { name: "Muzammil Siddique", department: "Fiqh and Usul al-Fiqh" },
    "16141": { name: "Muhammed Fayis", department: "Fiqh and Usul al-Fiqh" },
    "16162": { name: "Mohammed Fidaul Mustafa", department: "Fiqh and Usul al-Fiqh" },
    "16167": { name: "Muhammad Ifas B", department: "Fiqh and Usul al-Fiqh" },
    "16204": { name: "Muhammed Ihsan", department: "Fiqh and Usul al-Fiqh" },
    "16209": { name: "Muhammed Aslam C", department: "Fiqh and Usul al-Fiqh" },
    "16213": { name: "Muhammed Rafeeque Ac", department: "Fiqh and Usul al-Fiqh" },
    "16225": { name: "Mainul Khandakar", department: "Fiqh and Usul al-Fiqh" },
    "16254": { name: "Ba Moinudin Garibh Navaz", department: "Fiqh and Usul al-Fiqh" },
    "16261": { name: "Muhammed Nabeel C", department: "Fiqh and Usul al-Fiqh" },
    "16263": { name: "Mohammed Athhar Thayyib Ms", department: "Fiqh and Usul al-Fiqh" },
    "16266": { name: "Sahad C", department: "Fiqh and Usul al-Fiqh" },
    "16272": { name: "Abdullah Al Mubarak", department: "Fiqh and Usul al-Fiqh" },
    "16278": { name: "Jamnas Muhammed Pc", department: "Fiqh and Usul al-Fiqh" },
    "16285": { name: "Ibrahim Khaleel Mt", department: "Fiqh and Usul al-Fiqh" },
    "16293": { name: "Masood Kk", department: "Fiqh and Usul al-Fiqh" },
    "16301": { name: "Murshed Pk", department: "Fiqh and Usul al-Fiqh" },
    "16302": { name: "Muhammed Safaras R", department: "Fiqh and Usul al-Fiqh" },
    "16306": { name: "Alqamah Rahmani", department: "Fiqh and Usul al-Fiqh" },
    "16309": { name: "Muhammed Shammas", department: "Fiqh and Usul al-Fiqh" },
    "16310": { name: "Imran Husain", department: "Fiqh and Usul al-Fiqh" },
    "16317": { name: "Faheem P", department: "Fiqh and Usul al-Fiqh" },
    "16320": { name: "Muhammed Nihal Ok", department: "Fiqh and Usul al-Fiqh" },
    "16333": { name: "Md Sarmad Raza", department: "Fiqh and Usul al-Fiqh" },
    "16339": { name: "Nihal Muhamed Vp", department: "Fiqh and Usul al-Fiqh" },
    "16353": { name: "Anwar Yaseer", department: "Fiqh and Usul al-Fiqh" },
    "16361": { name: "Mazin Ahmad", department: "Fiqh and Usul al-Fiqh" },
    "16364": { name: "Muhammed Afsal Km", department: "Fiqh and Usul al-Fiqh" },
    "16377": { name: "Muhammad Yaseen N", department: "Fiqh and Usul al-Fiqh" },
    "16381": { name: "Midlaj Kt", department: "Fiqh and Usul al-Fiqh" },
    "16413": { name: "Muhammed Riyan", department: "Fiqh and Usul al-Fiqh" },
    "16422": { name: "Anvar Hussain", department: "Fiqh and Usul al-Fiqh" },
    "16424": { name: "Abdul Vahid Vh", department: "Fiqh and Usul al-Fiqh" },
    "16430": { name: "Muhammed Niyaz", department: "Fiqh and Usul al-Fiqh" },
    "16446": { name: "Mohammed Fayiz Kp", department: "Fiqh and Usul al-Fiqh" },
    "16448": { name: "Muhammed Farshad.P.T", department: "Fiqh and Usul al-Fiqh" },
    "16454": { name: "Muhammed Ajmal Shanir Vk", department: "Fiqh and Usul al-Fiqh" },
    "16487": { name: "Shaik Muhammed Rafi", department: "Fiqh and Usul al-Fiqh" },
    "16505": { name: "Muhammed Farhan M", department: "Fiqh and Usul al-Fiqh" },
    "16521": { name: "Shaik Musthafir Rahman", department: "Fiqh and Usul al-Fiqh" },
    "16539": { name: "Masidul Islam", department: "Fiqh and Usul al-Fiqh" },
    "16551": { name: "Abdunnafih", department: "Fiqh and Usul al-Fiqh" },
    "16559": { name: "Muhammed Afnas K", department: "Fiqh and Usul al-Fiqh" },
    "16562": { name: "Muhammed Abusaif", department: "Fiqh and Usul al-Fiqh" },
    "16564": { name: "Alimudeen", department: "Fiqh and Usul al-Fiqh" },
    "16595": { name: "Koreshi Mohammed Thamjeed Ali", department: "Fiqh and Usul al-Fiqh" },
    "16604": { name: "Mazidur Rahman", department: "Fiqh and Usul al-Fiqh" },
    "16607": { name: "Muhammed Yaqoob P", department: "Fiqh and Usul al-Fiqh" },
    "16616": { name: "Muhammed Vp", department: "Fiqh and Usul al-Fiqh" },
    "16637": { name: "Muhammed Sahal C", department: "Fiqh and Usul al-Fiqh" },
    "16643": { name: "Muhammed Salahuddeen Ba", department: "Fiqh and Usul al-Fiqh" },
    "16680": { name: "Hadhir Hameed", department: "Fiqh and Usul al-Fiqh" },
    "16681": { name: "Muhammed Arshad.P", department: "Fiqh and Usul al-Fiqh" },
    "16682": { name: "Muhammed Midlaj Ms", department: "Fiqh and Usul al-Fiqh" },
    "16684": { name: "Muhammed Ashiq C", department: "Fiqh and Usul al-Fiqh" },
    "16693": { name: "Ahmed Shufaiq N V", department: "Fiqh and Usul al-Fiqh" },
    "16711": { name: "Abdu Raheem P", department: "Fiqh and Usul al-Fiqh" },
    "16735": { name: "Muhammed Mufeed Tk", department: "Fiqh and Usul al-Fiqh" },
    "16754": { name: "Abdul Basith P", department: "Fiqh and Usul al-Fiqh" },
    "16772": { name: "Sadaqathulla Mp", department: "Fiqh and Usul al-Fiqh" },
    "16780": { name: "Mubashir Pk", department: "Fiqh and Usul al-Fiqh" },
    "16803": { name: "Ahmed K", department: "Fiqh and Usul al-Fiqh" },
    "16816": { name: "Muhammed Sahal Op", department: "Fiqh and Usul al-Fiqh" },
    "16820": { name: "Munawir Ali K", department: "Fiqh and Usul al-Fiqh" },
    "16827": { name: "Muhammed Masroor P", department: "Fiqh and Usul al-Fiqh" },
    "16853": { name: "Muhammed Sinan Tk", department: "Fiqh and Usul al-Fiqh" },
    "16864": { name: "Muhammed Hashir", department: "Fiqh and Usul al-Fiqh" },
    "16871": { name: "Nasarudheen Ma", department: "Fiqh and Usul al-Fiqh" },
    "16874": { name: "Muhammed Nihr V", department: "Fiqh and Usul al-Fiqh" },
    "16901": { name: "Arif Safi", department: "Fiqh and Usul al-Fiqh" },
    "16911": { name: "Muhammed Nabeel P", department: "Fiqh and Usul al-Fiqh" },
    "16916": { name: "Muhammed Fazlu K", department: "Fiqh and Usul al-Fiqh" },
    "16924": { name: "Muhammed Harshil Ec", department: "Fiqh and Usul al-Fiqh" },
    "16927": { name: "Muhammed Shamil K", department: "Fiqh and Usul al-Fiqh" },
    "16929": { name: "Sayyid Miqdad Hasani P", department: "Fiqh and Usul al-Fiqh" },
    "16933": { name: "Mohammed Maflooh K", department: "Fiqh and Usul al-Fiqh" },
    "16934": { name: "Mohammed Muzammil Raza", department: "Fiqh and Usul al-Fiqh" },
    "16935": { name: "Abdul Vahid K", department: "Fiqh and Usul al-Fiqh" },
    "16943": { name: "Muhammed Nisthaf", department: "Fiqh and Usul al-Fiqh" },
    "16952": { name: "Mohammed Aslam Kv", department: "Fiqh and Usul al-Fiqh" },
    "16977": { name: "Muhammad Mansoor M", department: "Fiqh and Usul al-Fiqh" },
    "16981": { name: "Saifudheen Ap", department: "Fiqh and Usul al-Fiqh" },
    "16987": { name: "Muhammed Sinan Op", department: "Fiqh and Usul al-Fiqh" },
    "16994": { name: "Mohammad Jabir", department: "Fiqh and Usul al-Fiqh" },
    "17004": { name: "Muhammed Junaid C", department: "Fiqh and Usul al-Fiqh" },
    "17013": { name: "Munawar T", department: "Fiqh and Usul al-Fiqh" },
    "17026": { name: "Muhammed Aman Kp", department: "Fiqh and Usul al-Fiqh" },
    "17034": { name: "Mohammed Junaid H", department: "Fiqh and Usul al-Fiqh" },
    "17042": { name: "Sayyid Muhammed Naheel", department: "Fiqh and Usul al-Fiqh" },
    "17046": { name: "Ahammed Rashid Tk", department: "Fiqh and Usul al-Fiqh" },
    "17056": { name: "Sulaiman Shah Qadri Peerzade", department: "Fiqh and Usul al-Fiqh" },
    "17070": { name: "Liyakath Ali Kp", department: "Fiqh and Usul al-Fiqh" },
    "17076": { name: "Thameem Kv", department: "Fiqh and Usul al-Fiqh" },
    "17097": { name: "Muhammad Rashid", department: "Fiqh and Usul al-Fiqh" },
    "17108": { name: "C.Sayeed Basha", department: "Fiqh and Usul al-Fiqh" },
    "17132": { name: "Muhammed Mahroos Kc", department: "Fiqh and Usul al-Fiqh" },
    "17133": { name: "Muhammed Rishan Tp", department: "Fiqh and Usul al-Fiqh" },
    "17134": { name: "Dilshad P", department: "Fiqh and Usul al-Fiqh" },
    "17138": { name: "Bilal Ansari", department: "Fiqh and Usul al-Fiqh" },
    "17142": { name: "Masud Rana", department: "Fiqh and Usul al-Fiqh" },
    "17164": { name: "Muhammed Irshad Ak", department: "Fiqh and Usul al-Fiqh" },
    "17169": { name: "Toufik", department: "Fiqh and Usul al-Fiqh" },
    "17177": { name: "FEMIN FAJES MC", department: "Fiqh and Usul al-Fiqh" },
    "17178": { name: "MUHSIN JAS K P", department: "Fiqh and Usul al-Fiqh" },
    "17189": { name: "NABHAN ABDUL AZEEZ C", department: "Fiqh and Usul al-Fiqh" },
    "17190": { name: "MUSHARAF ALAM", department: "Fiqh and Usul al-Fiqh" },
    "17197": { name: "KAIF AHMED", department: "Fiqh and Usul al-Fiqh" },
    "17185": { name: "MUHAMMED RASHAD VP", department: "Fiqh and Usul al-Fiqh" },
    "17159": { name: "Ghulam Mohammad", department: "Fiqh and Usul al-Fiqh" },
    "16626": { name: "Md Sahajahan", department: "Fiqh and Usul al-Fiqh" },
    "16953": { name: "Mobarak Sk", department: "Fiqh and Usul al-Fiqh" },
    "17006": { name: "Mohammad", department: "Fiqh and Usul al-Fiqh" },
    "17029": { name: "Ansari Tanveer", department: "Fiqh and Usul al-Fiqh" },
    "17022": { name: "Shaik Nafees Ahmad", department: "Fiqh and Usul al-Fiqh" },

    // 4. Islamic Economics and Finance
    "15563": { name: "Mohammed Saheer P", department: "Islamic Economics and Finance" },
    "15613": { name: "Muhammed Safvan", department: "Islamic Economics and Finance" },
    "16025": { name: "Haris", department: "Islamic Economics and Finance" },
    "16085": { name: "Abdul Bayis P", department: "Islamic Economics and Finance" },
    "16087": { name: "Mohammed Imran", department: "Islamic Economics and Finance" },
    "16091": { name: "Mohamed Faise K", department: "Islamic Economics and Finance" },
    "16094": { name: "Ahmed Hisham Km", department: "Islamic Economics and Finance" },
    "16098": { name: "Abdul Samad", department: "Islamic Economics and Finance" },
    "16100": { name: "Muhammed Shafi Pp", department: "Islamic Economics and Finance" },
    "16139": { name: "Sabith Cp", department: "Islamic Economics and Finance" },
    "16144": { name: "Jafar Sadhik B M", department: "Islamic Economics and Finance" },
    "16145": { name: "Muhammed Arshad Ck", department: "Islamic Economics and Finance" },
    "16149": { name: "Ahmed Sulthan", department: "Islamic Economics and Finance" },
    "16155": { name: "Muhammed Fayis Np", department: "Islamic Economics and Finance" },
    "16163": { name: "Muhammed Nizam Ch", department: "Islamic Economics and Finance" },
    "16186": { name: "Muhammed Naseef Pk", department: "Islamic Economics and Finance" },
    "16189": { name: "Abdul Nafi P", department: "Islamic Economics and Finance" },
    "16193": { name: "Muhammed Javad V", department: "Islamic Economics and Finance" },
    "16201": { name: "Muhammed Sinan Ap", department: "Islamic Economics and Finance" },
    "16205": { name: "Saheed Ck", department: "Islamic Economics and Finance" },
    "16226": { name: "Muhammed Inshad", department: "Islamic Economics and Finance" },
    "16246": { name: "Ahammed Nijad Pc", department: "Islamic Economics and Finance" },
    "16260": { name: "Muhammed Midlaj Vt", department: "Islamic Economics and Finance" },
    "16346": { name: "Muhammed Ajmal P", department: "Islamic Economics and Finance" },
    "16363": { name: "Muhammed Risil Pc", department: "Islamic Economics and Finance" },
    "16403": { name: "Muhammed Swalih", department: "Islamic Economics and Finance" },
    "16404": { name: "Uvais Ahammed M", department: "Islamic Economics and Finance" },
    "16407": { name: "Muhammed Sinan C", department: "Islamic Economics and Finance" },
    "16408": { name: "Muhammed Sinan Ek", department: "Islamic Economics and Finance" },
    "16434": { name: "Muhammed Marwan Siddique", department: "Islamic Economics and Finance" },
    "16481": { name: "Muhammed Uvais Pa", department: "Islamic Economics and Finance" },
    "16500": { name: "Zainul Abid K", department: "Islamic Economics and Finance" },
    "16501": { name: "Sayyid Muhammed Adhil Kp", department: "Islamic Economics and Finance" },
    "16507": { name: "Hashir Hussain Ik", department: "Islamic Economics and Finance" },
    "16574": { name: "Jazalul Ameen T", department: "Islamic Economics and Finance" },
    "16624": { name: "Muhammed Ali Murthala", department: "Islamic Economics and Finance" },
    "16629": { name: "Muhammed Mubashir", department: "Islamic Economics and Finance" },
    "16656": { name: "Muhammed Unais C K", department: "Islamic Economics and Finance" },
    "16659": { name: "Thamjeed Ansal", department: "Islamic Economics and Finance" },
    "16705": { name: "Aftabuddin Sekh", department: "Islamic Economics and Finance" },
    "16736": { name: "Muhammed Shameem K", department: "Islamic Economics and Finance" },
    "16738": { name: "Adil Shah", department: "Islamic Economics and Finance" },
    "16753": { name: "Muhammed Sinan Pt", department: "Islamic Economics and Finance" },
    "16782": { name: "Muhammed Sahl Pp", department: "Islamic Economics and Finance" },
    "16819": { name: "Jasim", department: "Islamic Economics and Finance" },
    "16830": { name: "Abdul Basith Vp", department: "Islamic Economics and Finance" },
    "16850": { name: "Muhammed Abdul Rauf C C", department: "Islamic Economics and Finance" },
    "16877": { name: "Midhlaj K", department: "Islamic Economics and Finance" },
    "16882": { name: "Ahmed Shameem K P", department: "Islamic Economics and Finance" },
    "16897": { name: "Mahammad Ziyan", department: "Islamic Economics and Finance" },
    "16898": { name: "Muhammed Sinan K", department: "Islamic Economics and Finance" },
    "16908": { name: "Muhammed Nafeel", department: "Islamic Economics and Finance" },
    "16948": { name: "Op Muhasir Musthafa", department: "Islamic Economics and Finance" },
    "16969": { name: "Swafvan", department: "Islamic Economics and Finance" },
    "17009": { name: "Mohammed Rashid T.P", department: "Islamic Economics and Finance" },
    "17023": { name: "Minhaj P", department: "Islamic Economics and Finance" },
    "17072": { name: "Muhammed Jaseel. Km", department: "Islamic Economics and Finance" },
    "17080": { name: "Muhammed Shameem K", department: "Islamic Economics and Finance" },
    "17085": { name: "Muhammed Hisan", department: "Islamic Economics and Finance" },
    "17091": { name: "Muhammad Thameem", department: "Islamic Economics and Finance" },
    "17094": { name: "Muhammed Galib M", department: "Islamic Economics and Finance" },
    "17095": { name: "Razal Abdul Rahman P.E", department: "Islamic Economics and Finance" },
    "17120": { name: "Muhammed Rabeeh Kv", department: "Islamic Economics and Finance" },
    "17145": { name: "Mohammad Faheem", department: "Islamic Economics and Finance" },
    "17151": { name: "Muhammed Nazeeb N", department: "Islamic Economics and Finance" },
    "17152": { name: "Muhammed Nadeem", department: "Islamic Economics and Finance" },
    "17168": { name: "Suroosh Ahmed Pk", department: "Islamic Economics and Finance" },
    "17180": { name: "K. AHMED MURSHID", department: "Islamic Economics and Finance" },
    "17182": { name: "MUHAMMED YASEEN RM", department: "Islamic Economics and Finance" },
    "17187": { name: "MUHAMMED SUHAIL K", department: "Islamic Economics and Finance" },
    "17191": { name: "MAHAMMAD MUKTHAR", department: "Islamic Economics and Finance" },
    "17201": { name: "MUHAMMAD ASIF", department: "Islamic Economics and Finance" },

    // 5. Aqeeda and Philosophy
    "15566": { name: "Shuhaib", department: "Aqeeda and Philosophy" },
    "15742": { name: "Shefins Vs", department: "Aqeeda and Philosophy" },
    "16063": { name: "Aslam Sha KP", department: "Aqeeda and Philosophy" },
    "16108": { name: "Muhammed Swalih P", department: "Aqeeda and Philosophy" },
    "16191": { name: "Janib Ali", department: "Aqeeda and Philosophy" },
    "16233": { name: "Asweel Rahman", department: "Aqeeda and Philosophy" },
    "16241": { name: "Abdul Bari Nc", department: "Aqeeda and Philosophy" },
    "16247": { name: "Shihabuddin", department: "Aqeeda and Philosophy" },
    "16270": { name: "Ajmal Ki", department: "Aqeeda and Philosophy" },
    "16280": { name: "Muhammed Ashiq Bk", department: "Aqeeda and Philosophy" },
    "16287": { name: "Abdul Younus", department: "Aqeeda and Philosophy" },
    "16303": { name: "Sabir Ct", department: "Aqeeda and Philosophy" },
    "16326": { name: "Abdul Saleem T", department: "Aqeeda and Philosophy" },
    "16331": { name: "Moosa Ma", department: "Aqeeda and Philosophy" },
    "16344": { name: "Muhammed Sinan Kv", department: "Aqeeda and Philosophy" },
    "16359": { name: "Muhammed Suhail Cs", department: "Aqeeda and Philosophy" },
    "16365": { name: "Safvan P", department: "Aqeeda and Philosophy" },
    "16380": { name: "Muhammed Risal Vk", department: "Aqeeda and Philosophy" },
    "16402": { name: "Sa-Ad Pk", department: "Aqeeda and Philosophy" },
    "16432": { name: "Muhammed Swabeeh V", department: "Aqeeda and Philosophy" },
    "16457": { name: "Ali Shuaib", department: "Aqeeda and Philosophy" },
    "16463": { name: "Mohammed Mish'Al T.P", department: "Aqeeda and Philosophy" },
    "16472": { name: "Shibli P N", department: "Aqeeda and Philosophy" },
    "16478": { name: "Yahiya B.M", department: "Aqeeda and Philosophy" },
    "16484": { name: "Muhammed Sinan P", department: "Aqeeda and Philosophy" },
    "16486": { name: "Muhammed Afnan Kp", department: "Aqeeda and Philosophy" },
    "16496": { name: "Muhammed Favas Kv", department: "Aqeeda and Philosophy" },
    "16508": { name: "Asadullah", department: "Aqeeda and Philosophy" },
    "16516": { name: "Muhammed Jiyadh Ka", department: "Aqeeda and Philosophy" },
    "16524": { name: "Muhammed Lubab T", department: "Aqeeda and Philosophy" },
    "16526": { name: "Mahammad Nuhuman", department: "Aqeeda and Philosophy" },
    "16527": { name: "Mohammad Hamid Raza", department: "Aqeeda and Philosophy" },
    "16563": { name: "K.M Muhammad Sahad", department: "Aqeeda and Philosophy" },
    "16572": { name: "Mohammed Jawad A", department: "Aqeeda and Philosophy" },
    "16586": { name: "Abdul Basith V", department: "Aqeeda and Philosophy" },
    "16594": { name: "Muhammed Jinan Ch", department: "Aqeeda and Philosophy" },
    "16647": { name: "Ahammed Jasir Mk", department: "Aqeeda and Philosophy" },
    "16658": { name: "Muhammed Musthafa C", department: "Aqeeda and Philosophy" },
    "16737": { name: "Muhammed Mansoor", department: "Aqeeda and Philosophy" },
    "16747": { name: "Mohammed Sahl Cs", department: "Aqeeda and Philosophy" },
    "16794": { name: "Muhammed Imran S", department: "Aqeeda and Philosophy" },
    "16805": { name: "Muhammed Fawas K", department: "Aqeeda and Philosophy" },
    "16812": { name: "Muhammed Fawas M S", department: "Aqeeda and Philosophy" },
    "16818": { name: "Midhlaj Pm", department: "Aqeeda and Philosophy" },
    "16840": { name: "Mohamed Shabeel", department: "Aqeeda and Philosophy" },
    "16922": { name: "Muhammed Ramees M", department: "Aqeeda and Philosophy" },
    "16925": { name: "Muhammed Jashad", department: "Aqeeda and Philosophy" },
    "16957": { name: "Ahammed Yaseen", department: "Aqeeda and Philosophy" },
    "16959": { name: "Muhammed Nihal K", department: "Aqeeda and Philosophy" },
    "16961": { name: "Fawad Pc", department: "Aqeeda and Philosophy" },
    "16968": { name: "Muhammed Lazim K", department: "Aqeeda and Philosophy" },
    "16982": { name: "Muhammed Sinan Cp", department: "Aqeeda and Philosophy" },
    "16992": { name: "Rinshad Mp", department: "Aqeeda and Philosophy" },
    "16996": { name: "Shadi Shahlan P K", department: "Aqeeda and Philosophy" },
    "17005": { name: "Muhammed Javad P V", department: "Aqeeda and Philosophy" },
    "17007": { name: "Niyas N K", department: "Aqeeda and Philosophy" },
    "17021": { name: "Muhammed Azhar Cp", department: "Aqeeda and Philosophy" },
    "17035": { name: "Muhammed Adil Ck", department: "Aqeeda and Philosophy" },
    "17092": { name: "Muhammed Hashim C", department: "Aqeeda and Philosophy" },
    "17098": { name: "Aboobacker Siyas M K", department: "Aqeeda and Philosophy" },
    "17114": { name: "Muhammed Sufyan Mandayapurath", department: "Aqeeda and Philosophy" },
    "17122": { name: "Muhammed Jazeel Pv", department: "Aqeeda and Philosophy" },
    "17123": { name: "Jalaludheen K", department: "Aqeeda and Philosophy" },
    "17129": { name: "Ali Mubashir", department: "Aqeeda and Philosophy" },
    "17130": { name: "Mohammed Sahal", department: "Aqeeda and Philosophy" },
    "17131": { name: "Muhammed Irfan Pp", department: "Aqeeda and Philosophy" },
    "17140": { name: "Sayyed Muhammad Minhaj Thangal", department: "Aqeeda and Philosophy" },
    "17144": { name: "Abdul Wadhood", department: "Aqeeda and Philosophy" },
    "17160": { name: "Nihal Ahmed", department: "Aqeeda and Philosophy" },
    "17171": { name: "Muhammed Abdul Salam R V", department: "Aqeeda and Philosophy" },

    // 6. Study of Religion
    "15965": { name: "Abdul Raoof M", department: "Study of Religion" },
    "16066": { name: "Mohammed Azeem", department: "Study of Religion" },
    "16070": { name: "Ammar Ali I", department: "Study of Religion" },
    "16073": { name: "Muhammed Faisal A K", department: "Study of Religion" },
    "16076": { name: "Abdul Rahiman Raza", department: "Study of Religion" },
    "16089": { name: "Safwan K", department: "Study of Religion" },
    "16101": { name: "Sarif Aktar", department: "Study of Religion" },
    "16102": { name: "Abdul Khader", department: "Study of Religion" },
    "16105": { name: "K.H. Mahammad Zahid", department: "Study of Religion" },
    "16113": { name: "Adeeb Muhammed K.A", department: "Study of Religion" },
    "16114": { name: "Mohammed Shahzan T.K", department: "Study of Religion" },
    "16129": { name: "Mohammed Irfan C", department: "Study of Religion" },
    "16136": { name: "Mohammed Jasir K", department: "Study of Religion" },
    "16137": { name: "Muhammed Muhsin Pk", department: "Study of Religion" },
    "16147": { name: "Muhammad Rameez Ke", department: "Study of Religion" },
    "16164": { name: "Muhammed Shinan Cp", department: "Study of Religion" },
    "16171": { name: "Muhammed Vaseem T A", department: "Study of Religion" },
    "16174": { name: "Mohammed Jazeel K", department: "Study of Religion" },
    "16177": { name: "Ahmed Shahbas Mh", department: "Study of Religion" },
    "16183": { name: "Muhammed Ansil K", department: "Study of Religion" },
    "16184": { name: "Ibraheem Badhusha K", department: "Study of Religion" },
    "16188": { name: "Farooque Hussain Cb", department: "Study of Religion" },
    "16192": { name: "Abdulla Jalal Kp", department: "Study of Religion" },
    "16198": { name: "Muhammed Suhail N", department: "Study of Religion" },
    "16202": { name: "Muhammed Shabeeb", department: "Study of Religion" },
    "16203": { name: "Muhammad Thameem", department: "Study of Religion" },
    "16210": { name: "Muhammed Munavvir", department: "Study of Religion" },
    "16211": { name: "Muahmmed Afeef V", department: "Study of Religion" },
    "16214": { name: "Abdulla Ahamed", department: "Study of Religion" },
    "16217": { name: "Muhammed Musthafa Mp", department: "Study of Religion" },
    "16221": { name: "Muhammed Rashid M", department: "Study of Religion" },
    "16235": { name: "Muhammed Muneeb M P", department: "Study of Religion" },
    "16237": { name: "Muhammed Rafid Ac", department: "Study of Religion" },
    "16249": { name: "Mohammad Hisham Li", department: "Study of Religion" },
    "16250": { name: "Muhammed Uvais K", department: "Study of Religion" },
    "16292": { name: "Arshad Hassan T", department: "Study of Religion" },
    "16296": { name: "Abdul Basith D", department: "Study of Religion" },
    "16312": { name: "Sarthaj C", department: "Study of Religion" },
    "16327": { name: "Mohammed Rinshad Kt", department: "Study of Religion" },
    "16328": { name: "Hamid Shahan K", department: "Study of Religion" },
    "16336": { name: "Salmanul Faris K", department: "Study of Religion" },
    "16355": { name: "Mazin Abbas Naveer Naveer", department: "Study of Religion" },
    "16368": { name: "Muhammed Adil K", department: "Study of Religion" },
    "16528": { name: "Aminal Alam Ali", department: "Study of Religion" },
    "16550": { name: "Forman Ali Sikdar", department: "Study of Religion" },
    "16571": { name: "Muhammed Ashique C", department: "Study of Religion" },
    "16605": { name: "Muhammed Zulfikar", department: "Study of Religion" },
    "16610": { name: "Muhammed Musthajab", department: "Study of Religion" },
    "16611": { name: "Asif Sinan", department: "Study of Religion" },
    "16621": { name: "Ka Mohammed Shamsheer", department: "Study of Religion" },
    "16623": { name: "Salim Ameen", department: "Study of Religion" },
    "16631": { name: "Ramees Ahammed Mu", department: "Study of Religion" },
    "16634": { name: "Muhammed Sufyan Saleem Pp", department: "Study of Religion" },
    "16687": { name: "Muhammed Noufal", department: "Study of Religion" },
    "16714": { name: "Mohammed Hashir", department: "Study of Religion" },
    "16720": { name: "Miras Muhammed K", department: "Study of Religion" },
    "16721": { name: "Mohammad Khalandar Ziyad", department: "Study of Religion" },
    "16722": { name: "Sadakkathullah Mm", department: "Study of Religion" },
    "16723": { name: "Muzammil C.P", department: "Study of Religion" },
    "16724": { name: "Adheeb Rashdan K", department: "Study of Religion" },
    "16726": { name: "Ahammed Aslin N", department: "Study of Religion" },
    "16765": { name: "Swafvan M.K", department: "Study of Religion" },
    "16769": { name: "Yaseen Muhammed K.A", department: "Study of Religion" },
    "16786": { name: "Muhammed Rashid", department: "Study of Religion" },
    "16806": { name: "Muhammed Rajif N P", department: "Study of Religion" },
    "16815": { name: "Muhammed Sinad Kv", department: "Study of Religion" },
    "16860": { name: "Mahammad Afrid", department: "Study of Religion" },
    "16861": { name: "Aboobaker Sidheeq K", department: "Study of Religion" },
    "16863": { name: "Mohammed Anas Otteth", department: "Study of Religion" },
    "16892": { name: "Nihal Ibrahim Pp", department: "Study of Religion" },
    "16919": { name: "Md Samir Ali", department: "Study of Religion" },
    "16930": { name: "Muhammed Bisher Kc", department: "Study of Religion" },
    "16938": { name: "Hamid Mm", department: "Study of Religion" },
    "16945": { name: "Arshad Ahammed V", department: "Study of Religion" },
    "16954": { name: "Muhammed Siyan K", department: "Study of Religion" },
    "16958": { name: "Majidul Islam", department: "Study of Religion" },
    "16962": { name: "Faslu Rahman", department: "Study of Religion" },
    "16967": { name: "Muhammed Noufal O A", department: "Study of Religion" },
    "16980": { name: "Muhammed Anshif K", department: "Study of Religion" },
    "16989": { name: "Farhan A", department: "Study of Religion" },
    "17010": { name: "Md Ruhul Amin", department: "Study of Religion" },
    "17033": { name: "Minhaj M", department: "Study of Religion" },
    "17040": { name: "Sanaullhakhan Kv", department: "Study of Religion" },
    "17043": { name: "Toufeeque Umar", department: "Study of Religion" },
    "17045": { name: "Ahammed Arshad M N", department: "Study of Religion" },
    "17051": { name: "Adil Ahamad K.P", department: "Study of Religion" },
    "17058": { name: "Mahammed Nizamuddeen", department: "Study of Religion" },
    "17062": { name: "Mohammed Shahal C.T", department: "Study of Religion" },
    "17068": { name: "Muhammed Basil C", department: "Study of Religion" },
    "17081": { name: "Muhammed Swalah", department: "Study of Religion" },
    "17087": { name: "Irfan T", department: "Study of Religion" },
    "17105": { name: "Nazimul Hassan Mollah", department: "Study of Religion" },
    "17107": { name: "Hamid Ali N", department: "Study of Religion" },
    "17119": { name: "Musharaf Hoque", department: "Study of Religion" },
    "17127": { name: "Muhammed Nisam Kp", department: "Study of Religion" },
    "17143": { name: "Muhammed Nadil Pc", department: "Study of Religion" },
    "17146": { name: "Asraful Ali", department: "Study of Religion" },
    "17158": { name: "Minhaj M", department: "Study of Religion" },
    "17188": { name: "MUHAMMED ABDU RAHMAN TP", department: "Study of Religion" },

    // 7. Civilizational Studies
    "15982": { name: "Ahamed Asif M", department: "Civilizational Studies" },
    "16027": { name: "Ashkar Ali Cp", department: "Civilizational Studies" },
    "16036": { name: "Ahmed Adil B.K", department: "Civilizational Studies" },
    "16069": { name: "Ibrahim Badusha P", department: "Civilizational Studies" },
    "16084": { name: "Mohammed Shees A", department: "Civilizational Studies" },
    "16099": { name: "Nazirul Aziz", department: "Civilizational Studies" },
    "16111": { name: "Muhammed Jafin Tvc", department: "Civilizational Studies" },
    "16115": { name: "Muhammed Theshreef", department: "Civilizational Studies" },
    "16120": { name: "Muhammad Sahal Tk", department: "Civilizational Studies" },
    "16143": { name: "Mahsin Akram", department: "Civilizational Studies" },
    "16159": { name: "Muhammed Mannah Ca", department: "Civilizational Studies" },
    "16161": { name: "Ahammed Najah Ap", department: "Civilizational Studies" },
    "16166": { name: "Jahidul Hassan", department: "Civilizational Studies" },
    "16206": { name: "Muhammed Midlaj E", department: "Civilizational Studies" },
    "16208": { name: "Nasim Sekh", department: "Civilizational Studies" },
    "16231": { name: "Muhammed Nasweeh P", department: "Civilizational Studies" },
    "16236": { name: "Tousif Reja", department: "Civilizational Studies" },
    "16268": { name: "Araj Sekh", department: "Civilizational Studies" },
    "16275": { name: "Muhammed Swalih M", department: "Civilizational Studies" },
    "16277": { name: "Muhammed Sahal Kp", department: "Civilizational Studies" },
    "16281": { name: "Saifudeen Mt", department: "Civilizational Studies" },
    "16311": { name: "Muhammed Jazeel P", department: "Civilizational Studies" },
    "16316": { name: "Muhammed Afnan Lk", department: "Civilizational Studies" },
    "16360": { name: "Ansarul", department: "Civilizational Studies" },
    "16367": { name: "Salahudheen Azeem Tk", department: "Civilizational Studies" },
    "16379": { name: "Muhammed Unais Pt", department: "Civilizational Studies" },
    "16390": { name: "Muhammad Sabith Tp", department: "Civilizational Studies" },
    "16410": { name: "Rabiul Alam", department: "Civilizational Studies" },
    "16412": { name: "Ahammed Ajnas K", department: "Civilizational Studies" },
    "16437": { name: "Najeeh Rahman P", department: "Civilizational Studies" },
    "16444": { name: "Pp Muhammad Bilal", department: "Civilizational Studies" },
    "16462": { name: "Muhammed Bayis Km", department: "Civilizational Studies" },
    "16512": { name: "Muhammad Muzammil E.A", department: "Civilizational Studies" },
    "16540": { name: "Zainudeen", department: "Civilizational Studies" },
    "16615": { name: "Muhammed Fayis P", department: "Civilizational Studies" },
    "16495": { name: "Elias Chawdhury", department: "Civilizational Studies" },
    "16627": { name: "Abdul Muhaimin Pt", department: "Civilizational Studies" },
    "16642": { name: "Muhammed Safvan K", department: "Civilizational Studies" },
    "16645": { name: "Mohammed Midlaj M", department: "Civilizational Studies" },
    "16646": { name: "Habeel Aman K K", department: "Civilizational Studies" },
    "16660": { name: "Sayyid Jazeel Jifri Pm", department: "Civilizational Studies" },
    "16672": { name: "Muhammed Faheem", department: "Civilizational Studies" },
    "16700": { name: "Muuhammed Jaseem V P M", department: "Civilizational Studies" },
    "16708": { name: "Abdul Basith Elanthikkal", department: "Civilizational Studies" },
    "16718": { name: "Mohammad Midlaj Av", department: "Civilizational Studies" },
    "16732": { name: "Muhammed Ajmal", department: "Civilizational Studies" },
    "16734": { name: "Muhammed Jaseem V", department: "Civilizational Studies" },
    "16756": { name: "Ajmal P V", department: "Civilizational Studies" },
    "16764": { name: "Muhammed Thameem Pk", department: "Civilizational Studies" },
    "16776": { name: "Mubashir Kp", department: "Civilizational Studies" },
    "16785": { name: "Fawaz Muhammed", department: "Civilizational Studies" },
    "16801": { name: "Muhammed Sinan Vm", department: "Civilizational Studies" },
    "16811": { name: "Muhammed Basil Vm", department: "Civilizational Studies" },
    "16847": { name: "Arshad Mp", department: "Civilizational Studies" },
    "16867": { name: "Md Jahir Ali", department: "Civilizational Studies" },
    "16868": { name: "Muhammed Hismathulla Ck", department: "Civilizational Studies" },
    "16900": { name: "Md Jayad Sk", department: "Civilizational Studies" },
    "16907": { name: "Muhammed Faez T K", department: "Civilizational Studies" },
    "16942": { name: "Shadin G", department: "Civilizational Studies" },
    "16947": { name: "Mahammed Shameel", department: "Civilizational Studies" },
    "16950": { name: "Hashem Ali", department: "Civilizational Studies" },
    "16951": { name: "Muhammed Muflih K", department: "Civilizational Studies" },
    "16963": { name: "Shamil C", department: "Civilizational Studies" },
    "16970": { name: "Muhammed Shanil Pm", department: "Civilizational Studies" },
    "16974": { name: "Mahammed Shakir", department: "Civilizational Studies" },
    "17025": { name: "Ibrahim Mansoor", department: "Civilizational Studies" },
    "17027": { name: "Muhammed Sehil K", department: "Civilizational Studies" },
    "17038": { name: "Falelu Rahman P", department: "Civilizational Studies" },
    "17075": { name: "Salman M", department: "Civilizational Studies" },
    "17093": { name: "Irfan Raza", department: "Civilizational Studies" },
    "17110": { name: "Abdul Jaleel M", department: "Civilizational Studies" },
    "17125": { name: "Muhammed Adil", department: "Civilizational Studies" },
    "17161": { name: "Muhammed Shahal", department: "Civilizational Studies" },

    // 8. Community Leadership and Social Change
    "16023": { name: "Munavir", department: "Community Leadership and Social Change" },
    "16059": { name: "Mohammed Fasil KP", department: "Community Leadership and Social Change" },
    "16079": { name: "Muhammad Yahya", department: "Community Leadership and Social Change" },
    "16239": { name: "Husni Mubarak Kt", department: "Community Leadership and Social Change" },
    "16324": { name: "Mohammad", department: "Community Leadership and Social Change" },
    "16330": { name: "Muhammed Shafi Ek", department: "Community Leadership and Social Change" },
    "16397": { name: "Salman Faris", department: "Community Leadership and Social Change" },
    "16406": { name: "Abdul Bashith", department: "Community Leadership and Social Change" },
    "16415": { name: "Muhammed Hashim", department: "Community Leadership and Social Change" },
    "16416": { name: "Ayyoob", department: "Community Leadership and Social Change" },
    "16425": { name: "Mashood Pk", department: "Community Leadership and Social Change" },
    "16428": { name: "Isham", department: "Community Leadership and Social Change" },
    "16433": { name: "Irshad", department: "Community Leadership and Social Change" },
    "16442": { name: "Abdhu Sabith", department: "Community Leadership and Social Change" },
    "16468": { name: "Fawas", department: "Community Leadership and Social Change" },
    "16488": { name: "Mahammad Safad", department: "Community Leadership and Social Change" },
    "16493": { name: "Muhammed Bin Abdul Kadhar", department: "Community Leadership and Social Change" },
    "16494": { name: "Mohamed Safwan", department: "Community Leadership and Social Change" },
    "16498": { name: "Muhammed Midlaj Pk", department: "Community Leadership and Social Change" },
    "16509": { name: "Muhammed Yasir", department: "Community Leadership and Social Change" },
    "16534": { name: "Muhammed Faris", department: "Community Leadership and Social Change" },
    "16535": { name: "Muhammed Razi", department: "Community Leadership and Social Change" },
    "16545": { name: "Umarul", department: "Community Leadership and Social Change" },
    "16546": { name: "Muhammed Nihal", department: "Community Leadership and Social Change" },
    "16555": { name: "Hafis Muhammed S M", department: "Community Leadership and Social Change" },
    "16558": { name: "Muhammed Shanavas", department: "Community Leadership and Social Change" },
    "16566": { name: "Mohammed Sinan", department: "Community Leadership and Social Change" },
    "16569": { name: "Ajmal Anees", department: "Community Leadership and Social Change" },
    "16577": { name: "Muhammed Asbaque", department: "Community Leadership and Social Change" },
    "16583": { name: "Mahammad Riyaz", department: "Community Leadership and Social Change" },
    "16598": { name: "Swalih", department: "Community Leadership and Social Change" },
    "16608": { name: "Muhammed Haris", department: "Community Leadership and Social Change" },
    "16609": { name: "Rafeeh Cm", department: "Community Leadership and Social Change" },
    "16641": { name: "Mohammed Irfan", department: "Community Leadership and Social Change" },
    "16675": { name: "Thanseef As", department: "Community Leadership and Social Change" },
    "16685": { name: "Mohammed Naseef", department: "Community Leadership and Social Change" },
    "16707": { name: "Muhammed Fawas", department: "Community Leadership and Social Change" },
    "16758": { name: "Muhammed Salmanul Faris U", department: "Community Leadership and Social Change" },
    "16768": { name: "Muhammed Mujthaba", department: "Community Leadership and Social Change" },
    "16781": { name: "Muhammed Ajsal T", department: "Community Leadership and Social Change" },
    "16791": { name: "Hassan Shaddad Um", department: "Community Leadership and Social Change" },
    "16824": { name: "Nu'Man Shibili K", department: "Community Leadership and Social Change" },
    "16825": { name: "Muhammad Vayis", department: "Community Leadership and Social Change" },
    "16829": { name: "Muhammed Ajmal K", department: "Community Leadership and Social Change" },
    "16832": { name: "Muhammed Sahal C H", department: "Community Leadership and Social Change" },
    "16834": { name: "Muhammed Irfan", department: "Community Leadership and Social Change" },
    "16841": { name: "Muhammed Muhsin P", department: "Community Leadership and Social Change" },
    "16842": { name: "Muhammed Anshif P", department: "Community Leadership and Social Change" },
    "16843": { name: "Sk Naveed", department: "Community Leadership and Social Change" },
    "16845": { name: "Muhammed Saleel V", department: "Community Leadership and Social Change" },
    "16851": { name: "Salman Faris", department: "Community Leadership and Social Change" },
    "16854": { name: "Muhammed Junaid", department: "Community Leadership and Social Change" },
    "16865": { name: "Muhammed Mirdas Kk", department: "Community Leadership and Social Change" },
    "16866": { name: "Yoosuf Sabith", department: "Community Leadership and Social Change" },
    "16870": { name: "Abdul Majid", department: "Community Leadership and Social Change" },
    "16885": { name: "Althaf Shafeeq T.S", department: "Community Leadership and Social Change" },
    "16886": { name: "Muhammed Rabeen Kuniyankattil", department: "Community Leadership and Social Change" },
    "16906": { name: "Mahammad Afsal", department: "Community Leadership and Social Change" },
    "16914": { name: "Muhammed Sinan T C", department: "Community Leadership and Social Change" },
    "16921": { name: "Umer Abdulla", department: "Community Leadership and Social Change" },
    "16923": { name: "Abdul Raheem", department: "Community Leadership and Social Change" },
    "16926": { name: "Muhammed Swalih K", department: "Community Leadership and Social Change" },
    "16999": { name: "Muhammad Shaz", department: "Community Leadership and Social Change" },
    "17048": { name: "Mujthaba Shamil Sha", department: "Community Leadership and Social Change" },
    "17052": { name: "Muhammed Farhan E.S", department: "Community Leadership and Social Change" },
    "17084": { name: "Muhammed Midhlaj", department: "Community Leadership and Social Change" },
    "17102": { name: "Hashir Mohammed P P", department: "Community Leadership and Social Change" },
    "17118": { name: "Marwan Ashraf C", department: "Community Leadership and Social Change" },
    "17137": { name: "Mehthab Muneer", department: "Community Leadership and Social Change" },
    "17202": { name: "MOHAMMED SHADULI M A", department: "Community Leadership and Social Change" },

    // 9. Societal Development
    "16106": { name: "Safwan Kn", department: "Societal Development" },
    "16116": { name: "Mohammed Badruddin", department: "Societal Development" },
    "16117": { name: "Muhammed Basim Kabeer Kp", department: "Societal Development" },
    "16124": { name: "Uvais Ahmed T", department: "Societal Development" },
    "16125": { name: "Muhammed Muhthaj Mk", department: "Societal Development" },
    "16126": { name: "Muhammed Anshif M", department: "Societal Development" },
    "16130": { name: "Muihammed Nufail A.P", department: "Societal Development" },
    "16132": { name: "Muhammed Sinan Np", department: "Societal Development" },
    "16135": { name: "Muhammed Swalih E", department: "Societal Development" },
    "16142": { name: "Anas", department: "Societal Development" },
    "16175": { name: "Muhammed Aslam Pk", department: "Societal Development" },
    "16190": { name: "Muhammed Ashfaq", department: "Societal Development" },
    "16199": { name: "Muhammed Fasil K", department: "Societal Development" },
    "16212": { name: "Muhammed Thenshir P", department: "Societal Development" },
    "16242": { name: "Hashir Ali", department: "Societal Development" },
    "16251": { name: "Anas N", department: "Societal Development" },
    "16259": { name: "Habeeb Aflal Rahman M", department: "Societal Development" },
    "16276": { name: "Mohammad Ashiq Pm", department: "Societal Development" },
    "16290": { name: "Mohammad Shammas P", department: "Societal Development" },
    "16307": { name: "Muhammed Aboobacker C", department: "Societal Development" },
    "16343": { name: "Mohammed Irshad Np", department: "Societal Development" },
    "16354": { name: "Muhammed Junaid Pp", department: "Societal Development" },
    "16357": { name: "Muhammed Dhanish V", department: "Societal Development" },
    "16378": { name: "Najeeb Ali Abdu", department: "Societal Development" },
    "16400": { name: "Salmeen Abdul Kareem Ta", department: "Societal Development" },
    "16405": { name: "Muzammil C V", department: "Societal Development" },
    "16411": { name: "Muhammed Unais", department: "Societal Development" },
    "16414": { name: "Muhammed Abdu Rahman", department: "Societal Development" },
    "16421": { name: "Muhammed Nihal P", department: "Societal Development" },
    "16453": { name: "Muhammed Ismayil P", department: "Societal Development" },
    "16473": { name: "Hashim Abdu Samad K", department: "Societal Development" },
    "16513": { name: "Muhammed Midhlaj Ks", department: "Societal Development" },
    "16576": { name: "Muhammed Midlaj Ck", department: "Societal Development" },
    "16606": { name: "Muhammad Suhood", department: "Societal Development" },
    "16630": { name: "Mehazin Aman T", department: "Societal Development" },
    "16639": { name: "Muhammed Aslam Vt", department: "Societal Development" },
    "16657": { name: "Abdulla Sinan Pt", department: "Societal Development" },
    "16664": { name: "Mahammad Irfan", department: "Societal Development" },
    "16669": { name: "Muhammed Jemsheer Kv", department: "Societal Development" },
    "16676": { name: "Muhammed Musthafa Vp", department: "Societal Development" },
    "16686": { name: "Yaseen Gazzali Cp", department: "Societal Development" },
    "16690": { name: "Muhammad Hashir", department: "Societal Development" },
    "16695": { name: "Munnas Alungal", department: "Societal Development" },
    "16698": { name: "Mohammed Shahim", department: "Societal Development" },
    "16704": { name: "Muhammed Naseeh Mc", department: "Societal Development" },
    "16727": { name: "Muhammed Sufyan Vv", department: "Societal Development" },
    "16729": { name: "Muhammed Farhan", department: "Societal Development" },
    "16730": { name: "Muhammad Ansar K V", department: "Societal Development" },
    "16733": { name: "Bishr C P", department: "Societal Development" },
    "16741": { name: "Muhammed Juraij Vp", department: "Societal Development" },
    "16767": { name: "Muhammed Jabir", department: "Societal Development" },
    "16778": { name: "Muhammed Adil M T P", department: "Societal Development" },
    "16797": { name: "Swalih Minhaj U", department: "Societal Development" },
    "16799": { name: "Muhammed Nihal K", department: "Societal Development" },
    "16804": { name: "Muhammed Shibili", department: "Societal Development" },
    "16817": { name: "Mohammed Swadiq", department: "Societal Development" },
    "16833": { name: "Ibrahim Ag", department: "Societal Development" },
    "16869": { name: "Muhammed Hashim Ek", department: "Societal Development" },
    "16873": { name: "Muhammed Musthafa V", department: "Societal Development" },
    "16876": { name: "Adnan Sanaf", department: "Societal Development" },
    "16887": { name: "Muhammed Pk", department: "Societal Development" },
    "16893": { name: "Muhammed Saheer P", department: "Societal Development" },
    "16903": { name: "Muhammed Rashif K", department: "Societal Development" },
    "16904": { name: "Abdul Rauoof Ca", department: "Societal Development" },
    "16937": { name: "Muhammed Swadiq Ta", department: "Societal Development" },
    "16944": { name: "Muhammed Hisham P.V", department: "Societal Development" },
    "16973": { name: "Muhammed Hashim T", department: "Societal Development" },
    "16997": { name: "Murshid", department: "Societal Development" },
    "17020": { name: "Sinsarul Haq K", department: "Societal Development" },
    "17031": { name: "Mohammed Shuaib K", department: "Societal Development" },
    "17036": { name: "Muhammed Shamil M", department: "Societal Development" },
    "17050": { name: "Abdulla Akhnas Vt", department: "Societal Development" },
    "17061": { name: "Muhammed Hashim T", department: "Societal Development" },

    // 10. Arabic Language and Literature
    "16064": { name: "Muhammed Safwan Mp", department: "Arabic Language and Literature" },
    "16081": { name: "Muhammed Musharraf C", department: "Arabic Language and Literature" },
    "16092": { name: "Ishaq Sa", department: "Arabic Language and Literature" },
    "16104": { name: "Muhammed Shibli P", department: "Arabic Language and Literature" },
    "16154": { name: "Muhammed Aslam K", department: "Arabic Language and Literature" },
    "16169": { name: "Rajjak Hussain", department: "Arabic Language and Literature" },
    "16173": { name: "Thanveer Ahammed T", department: "Arabic Language and Literature" },
    "16218": { name: "Muhammed Thufail V", department: "Arabic Language and Literature" },
    "16223": { name: "Muhammed Sinan Pa", department: "Arabic Language and Literature" },
    "16224": { name: "Afthab Rahman Pt", department: "Arabic Language and Literature" },
    "16230": { name: "Imran Shaikh", department: "Arabic Language and Literature" },
    "16240": { name: "Salman Ibnu Haris Ak", department: "Arabic Language and Literature" },
    "16253": { name: "Muhammed Salim. Mk", department: "Arabic Language and Literature" },
    "16265": { name: "Muhammed Nadeer Pp", department: "Arabic Language and Literature" },
    "16283": { name: "Sayyed Muhammed Sahal Ap", department: "Arabic Language and Literature" },
    "16286": { name: "Muhammed Thanseer", department: "Arabic Language and Literature" },
    "16289": { name: "Muhammed Swalih P", department: "Arabic Language and Literature" },
    "16291": { name: "Muhammed Anas Akaram Ansari", department: "Arabic Language and Literature" },
    "16295": { name: "Md Sanuar Hoque", department: "Arabic Language and Literature" },
    "16315": { name: "Gulam Navi Shekh", department: "Arabic Language and Literature" },
    "16319": { name: "Shaheer Ahamed At", department: "Arabic Language and Literature" },
    "16322": { name: "Mohammed Sabith M", department: "Arabic Language and Literature" },
    "16356": { name: "Mohammed Yoonus Ali C", department: "Arabic Language and Literature" },
    "16429": { name: "Muhammed Tanveer", department: "Arabic Language and Literature" },
    "16450": { name: "Javed Raza", department: "Arabic Language and Literature" },
    "16451": { name: "Muhammed Thameem", department: "Arabic Language and Literature" },
    "16497": { name: "Abdu Rahman", department: "Arabic Language and Literature" },
    "16504": { name: "Muhammed Ashmil", department: "Arabic Language and Literature" },
    "16519": { name: "Muhammed Mufeed", department: "Arabic Language and Literature" },
    "16520": { name: "Muhammed Anas Pc", department: "Arabic Language and Literature" },
    "16543": { name: "Dilshad Tk", department: "Arabic Language and Literature" },
    "16560": { name: "Muhammed Sabith Pk", department: "Arabic Language and Literature" },
    "16581": { name: "Muhammed Saleeque K", department: "Arabic Language and Literature" },
    "16632": { name: "Muhammed Shamil.K", department: "Arabic Language and Literature" },
    "16633": { name: "Muhammed Shakeeb T", department: "Arabic Language and Literature" },
    "16673": { name: "Muhammed Javad K.A", department: "Arabic Language and Literature" },
    "16703": { name: "Md Ahesan Ali", department: "Arabic Language and Literature" },
    "16731": { name: "Muhammad Shaheer", department: "Arabic Language and Literature" },
    "16759": { name: "Muhammed Abdal", department: "Arabic Language and Literature" },
    "16766": { name: "Muhammed Fathah M.S", department: "Arabic Language and Literature" },
    "16787": { name: "Mahammad Thashreef", department: "Arabic Language and Literature" },
    "16789": { name: "Muhammed Shabeeb P", department: "Arabic Language and Literature" },
    "16792": { name: "Sibtain Raza", department: "Arabic Language and Literature" },
    "16878": { name: "Musthafa Moolakadath", department: "Arabic Language and Literature" },
    "16910": { name: "Mohammed Ismayil", department: "Arabic Language and Literature" },
    "16941": { name: "Ameer Kt", department: "Arabic Language and Literature" },
    "16946": { name: "Ali Fasil P A", department: "Arabic Language and Literature" },
    "16972": { name: "Muhammed Anas Pp", department: "Arabic Language and Literature" },
    "16976": { name: "Muhammed Abdulla Thanveer M.K", department: "Arabic Language and Literature" },
    "16985": { name: "Althaf P.A", department: "Arabic Language and Literature" },
    "16986": { name: "Ahsin Hassan T.A", department: "Arabic Language and Literature" },
    "16991": { name: "Muhammed Sinan Pk Pk", department: "Arabic Language and Literature" },
    "17003": { name: "Rashban", department: "Arabic Language and Literature" },
    "17014": { name: "Muhammad Junaid", department: "Arabic Language and Literature" },
    "17019": { name: "Muhammed Ijas K", department: "Arabic Language and Literature" },
    "17064": { name: "Ziyad M T", department: "Arabic Language and Literature" },
    "17071": { name: "Muhammed Muzammil T", department: "Arabic Language and Literature" },
    "17100": { name: "Muhammed Muneer J", department: "Arabic Language and Literature" },
    "17101": { name: "Muhammed Siyad O P", department: "Arabic Language and Literature" },
    "17103": { name: "Thahir Muhammad", department: "Arabic Language and Literature" },
    "17121": { name: "Muhammed Nihal A K", department: "Arabic Language and Literature" },
    "17126": { name: "Muhammed Yahya Av", department: "Arabic Language and Literature" },
    "17139": { name: "Muhammed Yasin Vp", department: "Arabic Language and Literature" },
    "17141": { name: "Abdul Kader Al Ameen", department: "Arabic Language and Literature" },
    "17149": { name: "Muhammed Sinan Kt", department: "Arabic Language and Literature" },
    "17150": { name: "Alfaz Shameer", department: "Arabic Language and Literature" },
    "17153": { name: "Muhammed Adnan K", department: "Arabic Language and Literature" },
    "17163": { name: "Muzammil K.P", department: "Arabic Language and Literature" },
    "17184": { name: "ABU THAHIR", department: "Arabic Language and Literature" },

    // 11. Translation and Comparitive Literature
    "15902": { name: "Abdul Hafeez Hafeez", department: "Translation and Comparitive Literature" },
    "15905": { name: "Shuhaib", department: "Translation and Comparitive Literature" },
    "15908": { name: "M M Omarfaruque", department: "Translation and Comparitive Literature" },
    "16103": { name: "Falalu Rahman C M", department: "Translation and Comparitive Literature" },
    "16220": { name: "Faizan Khan", department: "Translation and Comparitive Literature" },
    "16243": { name: "Muhammed Ansif", department: "Translation and Comparitive Literature" },
    "16244": { name: "Fazlul Bari", department: "Translation and Comparitive Literature" },
    "16252": { name: "Muhammed Muqthar Ak", department: "Translation and Comparitive Literature" },
    "16267": { name: "Muhammed Nihal P.H", department: "Translation and Comparitive Literature" },
    "16284": { name: "Muhammed Dhilshad Ali N", department: "Translation and Comparitive Literature" },
    "16318": { name: "Musaraf Miah", department: "Translation and Comparitive Literature" },
    "16321": { name: "Md Tahseen Raza", department: "Translation and Comparitive Literature" },
    "16366": { name: "Shahid K", department: "Translation and Comparitive Literature" },
    "16370": { name: "Mohammmad Favas M V", department: "Translation and Comparitive Literature" },
    "16386": { name: "Ismail Jamal", department: "Translation and Comparitive Literature" },
    "16389": { name: "Shajahan Pk", department: "Translation and Comparitive Literature" },
    "16418": { name: "Muhammed Saleem", department: "Translation and Comparitive Literature" },
    "16419": { name: "Muhammed Fayas Vp", department: "Translation and Comparitive Literature" },
    "16431": { name: "Mohammad Ata Ansar Ahmed Ansari", department: "Translation and Comparitive Literature" },
    "16438": { name: "Mohammed Sinan K", department: "Translation and Comparitive Literature" },
    "16440": { name: "Muhammed Bin Hameed", department: "Translation and Comparitive Literature" },
    "16441": { name: "Muhammed Jasim .P", department: "Translation and Comparitive Literature" },
    "16443": { name: "Ridansha U", department: "Translation and Comparitive Literature" },
    "16452": { name: "Jasir P", department: "Translation and Comparitive Literature" },
    "16460": { name: "Alija Ali Izzath", department: "Translation and Comparitive Literature" },
    "16482": { name: "Muhammed Nawal .A P", department: "Translation and Comparitive Literature" },
    "16514": { name: "Muhammed Anas P", department: "Translation and Comparitive Literature" },
    "16518": { name: "Sanidul Islam", department: "Translation and Comparitive Literature" },
    "16533": { name: "Anas", department: "Translation and Comparitive Literature" },
    "16553": { name: "Md Mokibul Islam", department: "Translation and Comparitive Literature" },
    "16556": { name: "Muhammed Aslam", department: "Translation and Comparitive Literature" },
    "16557": { name: "Md Masuk", department: "Translation and Comparitive Literature" },
    "16578": { name: "Md Saquib Reza", department: "Translation and Comparitive Literature" },
    "16579": { name: "Muhammed Nabeel Mansoor", department: "Translation and Comparitive Literature" },
    "16588": { name: "Aurangzeb", department: "Translation and Comparitive Literature" },
    "16674": { name: "Farhan C", department: "Translation and Comparitive Literature" },
    "16710": { name: "Muhammed Naseef K", department: "Translation and Comparitive Literature" },
    "16895": { name: "Anshadali Ap", department: "Translation and Comparitive Literature" },
    "16902": { name: "Muhammed Qasim K P", department: "Translation and Comparitive Literature" },
    "16979": { name: "Ansari Mohammed Nizamuddin Deen Mohammed", department: "Translation and Comparitive Literature" },
    "16993": { name: "Noufan P", department: "Translation and Comparitive Literature" },
    "17015": { name: "Muhammed Nufail Kp", department: "Translation and Comparitive Literature" },
    "17032": { name: "Momin Fahad", department: "Translation and Comparitive Literature" },
    "17039": { name: "Muhammed Favas P.K", department: "Translation and Comparitive Literature" },
    "17044": { name: "Muhammed Shaheem K", department: "Translation and Comparitive Literature" },
    "17055": { name: "Sayyid Muhammed Radhin O.M Radhin", department: "Translation and Comparitive Literature" },
    "17063": { name: "Muhammed Swalih C", department: "Translation and Comparitive Literature" },
    "17073": { name: "Irfaan Farhathu E C", department: "Translation and Comparitive Literature" },
    "17077": { name: "Sainul Abid", department: "Translation and Comparitive Literature" },
    "17096": { name: "Salim Abdu Rahiman Ki", department: "Translation and Comparitive Literature" },
    "17099": { name: "Muhammed Shammas", department: "Translation and Comparitive Literature" },
    "17117": { name: "Muhammed Usman S", department: "Translation and Comparitive Literature" },
    "17135": { name: "Muhammed Nihal Pa", department: "Translation and Comparitive Literature" },
    "17136": { name: "Muhammed Irfan V", department: "Translation and Comparitive Literature" },
    "17148": { name: "Muhammed Hadiq T", department: "Translation and Comparitive Literature" },
    "17157": { name: "Abdul Rahman Munzir", department: "Translation and Comparitive Literature" },
    "17166": { name: "Rashique Ahammed Pv", department: "Translation and Comparitive Literature" },
    "17167": { name: "Muhammed Labeeb Shameem Ap", department: "Translation and Comparitive Literature" },
    "17170": { name: "Muhammed Muhsin K", department: "Translation and Comparitive Literature" },
    "17172": { name: "Muhammed Anas M.N", department: "Translation and Comparitive Literature" },
    "17173": { name: "Muhammed Ijas Ckm", department: "Translation and Comparitive Literature" },
    "17174": { name: "Muhammed Yaseen K", department: "Translation and Comparitive Literature" },
    "17175": { name: "Shanib Rahman", department: "Translation and Comparitive Literature" },
    "17183": { name: "MUHAMMED ANAS E K", department: "Translation and Comparitive Literature" },
    "17194": { name: "MOHAMMED RAZI", department: "Translation and Comparitive Literature" },
    "17198": { name: "ABDULLA M HAKEEM", department: "Translation and Comparitive Literature" },
    "17199": { name: "MUHAMMAD SINAN NP", department: "Translation and Comparitive Literature" },
    "17200": { name: "MUHAMMED RISHAD E P", department: "Translation and Comparitive Literature" },
    "17203": { name: "MOHAMMAD AZEEM H", department: "Translation and Comparitive Literature" },
    "17204": { name: "MUHAMMED NIHAD MK", department: "Translation and Comparitive Literature" },
    "17205": { name: "MUHAMMED SUFAZ P", department: "Translation and Comparitive Literature" },

    // 12. Governance and Public Administration
    "16065": { name: "Yoosuf Kamal", department: "Governance and Public Administration" },
    "16083": { name: "Shahul Hameed Faizal", department: "Governance and Public Administration" },
    "16095": { name: "Jafar Ali Jawad", department: "Governance and Public Administration" },
    "16109": { name: "Mohammed Salih P", department: "Governance and Public Administration" },
    "16118": { name: "Ahmad Asim Ag", department: "Governance and Public Administration" },
    "16119": { name: "Muhammed Irshad Pk", department: "Governance and Public Administration" },
    "16121": { name: "Muhammed Faraz K P", department: "Governance and Public Administration" },
    "16131": { name: "Muhammed Muhsin Mp", department: "Governance and Public Administration" },
    "16133": { name: "Ameen Abdulla K", department: "Governance and Public Administration" },
    "16157": { name: "Mahammad Ajmal", department: "Governance and Public Administration" },
    "16168": { name: "Mahammed Irfan", department: "Governance and Public Administration" },
    "16180": { name: "Sahal Muhammed", department: "Governance and Public Administration" },
    "16181": { name: "Muhammed Shaheem Mv", department: "Governance and Public Administration" },
    "16197": { name: "Ahammed Mushraf Ms", department: "Governance and Public Administration" },
    "16216": { name: "Muhammed Swalih K", department: "Governance and Public Administration" },
    "16257": { name: "Mohammed Afsal", department: "Governance and Public Administration" },
    "16288": { name: "Abdul Malik K C", department: "Governance and Public Administration" },
    "16325": { name: "Mahammad Sami Sn", department: "Governance and Public Administration" },
    "16329": { name: "Ahmad Midlaj Ma", department: "Governance and Public Administration" },
    "16332": { name: "Ajsal Rahman M", department: "Governance and Public Administration" },
    "16335": { name: "Mohd Suhail", department: "Governance and Public Administration" },
    "16337": { name: "Mahammad Irshad Sh", department: "Governance and Public Administration" },
    "16374": { name: "Ruamais Ali M", department: "Governance and Public Administration" },
    "16427": { name: "Muhammed Ajmal Kp", department: "Governance and Public Administration" },
    "16436": { name: "Muhammed Sinan Tk", department: "Governance and Public Administration" },
    "16474": { name: "Anshif", department: "Governance and Public Administration" },
    "16479": { name: "Mohammed Arshed Pp", department: "Governance and Public Administration" },
    "16538": { name: "Muhammed Rahees K", department: "Governance and Public Administration" },
    "16548": { name: "Muhammed Fasal P", department: "Governance and Public Administration" },
    "16549": { name: "Ashif Kandoth", department: "Governance and Public Administration" },
    "16596": { name: "Mohammed Shamsheer", department: "Governance and Public Administration" },
    "16617": { name: "Muhammed Irfan C", department: "Governance and Public Administration" },
    "16618": { name: "Muhammed Nizamuddeen P", department: "Governance and Public Administration" },
    "16619": { name: "Fahmeed Khan Ep", department: "Governance and Public Administration" },
    "16625": { name: "Sulthan Bin Abbas", department: "Governance and Public Administration" },
    "16636": { name: "Muhammed Jasim Panakkathodan", department: "Governance and Public Administration" },
    "16638": { name: "Ahmad Shumail", department: "Governance and Public Administration" },
    "16640": { name: "Muhammed Safeer Keedakkallan", department: "Governance and Public Administration" },
    "16650": { name: "Abdulla Pp", department: "Governance and Public Administration" },
    "16653": { name: "Muhammed Afsal N", department: "Governance and Public Administration" },
    "16662": { name: "Mahammad Safwan Kh", department: "Governance and Public Administration" },
    "16665": { name: "Abbas Aznab M.A", department: "Governance and Public Administration" },
    "16667": { name: "Muhammed Diyab P", department: "Governance and Public Administration" },
    "16679": { name: "Muhammed Javvad Kt", department: "Governance and Public Administration" },
    "16694": { name: "Md Saquib Raza", department: "Governance and Public Administration" },
    "16702": { name: "Muhammed Saheer Nt", department: "Governance and Public Administration" },
    "16713": { name: "Mahammad Savad", department: "Governance and Public Administration" },
    "16719": { name: "Ahammed Razi Pt", department: "Governance and Public Administration" },
    "16748": { name: "Muhammed Habeeb T", department: "Governance and Public Administration" },
    "16750": { name: "Muhammed Habeeb", department: "Governance and Public Administration" },
    "16757": { name: "Abrar Salim", department: "Governance and Public Administration" },
    "16788": { name: "Abu Saad Shaikh", department: "Governance and Public Administration" },
    "16796": { name: "Ilyas Ahammad", department: "Governance and Public Administration" },
    "16809": { name: "Muhammed Safwan C B", department: "Governance and Public Administration" },
    "16814": { name: "Basim Ahammed", department: "Governance and Public Administration" },
    "16836": { name: "Aaftab Ali Ansari", department: "Governance and Public Administration" },
    "16838": { name: "Muhammad Salah K", department: "Governance and Public Administration" },
    "16848": { name: "Mohammed Muddassir", department: "Governance and Public Administration" },
    "16857": { name: "Muhammed K", department: "Governance and Public Administration" },
    "16859": { name: "Namshad Nihal", department: "Governance and Public Administration" },
    "16872": { name: "Vahid Mp", department: "Governance and Public Administration" },
    "16879": { name: "Muzammil P", department: "Governance and Public Administration" },
    "16984": { name: "Shaik Umar Farooq", department: "Governance and Public Administration" },
    "17016": { name: "Muhammed Ansil Mp", department: "Governance and Public Administration" },
    "17037": { name: "Muhammed Ameen P", department: "Governance and Public Administration" },
    "17082": { name: "Mohammed Miqdad", department: "Governance and Public Administration" },

    // 13. Law, Justice and Governance
    "15956": { name: "Muhammad Raslan E K", department: "Law, Justice and Governance" },
    "15945": { name: "Mohemmed Shahabas K", department: "Law, Justice and Governance" },
    "15676": { name: "Mubadhih Ali", department: "Law, Justice and Governance" },
    "15937": { name: "Abdul Gaffar", department: "Law, Justice and Governance" },
    "16062": { name: "Sharafiyab MP", department: "Law, Justice and Governance" },
    "16153": { name: "Muhammed Liyakath PK", department: "Law, Justice and Governance" },
    "16182": { name: "Roushad", department: "Law, Justice and Governance" },
    "16256": { name: "Ahammed Mubarak", department: "Law, Justice and Governance" },
    "16264": { name: "Muhammed Nisam", department: "Law, Justice and Governance" },
    "16294": { name: "Abdulla Swalih", department: "Law, Justice and Governance" },
    "16352": { name: "Muhammed Murshid", department: "Law, Justice and Governance" },
    "16362": { name: "Muhammed Safwan", department: "Law, Justice and Governance" },
    "16369": { name: "Muhammad Musthafa", department: "Law, Justice and Governance" },
    "16409": { name: "Muhammed Najeeb", department: "Law, Justice and Governance" },
    "16461": { name: "Thasleem Kp", department: "Law, Justice and Governance" },
    "16467": { name: "Muhammed Uvais", department: "Law, Justice and Governance" },
    "16480": { name: "Muhammed Jasim", department: "Law, Justice and Governance" },
    "16499": { name: "Muhammed Sinan.", department: "Law, Justice and Governance" },
    "16506": { name: "Muhammad Sarshal", department: "Law, Justice and Governance" },
    "16510": { name: "Muhammad Swalih", department: "Law, Justice and Governance" },
    "16522": { name: "Muhammed Swalih", department: "Law, Justice and Governance" },
    "16531": { name: "Muhammed Nafi'", department: "Law, Justice and Governance" },
    "16536": { name: "Rashad", department: "Law, Justice and Governance" },
    "16561": { name: "Abdu Rasheed", department: "Law, Justice and Governance" },
    "16567": { name: "Aminul", department: "Law, Justice and Governance" },
    "16570": { name: "Muhammed Adhil", department: "Law, Justice and Governance" },
    "16573": { name: "Anees Abdulla", department: "Law, Justice and Governance" },
    "16582": { name: "Muhammed Alfas O C", department: "Law, Justice and Governance" },
    "16584": { name: "Muhammed Marvan", department: "Law, Justice and Governance" },
    "16585": { name: "Muhammed Luquman", department: "Law, Justice and Governance" },
    "16593": { name: "Abdul Hadi", department: "Law, Justice and Governance" },
    "16597": { name: "Abdul Vajid", department: "Law, Justice and Governance" },
    "16599": { name: "Amjadul Ameen K", department: "Law, Justice and Governance" },
    "16602": { name: "Muhammed Anshan", department: "Law, Justice and Governance" },
    "16395": { name: "Niyasul Salman", department: "Law, Justice and Governance" },
    "16491": { name: "Muhammed Dilshad", department: "Law, Justice and Governance" },
    "16614": { name: "Abdul Basith Ct", department: "Law, Justice and Governance" },
    "16644": { name: "Abu Salman Ts", department: "Law, Justice and Governance" },
    "16654": { name: "Muhammed Basith Basith", department: "Law, Justice and Governance" },
    "16697": { name: "Abdullah T", department: "Law, Justice and Governance" },
    "16728": { name: "Sayyid Sahood Abdu Rahman", department: "Law, Justice and Governance" },
    "16743": { name: "Mohammed Shammas S.I", department: "Law, Justice and Governance" },
    "16746": { name: "Muhammed Riyas K.R", department: "Law, Justice and Governance" },
    "16755": { name: "Nawedul Hasan", department: "Law, Justice and Governance" },
    "16760": { name: "Sayyed Mahmood Hashim Thangal", department: "Law, Justice and Governance" },
    "16762": { name: "Amir A.Asan", department: "Law, Justice and Governance" },
    "16763": { name: "Muhammed Ashique M", department: "Law, Justice and Governance" },
    "16793": { name: "Jafakash Jahan", department: "Law, Justice and Governance" },
    "16800": { name: "Mohammed Aslam P", department: "Law, Justice and Governance" },
    "16802": { name: "Muhammed Fahim", department: "Law, Justice and Governance" },
    "16808": { name: "Muhammed Jahafar Cp", department: "Law, Justice and Governance" },
    "16813": { name: "Muhammed Siyan", department: "Law, Justice and Governance" },
    "16849": { name: "Muhammed Ashique Op", department: "Law, Justice and Governance" },
    "16852": { name: "Md Khalid Raza", department: "Law, Justice and Governance" },
    "16856": { name: "Muhammed Rashiq Pm", department: "Law, Justice and Governance" },
    "16880": { name: "Muhammed Shamil K", department: "Law, Justice and Governance" },
    "16881": { name: "Mohammed Firaz A K", department: "Law, Justice and Governance" },
    "16884": { name: "Muhammed Sajad. K.P", department: "Law, Justice and Governance" },
    "16894": { name: "Muhammed Salim O", department: "Law, Justice and Governance" },
    "16899": { name: "Muhammed Rashad Pt", department: "Law, Justice and Governance" },
    "16915": { name: "Muhammad Bishar K", department: "Law, Justice and Governance" },
    "16917": { name: "Muhammed Rashid Cs", department: "Law, Justice and Governance" },
    "16983": { name: "Muhammed Ajnas", department: "Law, Justice and Governance" },
    "16988": { name: "Rinshad Shan A", department: "Law, Justice and Governance" },
    "17018": { name: "Muhammed Fayis Up", department: "Law, Justice and Governance" },
    "17059": { name: "Muhammed Shabeeb Cp", department: "Law, Justice and Governance" },
    "17060": { name: "Mahammed Miqdad", department: "Law, Justice and Governance" },
    "17078": { name: "Muhammed Thwayyib Thankayathil", department: "Law, Justice and Governance" },
    "17088": { name: "Salmanul Farisy A.S", department: "Law, Justice and Governance" },
    "17109": { name: "Muhammed Musthafa Kuttikattil", department: "Law, Justice and Governance" },
    "17111": { name: "Mohammed Salih", department: "Law, Justice and Governance" },
    "17115": { name: "Muhammed Fuhad Kt", department: "Law, Justice and Governance" },
    "17147": { name: "Muhammed Dilfas Pt", department: "Law, Justice and Governance" },
    "17176": { name: "MUHAMMED TA", department: "Law, Justice and Governance" },

    // 14. Holistic Education
    "15931": { name: "Muhammed Saduli", department: "Holistic Education" },
    "15785": { name: "Muhammed Siyas Kp", department: "Holistic Education" },
    "16012": { name: "Sheez Muhammed", department: "Holistic Education" },
    "16165": { name: "Muhammed Safwan", department: "Holistic Education" },
    "16200": { name: "Muhammed Safwan", department: "Holistic Education" },
    "16255": { name: "Amal Ihsan Kp", department: "Holistic Education" },
    "16258": { name: "Rawan", department: "Holistic Education" },
    "16323": { name: "Muhammed Afsal", department: "Holistic Education" },
    "16341": { name: "Muhammad Shameem", department: "Holistic Education" },
    "16342": { name: "Ahammed Anjoom", department: "Holistic Education" },
    "16351": { name: "Ashhar", department: "Holistic Education" },
    "16372": { name: "Ameen", department: "Holistic Education" },
    "16373": { name: "Muhammed Salman", department: "Holistic Education" },
    "16385": { name: "Muhammed Arshad", department: "Holistic Education" },
    "16387": { name: "Muhammed Irfan", department: "Holistic Education" },
    "16391": { name: "Muhammed Anshid", department: "Holistic Education" },
    "16398": { name: "Muhamed Ihsan", department: "Holistic Education" },
    "16401": { name: "Nihal E", department: "Holistic Education" },
    "16423": { name: "Ansil", department: "Holistic Education" },
    "16439": { name: "Salmanul Farisy", department: "Holistic Education" },
    "16449": { name: "Abuthahir", department: "Holistic Education" },
    "16456": { name: "Aman T.K", department: "Holistic Education" },
    "16464": { name: "Muhammed Ashad K", department: "Holistic Education" },
    "16466": { name: "Suhail", department: "Holistic Education" },
    "16469": { name: "Muhammed Ali Fahiz", department: "Holistic Education" },
    "16470": { name: "Muhammed Hannan", department: "Holistic Education" },
    "16476": { name: "Muhammed Rafi", department: "Holistic Education" },
    "16477": { name: "Muhammed Shameel", department: "Holistic Education" },
    "16485": { name: "Muhammed Minhaj V K", department: "Holistic Education" },
    "16525": { name: "Sahadudheen", department: "Holistic Education" },
    "16529": { name: "Muhammed Anfas Km", department: "Holistic Education" },
    "16530": { name: "Muhammed Ameer", department: "Holistic Education" },
    "16542": { name: "Muhammed Thahseen", department: "Holistic Education" },
    "16565": { name: "Muhammad Hashim Roshan", department: "Holistic Education" },
    "16589": { name: "Nawwaf", department: "Holistic Education" },
    "16590": { name: "Muhammed Shameel", department: "Holistic Education" },
    "16417": { name: "Muhammed Fahim Kp", department: "Holistic Education" },
    "16652": { name: "Muhammed Thanveer Pk", department: "Holistic Education" },
    "16655": { name: "Muhammed Shamir T", department: "Holistic Education" },
    "16688": { name: "Muhammed Sinan", department: "Holistic Education" },
    "16689": { name: "Muhammed Naseef Nk", department: "Holistic Education" },
    "16699": { name: "Muhammed Shibil Chakkalakkunnnan", department: "Holistic Education" },
    "16706": { name: "Mubashir", department: "Holistic Education" },
    "16712": { name: "Tariq Anwar K.P", department: "Holistic Education" },
    "16742": { name: "Ahammed Nabeel A", department: "Holistic Education" },
    "16771": { name: "Muhammed Faris", department: "Holistic Education" },
    "16775": { name: "Muhammed Shaheer Kk", department: "Holistic Education" },
    "16779": { name: "Mohammed Ajmal V K", department: "Holistic Education" },
    "16837": { name: "Mohammed Raees K", department: "Holistic Education" },
    "16839": { name: "Muhammed Hanees P.O", department: "Holistic Education" },
    "16858": { name: "Muhammed Jasim Tm", department: "Holistic Education" },
    "16862": { name: "Abdul Basith C", department: "Holistic Education" },
    "16890": { name: "Zainul Abid.P", department: "Holistic Education" },
    "16891": { name: "Muhammed Sinan K", department: "Holistic Education" },
    "16918": { name: "Muhammed Nafih Pk", department: "Holistic Education" },
    "16965": { name: "Muhammed Sahad S", department: "Holistic Education" },
    "17000": { name: "Muhammed Nishad At", department: "Holistic Education" },
    "17001": { name: "Zainul Abid T", department: "Holistic Education" },
    "17002": { name: "Mushfir Kp", department: "Holistic Education" },
    "17024": { name: "Mohammed Muzammil E", department: "Holistic Education" },
    "17041": { name: "Muhammed Rabeeh K", department: "Holistic Education" },
    "17065": { name: "Muhammed Hilal Nk", department: "Holistic Education" },
    "17066": { name: "Muhammed Midlaj", department: "Holistic Education" },
    "17067": { name: "Muhammad Asif A.K", department: "Holistic Education" },
    "17069": { name: "Muhammed Sinan P", department: "Holistic Education" },
    "17074": { name: "Majid Pk", department: "Holistic Education" },
    "17086": { name: "Muhammed Sinan Kt", department: "Holistic Education" },
    "17113": { name: "Mohammed Rabeeh P", department: "Holistic Education" },
    "17116": { name: "Muhammed Sahl Pp", department: "Holistic Education" },
    "17154": { name: "Javad Ali", department: "Holistic Education" },
    "17155": { name: "Amjad Moosa Pk", department: "Holistic Education" },
    "17156": { name: "Muhammed Shereef", department: "Holistic Education" },
    "17165": { name: "Abdulla Bushair K", department: "Holistic Education" },
    "17196": { name: "ABDUL FATHAH LK", department: "Holistic Education" },

    // 15. Media and Communication
    "15865": { name: "Najmudheen C", department: "Media and Communication" },
    "16014": { name: "Muhammed Waheed M", department: "Media and Communication" },
    "16015": { name: "Salmanul Faris CH", department: "Media and Communication" },
    "16060": { name: "Bilal Muhammed A", department: "Media and Communication" },
    "16151": { name: "Muhammed Muhasin", department: "Media and Communication" },
    "16228": { name: "Muhammed Shakir P", department: "Media and Communication" },
    "16238": { name: "Muhammed Abdulla Majid Mk", department: "Media and Communication" },
    "16298": { name: "Farsin Vp", department: "Media and Communication" },
    "16338": { name: "Muhammed Sinan", department: "Media and Communication" },
    "16371": { name: "Muhammed Shabeeb Tp", department: "Media and Communication" },
    "16376": { name: "Ameer Shafi E A", department: "Media and Communication" },
    "16384": { name: "Muhammed Fuhad", department: "Media and Communication" },
    "16392": { name: "Salamanul Faris", department: "Media and Communication" },
    "16394": { name: "Muhammed Abdul Hadi", department: "Media and Communication" },
    "16396": { name: "Muhammed Janees", department: "Media and Communication" },
    "16420": { name: "Muhammed", department: "Media and Communication" },
    "16426": { name: "Muhammad Naeem", department: "Media and Communication" },
    "16445": { name: "Muhammad Nihal", department: "Media and Communication" },
    "16447": { name: "Mohammed Rahees", department: "Media and Communication" },
    "16458": { name: "Muhammed Razi", department: "Media and Communication" },
    "16459": { name: "Aboobacker Sidheek", department: "Media and Communication" },
    "16475": { name: "Abdulshahid Kt", department: "Media and Communication" },
    "16483": { name: "Mohammed Rafi", department: "Media and Communication" },
    "16489": { name: "Irshad", department: "Media and Communication" },
    "16502": { name: "Shahid Muneer", department: "Media and Communication" },
    "16503": { name: "Abdul Majid", department: "Media and Communication" },
    "16511": { name: "Faslu Rahman", department: "Media and Communication" },
    "16515": { name: "Muhammed Sinan K", department: "Media and Communication" },
    "16517": { name: "Abdul Varis Mt", department: "Media and Communication" },
    "16523": { name: "Mohammed Sinan Mp", department: "Media and Communication" },
    "16541": { name: "Muhammed Ramees", department: "Media and Communication" },
    "16544": { name: "Muhammad Ramees", department: "Media and Communication" },
    "16587": { name: "Muhammed Hisham P", department: "Media and Communication" },
    "16600": { name: "Aboobakr Ma'Roof", department: "Media and Communication" },
    "16671": { name: "Muhammed Midlaj Mt", department: "Media and Communication" },
    "16692": { name: "Muhammad Farhan", department: "Media and Communication" },
    "16740": { name: "Munavvir M", department: "Media and Communication" },
    "16744": { name: "Muhammed Ameen", department: "Media and Communication" },
    "16774": { name: "Thanveer", department: "Media and Communication" },
    "16777": { name: "Muhammed Sinan Pk", department: "Media and Communication" },
    "16790": { name: "Muhammed Sinan K", department: "Media and Communication" },
    "16822": { name: "Sahal Muhammed P.M", department: "Media and Communication" },
    "16826": { name: "Muhammed Nadheer A", department: "Media and Communication" },
    "16828": { name: "Muhammed Ameen K.B", department: "Media and Communication" },
    "16831": { name: "Mohammed Salmanul Faris Ck", department: "Media and Communication" },
    "16844": { name: "Muhammed Salih Pt", department: "Media and Communication" },
    "16896": { name: "Badhusha S", department: "Media and Communication" },
    "16905": { name: "Muhammed Althaf A", department: "Media and Communication" },
    "16909": { name: "Faaiz Vr", department: "Media and Communication" },
    "16912": { name: "Shuhaib Rahman Kp", department: "Media and Communication" },
    "16913": { name: "Muhammed Nabeel Ke", department: "Media and Communication" },
    "16920": { name: "Hashim Nihal", department: "Media and Communication" },
    "16928": { name: "Nabhan Ca", department: "Media and Communication" },
    "16936": { name: "Muhammed Irfan", department: "Media and Communication" },
    "16939": { name: "Sadab Raza", department: "Media and Communication" },
    "16940": { name: "Ahmed Najrie", department: "Media and Communication" },
    "16964": { name: "Ansif P", department: "Media and Communication" },
    "16966": { name: "Muhammed Hisham Ac", department: "Media and Communication" },
    "16978": { name: "Lukuman T P", department: "Media and Communication" },
    "16990": { name: "Muhammed Yahya Pa", department: "Media and Communication" },
    "16995": { name: "Anshad Rahman Pk", department: "Media and Communication" },
    "16998": { name: "Shabeel Mt", department: "Media and Communication" },
    "17012": { name: "Muhammed Arshil Ali Kp", department: "Media and Communication" },
    "17030": { name: "Ca Muhamed Musthafa", department: "Media and Communication" },
    "17053": { name: "Ajmal Khan H", department: "Media and Communication" },
    "17057": { name: "Zainu Murshideen", department: "Media and Communication" },
    "17079": { name: "Muhammed Umair K K", department: "Media and Communication" },
    "17090": { name: "Ek Abbas Ali", department: "Media and Communication" },
    "17112": { name: "Arif Zaid P.P", department: "Media and Communication" },
    "17124": { name: "Arif Muhammad B", department: "Media and Communication" },
    "17192": { name: "MUHAMMED NIHAL C", department: "Media and Communication" }
};

const ALL_DEPARTMENTS = [...new Set(Object.values(STUDENT_DATABASE).map(s => s.department))];

// ============================================
// GLOBAL STATE
// ============================================
let registrationsData = [];
let departmentSlots = {}; // Only used for Phase 1 display
let currentStudent = null;
let currentPhase = 'closed'; // 'phase1', 'phase2', 'closed'
let phase2RegistrationCount = 0; // Track Phase 2 total registrations

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
    const istOffset = 5.5 * 60;
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

    // Phase 1: 6:30 AM to 7:30 AM (390 to 450 minutes)
    const phase1Start = 6 * 60 + 20; // 390 (6:30 AM)
    const phase1End = 7 * 60 + 20; // 450 (7:30 AM)

    // Phase 2: 7:30 AM to 8:45 AM (450 to 525 minutes)
    const phase2Start = 7 * 60 + 25; // 450 (7:30 AM)
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
        phaseText.textContent = 'Phase 1: Each department has 6 slots. First come, first served.';
        selectionLabel.textContent = 'Confirm Your Department Registration';

    } else if (currentPhase === 'phase2') {
        timerBox.className = 'timer-box';
        timerText.innerHTML = '<i class="fas fa-clock mr-1"></i> Phase 2: Registration Open (Limited Slots)';
        phaseInfo.classList.remove('hidden');
        phaseInfo.className = 'info-banner';
        phaseText.textContent = 'Phase 2: Registration is open. First submissions only will be accepted.';
        selectionLabel.textContent = 'Register Now';

    } else {
        timerBox.className = 'timer-box timer-closed';
        timerText.innerHTML = '<i class="fas fa-lock mr-1"></i> Registration Closed';
        phaseInfo.classList.remove('hidden');
        phaseInfo.className = 'info-banner';
        phaseText.textContent = 'Registration only open on Thursdays from 6:30 AM to 8:45 AM IST.';
    }
}

// ============================================
// INIT
// ============================================
setupEventListeners();

(async function init() {
    await loadRegistrationsData();
    analyzeRegistrations();
    computeDepartmentSlots();
    updateTimer();
    updateUIForPhase();

    console.log('🚀 Portal ready - Phase 1: 6/dept | Phase 2: First 100 submissions');

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
            return;
        }
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
        const regPhase = existingRegistration.phase || 'unknown';
        statusDisplay.innerHTML = `<span class="status-badge status-submitted"><i class="fas fa-check-circle mr-1"></i> Already Registered (${regPhase === 'phase2' ? 'Phase 2' : 'Phase 1'}) for ${existingRegistration.department}</span>`;
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
        console.warn("Registrations fetch failed");
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
    
    console.log('Phase 2 registrations:', phase2RegistrationCount);
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
        
        if (phase === 'phase1' && dept && departmentSlots[dept]) {
            departmentSlots[dept].filled++;
            departmentSlots[dept].remaining = Math.max(0, SLOTS_PER_DEPARTMENT - departmentSlots[dept].filled);
        }
    }
    
    console.log('Department slots:', departmentSlots);
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
    const available = remaining > 0;
    const isAlreadyRegistered = registrationsData.some(r =>
        String(r.enrol).trim() === String(currentStudent.enrol).trim() && r.department
    );

    phaseMessage.classList.remove('hidden');
    phaseMessageText.textContent = `Phase 1: ${remaining} of ${SLOTS_PER_DEPARTMENT} slots remaining in ${dept}.`;

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
                <div class="slot-badge slot-full">Full (6/6)</div>
                <p class="text-xs text-red-500 mt-2">Your department is full. Try Phase 2 at 7:30 AM.</p>
            </div>
        `;
        departmentSlotInfo.innerHTML = '<i class="fas fa-exclamation-triangle mr-1 text-red-500"></i> Department full. Phase 2 opens at 7:30 AM!';
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
                <p class="text-xs text-emerald-600 mt-2">Click to register</p>
            </div>
        `;
        departmentSlotInfo.innerHTML = `<i class="fas fa-info-circle mr-1"></i> ${remaining} slots remaining for ${dept}`;
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
    phaseMessageText.textContent = `Phase 2: Registration is open. First submissions only will be accepted (limited slots).`;

    let cardHtml = '';

    if (isAlreadyRegistered) {
        cardHtml = `
            <div class="global-slot-card disabled">
                <span class="phase-indicator phase-2">Phase 2</span>
                <h3 class="font-semibold text-gray-800 mb-2">Already Registered</h3>
                <p class="text-sm text-gray-500">You have already secured a slot.</p>
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
                <h3 class="font-semibold text-gray-800 mb-2">Register Now</h3>
                <p class="text-sm text-gray-600">First submissions only</p>
                <p class="text-xs text-emerald-600 mt-2 font-semibold">Click to register - limited slots available!</p>
            </div>
        `;
        departmentSlotInfo.innerHTML = `<i class="fas fa-info-circle mr-1 text-blue-600"></i> Phase 2: First ${PHASE2_TOTAL_SLOTS} submissions will be accepted. Submit quickly!`;
        window._selectedDepartment = currentStudent.department;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    }

    departmentContainer.innerHTML = cardHtml;
    
    // Phase 2 stats - hidden, only show condition text
    phase2Stats.classList.add('hidden');
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
            showAlert(`Your department is full (6/6). Please wait for Phase 2 at 7:30 AM.`);
            return;
        }
    }

    // Phase 2: No preview check - only server-side validation for 100 slots
    if (currentPhase === 'phase2') {
        // We don't check anything here - let server decide if slots available
        // This prevents showing remaining count to users
    }

    window._selectedDepartment = department;
    showAlert(`✅ Ready to register for ${department} (${currentPhase === 'phase2' ? 'Phase 2' : 'Phase 1'})`, false);
};

// ============================================
// UPDATE UI FOR PHASE
// ============================================
function updateUIForPhase() {
    if (currentPhase === 'closed') {
        enrolInput.placeholder = "Registration closed - enter number to check status";
    } else {
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
        showAlert("🔒 Registration is closed. Opens Thursday 6:30 AM - 8:45 AM IST.");
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
            showAlert(`❌ Your department (${dept}) has reached its 6-slot limit. Please wait for Phase 2.`);
            renderPhase1Card();
            return;
        }
    }

    // ============================================
    // PHASE 2: Only server validates 100 slot limit
    // No client-side count check to hide limit from users
    // ============================================
    if (currentPhase === 'phase2') {
        // We don't check anything locally
        // Server will reject if 100 slots are filled
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

            const phaseLabel = currentPhase === 'phase2' ? 'Phase 2' : 'Phase 1';
            showAlert(`✅ Success! Registered for ${dept} via ${phaseLabel}.`, false);

            statusContainer.classList.remove("hidden");
            statusDisplay.innerHTML = `<span class="status-badge status-submitted"><i class="fas fa-check-circle mr-1"></i> Registered for ${dept} (${phaseLabel})</span>`;
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

console.log('%c🌟 PG Quota Portal - Phase 1: 6/dept | Phase 2: First 100 submissions 🌟', 'color: #059669; font-size: 16px; font-weight: bold;');
