// =================== Main Page User Display Handler ===================
import { allQuizzes, allQuizzes2 } from './Handouts11.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-storage.js";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// ---------------- Helpers ----------------
function safeLocalSet(key, value) {
    try { localStorage.setItem(key, value); } 
    catch (e) { console.warn("localStorage full, skipping:", key, e); }
}

// ---------------- Show grade-specific quizzes ----------------
function showGrayItemsByGrade(uid, grade) {
    const normalizedGrade = grade.replace("STEM ", "").trim(); // "11" or "12"
    localStorage.setItem("currentGrade", normalizedGrade);
    console.log(`[showGrayItemsByGrade] Showing grade: "${normalizedGrade}" for UID: ${uid}`);

    const items = document.querySelectorAll(".grayitem");
    
    console.log(`[showGrayItemsByGrade] Found ${items.length} .grayitem(s)`);

    items.forEach(item => {
        const itemGrade = (item.getAttribute("data-grade") || "").trim();
        
        console.log(`→ Checking item with data-grade="${itemGrade}"`);

        if (itemGrade === normalizedGrade) {
            console.log(`✅ Showing item for grade ${itemGrade}`);
            item.style.display = "block";
            setTimeout(() => item.classList.add("active"), 25);
        } else {
            console.log(`❌ Hiding item for grade ${itemGrade}`);
            item.style.display = "none";
            item.classList.remove("active");
        }
    });

    // Remove overlay if exists
    const overlay = document.querySelector(".overlay");
    if (overlay) overlay.classList.remove("active");
}

// ---------------- Main DOMContentLoaded ----------------
window.addEventListener('DOMContentLoaded', () => {
    const MainPageName = document.querySelector('.greenUserName');
    const MainPageIcon = document.querySelector('.WhiteSquare');
    const MaisotIcon = document.querySelector('.User-Icon');

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            console.warn("[Auth] No user is logged in.");
            return;
        }

        const uid = user.uid;
        safeLocalSet('currentUID', uid);

        // Try localStorage first
        const savedName = localStorage.getItem(`userName_${uid}`);
        const savedIcon = localStorage.getItem(`UIuserBG_${uid}`);

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

        // Fetch latest data from Firestore
        try {
            const userDocRef = doc(db, 'users', uid);
            const docSnap = await getDoc(userDocRef);

            if (!docSnap.exists()) {
                console.warn("[Firestore] User document does not exist");
                return;
            }

            const data = docSnap.data();
            console.log("[Firestore] Retrieved user data:", data);

            // Update username
            if (data.userName) {
                if (MainPageName) MainPageName.textContent = data.userName;
                safeLocalSet(`userName_${uid}`, data.userName);
            }

            // Update icons
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

            // ✅ Set grade and inject it into .grayitem BEFORE calling showGradeContent
            if (data.grade) {
                const normalizedGrade = data.grade.replace("STEM ", "").trim();
                localStorage.setItem("currentGrade", normalizedGrade);
                console.log(`[Grade] Raw: "${data.grade}", Normalized: "${normalizedGrade}"`);

                // ✅ Inject normalized grade into all .grayitem(s)
                const grayItems = document.querySelectorAll('.grayitem');
                grayItems.forEach(item => {
                    item.setAttribute("data-grade", normalizedGrade);
                    console.log(`✅ Injected data-grade="${normalizedGrade}"`);
                });

                // ✅ NOW safely call showGradeContent
                setTimeout(() => {
                    showGrayItemsByGrade(uid, data.grade);
                }, 100);

            } else {
                console.warn("[Grade] Grade not found in Firestore.");
            }

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    });

    // ---------------- Quiz button handlers ----------------
    const quizButtons = document.querySelectorAll(".quiz-btn");

    quizButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const uid = localStorage.getItem('currentUID');
            if (!uid) {
                console.warn("No UID found in localStorage — cannot continue.");
                return;
            }

            const grade = btn.dataset.grade;
            const index = Number(btn.dataset.index);

            localStorage.setItem("currentGrade", grade);
            localStorage.setItem(`currentQuizIndex_${grade}`, index);
            localStorage.setItem("currentQuizExp", btn.dataset.exp || 10);

            const completedIndex = Number(localStorage.getItem(`completedIndex_${uid}_grade${grade}`) || 0);
            if (index >= completedIndex) {
                localStorage.setItem(`completedIndex_${uid}_grade${grade}`, index + 1);
            }

        });
    });

    // ---------------- Grayitem button stopPropagation ----------------
    document.querySelectorAll('.grayitem button').forEach(btn => {
        btn.addEventListener('click', (e) => e.stopPropagation());
    });
});