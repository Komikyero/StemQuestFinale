// =================== Main Page User Display Handler ===================

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-storage.js";
import { addRewards } from './REWARDS.js';

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// ---------------- DOM Elements ----------------
const MainPageName = document.querySelector('.greenUserName');
const MainPageIcon = document.querySelector('.WhiteSquare');
const MaisotIcon = document.querySelector('.User-Icon');
const overlay = document.getElementById("dimOverlay");

function showOverlay(message, callback = null) {
    const overlay = document.getElementById("StarOverlay");
    const msg = document.getElementById("StarMessage");


    msg.textContent = message;
    overlay.classList.remove("hidden");
    const btn = document.getElementById("StarButton");
    btn.onclick = () => {
        overlay.classList.add("hidden");
        if (callback) callback();
    };
}

// ---------------- Helpers ----------------
function safeLocalSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn("localStorage full, skipping:", key, e);
    }
}

// ---------------- Auth Listener ----------------
onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    const uid = user.uid;
    safeLocalSet('currentUID', uid);

    // ---------------- User Display ----------------
    // Try localStorage first
    const savedName = localStorage.getItem(`userName_${uid}`);
    const savedIcon = localStorage.getItem(`UIuserBG_${uid}`);
    /*
    if (MainPageName && savedName) MainPageName.textContent = savedName;
    if (MainPageIcon && savedIcon) {
        MainPageIcon.style.backgroundImage = `url(${savedIcon})`;
        MainPageIcon.style.backgroundSize = 'cover';
        MainPageIcon.style.backgroundPosition = 'center';
    }
    if (MaisotIcon && savedIcon) {
        MaisotIcon.style.backgroundImage = `url(${savedIcon})`;
        MaisotIcon.style.backgroundSize = 'cover';
        MaisotIcon.style.backgroundPosition = 'center';
    }
    */
    // Fetch from Firestore for latest data
    try {
        const userDocRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            // Update username
            if (data.userName) {
                if (MainPageName) MainPageName.textContent = data.userName;
                safeLocalSet(`userName_${uid}`, data.userName);
            }

            // Update icon
            if (data.UIuserBG) {
                if (MainPageIcon) {
                    MainPageIcon.style.backgroundImage = `url(${data.UIuserBG})`;
                    MainPageIcon.style.backgroundSize = 'cover';
                    MainPageIcon.style.backgroundPosition = 'center';
                }
                if (MaisotIcon) {
                    MaisotIcon.style.backgroundImage = `url(${data.UIuserBG})`;
                    MaisotIcon.style.backgroundSize = 'cover';
                    MaisotIcon.style.backgroundPosition = 'center';
                }
                safeLocalSet(`UIuserBG_${uid}`, data.UIuserBG);
            }

            // Show handouts after user data is fetched
            const userGrade = (data.grade || "").replace("STEM ", "");
            showGradeContent(uid, userGrade);
            console.log("Firestore grade value:", data.grade);

            // Load rewards
            // Load rewards immediately
            loadRewards(uid);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
});

function updateStars(uid, grade) {
    const completedIndex = Number(localStorage.getItem(`completedIndex_${uid}_grade${grade}`) || 0);
    console.log(`updateStars called for UID: ${uid}, grade: ${grade}, completedIndex: ${completedIndex}`);

    // Get only the star containers for this grade
    const containers = document.querySelectorAll(`.StarContainer[data-grade="${grade}"]`);

    let globalStarIndex = 0; // counts stars across containers
    let allStarsFilled = true;

    containers.forEach((container, containerIndex) => {
        const stars = container.querySelectorAll(".Star");
        console.log(`Container ${containerIndex} has ${stars.length} stars`);

        stars.forEach((star, starIndex) => {
            const actualQuizIndex = Number(star.dataset.quizIndex);
            container.classList.add('active');

            if (completedIndex >= actualQuizIndex) {
                star.classList.add("filled");
                console.log(`Star ${starIndex} in container ${containerIndex} filled (actualQuizIndex: ${actualQuizIndex})`);
            } else {
                star.classList.remove("filled");
                allStarsFilled = false; // mark as incomplete
                console.log(`Star ${starIndex} in container ${containerIndex} NOT filled (actualQuizIndex: ${actualQuizIndex})`);
            }

            globalStarIndex++;
        });
    });

    console.log("All stars filled?", allStarsFilled);

    // Show overlay if all stars are filled
    if (allStarsFilled) {
        console.log("Showing overlay: all stars completed!");
        showOverlay("Thine journey hast ended, but there is still much to learn - Kai Ballon");
    }
}




