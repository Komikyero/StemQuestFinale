// =================== Firestore + LocalStorage User Profile Handler ===================

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-storage.js";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// ---------------- Profile Page DOM Elements ----------------
const bgDiv = document.querySelector('.MiniUserBG');
const bgInput = document.getElementById('bgInput');
const UIbgDiv = document.querySelector('.MiniUIcircle');
const UIbgInput = document.getElementById('UIbgInput');
const mainBG = document.querySelector('.userbackground');
const mainIcon = document.querySelector('.UIcircle');
const Name = document.querySelector('.MiniGS2');
const NameInput = document.getElementById('NameInput');
const Bio = document.querySelector('.MiniGS3');
const MainBio = document.querySelector('.akosidogie');
const MainName = document.querySelector('.username');

console.log("Profile DOM elements:", { bgDiv, UIbgDiv, Name, Bio });

// ---------------------- Auth Listener ----------------------
onAuthStateChanged(auth, async (user) => {
    console.log("Auth state changed:", user);
    if (!user) return;

    const uid = user.uid;
    localStorage.setItem('currentUID', uid);
    const userDocRef = doc(db, 'users', uid);

    // ---------- Load from localStorage first for instant UI ----------
    const localBG = localStorage.getItem(`userBG_${uid}`);
    const localIcon = localStorage.getItem(`UIuserBG_${uid}`);
    const localName = localStorage.getItem(`userName_${uid}`);
    const localBio = localStorage.getItem(`userBio_${uid}`);

    if (localBG && bgDiv) bgDiv.style.backgroundImage = `url(${localBG})`;
    if (localBG && mainBG) mainBG.style.backgroundImage = `url(${localBG})`;

    if (localIcon && UIbgDiv) UIbgDiv.style.backgroundImage = `url(${localIcon})`;
    if (localIcon && mainIcon) mainIcon.style.backgroundImage = `url(${localIcon})`;

    if (localName && Name) Name.textContent = localName;
    if (localName && MainName) MainName.textContent = localName;

    if (localBio && Bio) Bio.textContent = localBio;
    if (localBio && MainBio) MainBio.textContent = localBio;

    // ---------- Fetch Firestore and overwrite if exists ----------
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Firestore data:", data);

        // Background
        if (data.userBG && bgDiv) bgDiv.style.backgroundImage = `url(${data.userBG})`;
        if (data.userBG && mainBG) mainBG.style.backgroundImage = `url(${data.userBG})`;
        if (data.userBG) localStorage.setItem(`userBG_${uid}`, data.userBG);

        // Icon
        if (data.UIuserBG && UIbgDiv) UIbgDiv.style.backgroundImage = `url(${data.UIuserBG})`;
        if (data.UIuserBG && mainIcon) mainIcon.style.backgroundImage = `url(${data.UIuserBG})`;
        if (data.UIuserBG) localStorage.setItem(`UIuserBG_${uid}`, data.UIuserBG);

        // Name
        if (data.userName && Name) Name.textContent = data.userName;
        if (data.userName && MainName) MainName.textContent = data.userName;
        if (data.userName) localStorage.setItem(`userName_${uid}`, data.userName);

        // Bio
        if (data.userBio && Bio) Bio.textContent = data.userBio;
        if (data.userBio && MainBio) MainBio.textContent = data.userBio;
        if (data.userBio) localStorage.setItem(`userBio_${uid}`, data.userBio);
    }

    // ---------------- Event Listeners ----------------

    // Background upload
    if (bgDiv && bgInput) {
        bgDiv.addEventListener('click', () => bgInput.click());
        bgInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const compressedBlob = await compressImage(file, 100);
            const storageReference = storageRef(storage, `users/${uid}/background`);
            await uploadBytes(storageReference, compressedBlob);
            const url = await getDownloadURL(storageReference);

            bgDiv.style.backgroundImage = `url(${url})`;
            if (mainBG) mainBG.style.backgroundImage = `url(${url})`;
            localStorage.setItem(`userBG_${uid}`, url);
            await setDoc(userDocRef, { userBG: url }, { merge: true });
        });
    }

    // Icon upload
    if (UIbgDiv && UIbgInput) {
        UIbgDiv.addEventListener('click', () => UIbgInput.click());
        UIbgInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const compressedBlob = await compressImage(file, 100);
            const storageReference = storageRef(storage, `users/${uid}/icon`);
            await uploadBytes(storageReference, compressedBlob);
            const url = await getDownloadURL(storageReference);

            UIbgDiv.style.backgroundImage = `url(${url})`;
            if (mainIcon) mainIcon.style.backgroundImage = `url(${url})`;
            localStorage.setItem(`UIuserBG_${uid}`, url);
            await setDoc(userDocRef, { UIuserBG: url }, { merge: true });
        });
    }

    // Name update
    if (Name && NameInput) {
        Name.addEventListener('click', () => {
            NameInput.value = Name.textContent.trim();
            Name.style.display = 'none';
            NameInput.style.display = 'block';
            NameInput.focus();
        });

        NameInput.addEventListener('blur', async (e) => {
            const newName = e.target.value.trim();
            if (newName) {
                Name.textContent = newName;
                if (MainName) MainName.textContent = newName;
                localStorage.setItem(`userName_${uid}`, newName);
                await setDoc(userDocRef, { userName: newName }, { merge: true });
            }
            NameInput.style.display = 'none';
            Name.style.display = 'block';
        });

        NameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                NameInput.blur();
            }
        });
    }

    // Bio update
    if (Bio) {
        Bio.addEventListener('click', () => {
            if (Bio.querySelector('textarea')) return;

            const originalText = Bio.textContent || '';
            const textarea = document.createElement('textarea');
            textarea.value = originalText.trim();
            textarea.style.cssText = `
                width: 95%;
                min-height: 60px;
                background: transparent;
                color: inherit;
                border: none;
                outline: none;
                font: inherit;
                resize: none;
                padding: 8px;
                box-sizing: border-box;
                display: block;
                margin: 8px auto;
                text-align: left;
                white-space: pre-wrap;
                overflow: hidden;
                line-height: 1.4em;
            `;
            Bio.textContent = '';
            Bio.appendChild(textarea);
            textarea.focus();

            const autoResize = () => {
                textarea.style.height = 'auto';
                textarea.style.height = (textarea.scrollHeight + 2) + 'px';
            };
            textarea.addEventListener('input', autoResize);
            autoResize();

            textarea.addEventListener('blur', async () => {
                const newBio = textarea.value.trim();
                Bio.textContent = newBio || ' ';
                if (MainBio) MainBio.textContent = newBio;
                localStorage.setItem(`userBio_${uid}`, newBio);
                await setDoc(userDocRef, { userBio: newBio }, { merge: true });
            });
        });
    }
}); // end onAuthStateChanged

// -------------------- Compress Image Helper --------------------
async function compressImage(file, maxSizeKB = 100, maxWidth = 800, maxHeight = 800) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            let { width, height } = img;
            const aspectRatio = width / height;
            if (width > maxWidth) { width = maxWidth; height = width / aspectRatio; }
            if (height > maxHeight) { height = maxHeight; width = height * aspectRatio; }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            let quality = 0.9;

            function attemptCompress() {
                canvas.toBlob((blob) => {
                    if (blob.size / 1024 <= maxSizeKB || quality <= 0.1) {
                        resolve(blob);
                    } else {
                        quality -= 0.05;
                        attemptCompress();
                    }
                }, 'image/jpeg', quality);
            }

            attemptCompress();
        };
        img.onerror = (err) => reject(err);
        img.src = URL.createObjectURL(file);
    });
}


// Keep your home button redirect
const homebtn = document.querySelector('.stemquest');
if (homebtn) {
    homebtn.addEventListener('click', () => {
        console.log("Home button clicked!");
        window.location.href = 'UserCompleteTab.html';
    });
}