// ---------------- Show Handouts ----------------
async function showGradeContent(userId, grade) {
    if (!userId) return;
    if (!grade) {
        console.warn("User has no grade — hiding all grade content.");
    }


    // Normalize grade: "STEM 12" -> "12"
    const normalizedGrade = (grade || "").replace("STEM ", "");

    console.log("showGradeContent called:", userId, grade, "->", normalizedGrade);

    const handoutTitles = document.querySelectorAll(".title");
    const Stars = document.querySelectorAll(".StarContainer");
    const handoutBodies = document.querySelectorAll(".HandoutContent");
    const containers = document.querySelectorAll(".Container");

    const learnContents = document.querySelectorAll('.LearnDropContent');
    learnContents.forEach(drop => {
        const dropGrade = drop.dataset.grade?.trim();
        if (dropGrade === normalizedGrade) {
            drop.style.display = 'block';    // show this grade
        } else {
            drop.style.display = 'none';     // hide other grades
        }
    });

    containers.forEach((item) => {
        const itemGrade = (item.dataset.grade || "").replace("STEM ", "").trim();

        if (itemGrade === normalizedGrade) {
            item.style.display = "block";
            setTimeout(() => item.classList.add("active"), 50);

            // Initialize buttons for this grade only
            const buttons = item.querySelectorAll(".HandButton");
            let completedIndex = Number(localStorage.getItem(`completedIndex_${userId}_grade${itemGrade}`) || 0);

            buttons.forEach((btn, index) => {
                btn.classList.remove("StartButton", "Completed", "ClosedButton");

                if (index < completedIndex) {
                    btn.classList.add("Completed");
                    btn.textContent = btn.textContent + " (Replay)";
                } else if (index === completedIndex) btn.classList.add("StartButton");
                else btn.classList.add("ClosedButton");

                btn.onclick = () => {
                    if (!btn.classList.contains("StartButton") && !btn.classList.contains("Completed")) return;

                    localStorage.setItem(`currentQuizIndex_${itemGrade}`, index);
                    localStorage.setItem("currentGrade", itemGrade);
                    localStorage.setItem("currentQuizExp", btn.dataset.exp || 10);
                    localStorage.setItem("isReplay", index < completedIndex ? "1" : "0");

                    const targetFile = btn.dataset.file;
                    if (targetFile) window.location.href = targetFile;
                };
            });

        } else {
            item.style.display = "none";
            item.classList.remove("active");
        }
    });

    handoutBodies.forEach((item) => {
        const itemGrade = (item.dataset.grade || "").replace("STEM ", "").trim();

        if (itemGrade === normalizedGrade) {
            item.style.display = "block";
            setTimeout(() => item.classList.add("active"), 50);
        } else {
            item.style.display = "none";
            item.classList.remove("active");
        }
    });

    Stars.forEach((item) => {
        const itemGrade = (item.dataset.grade || "").replace("STEM ", "").trim();

        if (itemGrade === normalizedGrade) {
            item.style.display = "block";
            setTimeout(() => item.classList.add("active"), 50);
        } else {
            item.style.display = "none";
            item.classList.remove("active");
        }
    });

    handoutTitles.forEach((title) => {
        const titleGrade = (title.dataset.grade || "").replace("STEM ", "").trim();
        if (titleGrade === normalizedGrade) {
            title.style.display = "block";
            setTimeout(() => title.classList.add("active"), 50);
        } else {
            title.style.display = "none";
            title.classList.remove("active");
        }
    });


    // ----------------- Show handout bodies -----------------
    handoutBodies.forEach((item) => {
        const itemGrade = item.dataset.grade;
        if (itemGrade === normalizedGrade) {
            item.style.display = "block";
            setTimeout(() => item.classList.add("active"), 50);

            // Initialize buttons for this grade only
            const buttons = item.querySelectorAll(".HandButton");
            let completedIndex = Number(localStorage.getItem(`completedIndex_${userId}_grade${itemGrade}`) || 0);

            buttons.forEach((btn, index) => {
                btn.classList.remove("StartButton", "Completed", "ClosedButton");

                if (index < completedIndex) {
                    btn.classList.add("Completed");
                    btn.textContent = btn.textContent + " (Replay)";
                }

                else if (index === completedIndex) btn.classList.add("StartButton");
                else btn.classList.add("ClosedButton");

                btn.onclick = () => {
                    // Allow clicking StartButton or Completed (for replay)
                    if (!btn.classList.contains("StartButton") && !btn.classList.contains("Completed")) return;

                    // Save current quiz info
                    localStorage.setItem(`currentQuizIndex_${itemGrade}`, index);
                    localStorage.setItem("currentGrade", itemGrade);
                    localStorage.setItem("currentQuizExp", btn.dataset.exp || 10);

                    // Mark if this is a replay
                    localStorage.setItem("isReplay", index < completedIndex ? "1" : "0");

                    const targetFile = btn.dataset.file;
                    if (targetFile) window.location.href = targetFile;
                    // Go to quiz
                };

            });

        } else {
            item.style.display = "none";
            item.classList.remove("active");
        }
    });

    updateStars(userId, normalizedGrade);


    // Remove overlay if present
    const overlay = document.getElementById("dimOverlay");
    if (overlay) overlay.classList.remove("active");
}

function loadHandoutForGrade(grade) {
    const handoutContainer = document.querySelector(".HandoutContent");
    handoutContainer.dataset.grade = grade; // Set user grade

    let questionText, options;

    if (grade === "11") {
        questionText = "Question for STEM 11";
        options = ["Option 1", "Option 2", "Option 3", "Option 4"];
    } else if (grade === "12") {
        questionText = "Question for STEM 12";
        options = ["Option 1", "Option 2", "Option 3", "Option 4"];
    }

    // Update question
    handoutContainer.querySelector("#question").textContent = questionText;

    // Update options
    const labels = handoutContainer.querySelectorAll("label");
    labels.forEach((label, i) => label.textContent = options[i]);
}



// ---------------- Load Rewards ----------------
async function loadRewards(uid) {
    const areaEl = document.getElementById("NumAreas");
    const expEl = document.getElementById("NumEXP");
    if (!areaEl || !expEl) return;

    // LocalStorage first
    const savedAreas = localStorage.getItem(`NumAreas_${uid}`) || 0;
    const savedExp = localStorage.getItem(`NumEXP_${uid}`) || 0;
    areaEl.textContent = savedAreas;
    expEl.textContent = savedExp;

    // Fetch from Firestore
    try {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const data = docSnap.data();

            // Update username/icon
            if (data.userName) {
                if (MainPageName) MainPageName.textContent = data.userName;
                safeLocalSet(`userName_${uid}`, data.userName);
            }
            if (data.UIuserBG) {
                if (MainPageIcon) MainPageIcon.style.backgroundImage = `url(${data.UIuserBG})`;
                if (MaisotIcon) MaisotIcon.style.backgroundImage = `url(${data.UIuserBG})`;
                safeLocalSet(`UIuserBG_${uid}`, data.UIuserBG);
            }

            // Load rewards
            loadRewards(uid);
        }

    } catch (error) {
        console.error("Error loading rewards:", error);
    }
}

// ---------------- STEMQUEST Buttons ----------------
window.addEventListener("DOMContentLoaded", () => {
    const uid = localStorage.getItem("currentUID") || "guest";

    // ------------------ Grade 11 ------------------
    const grade11Container = document.querySelector(`.HandoutContent[data-grade="11"]`);
    if (grade11Container) {
        const buttons11 = grade11Container.querySelectorAll(".HandButton");
        let completedIndex11 = Number(localStorage.getItem(`completedIndex_${uid}_grade11`) || 0);

        buttons11.forEach((btn, index) => {
            btn.classList.remove("StartButton", "Completed", "ClosedButton");

            if (index < completedIndex11) btn.classList.add("Completed"); // replayable
            else if (index === completedIndex11) btn.classList.add("StartButton");
            else btn.classList.add("ClosedButton");

            btn.onclick = () => {
                // Allow replay for completed quizzes
                if (!btn.classList.contains("StartButton") && !btn.classList.contains("Completed")) return;

                const grade = grade11Container.dataset.grade;

                localStorage.setItem(`currentQuizIndex_${grade}`, index);
                localStorage.setItem("currentGrade", grade);
                localStorage.setItem("currentQuizExp", btn.dataset.exp || 10);

                // Mark if this is a replay
                localStorage.setItem("isReplay", index < completedIndex11 ? "1" : "0");
            };
        });
    }

    // ------------------ Grade 12 ------------------
    const grade12Container = document.querySelector(`.HandoutContent[data-grade="12"]`);
    if (grade12Container) {
        const buttons12 = grade12Container.querySelectorAll(".HandButton");
        let completedIndex12 = Number(localStorage.getItem(`completedIndex_${uid}_grade12`) || 0);

        buttons12.forEach((btn, index) => {
            btn.classList.remove("StartButton", "Completed", "ClosedButton");

            if (index < completedIndex12) btn.classList.add("Completed"); // replayable
            else if (index === completedIndex12) btn.classList.add("StartButton");
            else btn.classList.add("ClosedButton");

            btn.onclick = () => {
                // Allow replay for completed quizzes
                if (!btn.classList.contains("StartButton") && !btn.classList.contains("Completed")) return;

                const grade = grade12Container.dataset.grade;

                localStorage.setItem(`currentQuizIndex_${grade}`, index);
                localStorage.setItem("currentGrade", grade);
                localStorage.setItem("currentQuizExp", btn.dataset.exp || 10);

                // Mark if this is a replay
                localStorage.setItem("isReplay", index < completedIndex12 ? "1" : "0");
            };
        });
    }

    // ------------------ Home button ------------------
    const homebtn = document.querySelector('.stemquest');
    if (homebtn) homebtn.addEventListener('click', () => {
        window.location.href = "UserCompleteTab.html";
    });
});

// ---------------- Character Display ----------------
const CollectionIMG = document.querySelector(".CollectionIMG");
const savedChar = localStorage.getItem("selectedCharacter");

function applyUserIcon(url) {
    if (!url) return;

    if (MainPageIcon) {
        MainPageIcon.style.backgroundImage = `url(${url})`;
        MainPageIcon.style.backgroundSize = "cover";
        MainPageIcon.style.backgroundPosition = "center";
    }

    if (MaisotIcon) {
        MaisotIcon.style.backgroundImage = `url(${url})`;
        MaisotIcon.style.backgroundSize = "cover";
        MaisotIcon.style.backgroundPosition = "center";
    }
}


if (savedChar) {
    applyUserIcon(savedChar);
}


onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists() && docSnap.data().selectedCharacter) {
        const charURL = docSnap.data().selectedCharacter;

        applyUserIcon(charURL);
        safeLocalSet("selectedCharacter", charURL);
    }
});

//username edit
// ----------- Username Editor for .greenUserName -----------

const greenName = document.querySelector('.greenUserName');
const greenNameInput = document.getElementById('GreenNameInput');

if (greenName && greenNameInput) {

    // When clicking name → turn into text box
    greenName.addEventListener('click', () => {
        greenNameInput.value = greenName.textContent.trim();
        greenName.style.display = 'none';
        greenNameInput.style.display = 'block';
        greenNameInput.focus();
    });

    // When input loses focus → save + switch back
    greenNameInput.addEventListener('blur', () => {
        const newName = greenNameInput.value.trim();
        greenName.textContent = newName || "username";
        greenNameInput.style.display = 'none';
        greenName.style.display = 'block';

        // OPTIONAL: save to localStorage
        const uid = localStorage.getItem('currentUID');
        if (uid) {
            localStorage.setItem(`greenUserName_${uid}`, newName);
        }
    });

    // Pressing Enter also saves
    greenNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            greenNameInput.blur();
        }
    });

    // Load saved username (optional)
    const uid = localStorage.getItem('currentUID');
    if (uid) {
        const saved = localStorage.getItem(`greenUserName_${uid}`);
        if (saved) greenName.textContent = saved;
    }
}

// ---------------- Show Selected Handout on Page Load ----------------
window.addEventListener("DOMContentLoaded", () => {
    const selectedGradeRaw = localStorage.getItem("currentGrade"); // e.g., "11" or "12"
    const selectedIndex = Number(localStorage.getItem(`currentQuizIndex_${selectedGradeRaw}`)) || 0;

    if (!selectedGradeRaw) return;

    const normalizedGrade = selectedGradeRaw.replace("STEM ", "").trim();

    // Hide all handouts first
    document.querySelectorAll('.HandoutContent').forEach(h => {
        h.style.display = 'none';
        h.classList.remove('active');
    });

    // Filter only handouts of the selected grade
    const gradeHandouts = Array.from(document.querySelectorAll(`.HandoutContent[data-grade="${normalizedGrade}"]`));

    if (gradeHandouts[selectedIndex]) {
        gradeHandouts[selectedIndex].style.display = 'block';
        gradeHandouts[selectedIndex].classList.add('active');
        gradeHandouts[selectedIndex].scrollIntoView({ behavior: 'smooth' });
    } else {
        console.warn("Handout not found for grade:", normalizedGrade, "index:", selectedIndex);
    }

    const gradeContainers = Array.from(document.querySelectorAll(`.Container[data-grade="${normalizedGrade}"]`));
    if (gradeContainers[selectedIndex]) {
        gradeContainers[selectedIndex].style.display = 'block';
        gradeContainers[selectedIndex].classList.add('active');
        gradeContainers[selectedIndex].scrollIntoView({ behavior: 'smooth' });
    }
});
