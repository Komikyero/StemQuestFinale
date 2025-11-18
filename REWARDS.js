import { doc, updateDoc, getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const db = getFirestore();

export async function addRewards(expValue, uniqueKey) {
    const uid = localStorage.getItem("currentUID");
    if (!uid) return;

    const areaEl = document.getElementById("NumAreas");
    const expEl = document.getElementById("NumEXP");

    const clickedKey = `rewardClicked_${uid}_${uniqueKey}`;
    const hasClicked = localStorage.getItem(clickedKey);

    let currentAreas = Number(localStorage.getItem(`NumAreas_${uid}`) || areaEl?.textContent || 0);
    let currentExp = Number(localStorage.getItem(`NumEXP_${uid}`) || expEl?.textContent || 0);

    if (!hasClicked) {
        currentAreas += 1;
        currentExp += expValue;
        localStorage.setItem(clickedKey, "true");
    }

    // Update DOM
    if (areaEl) areaEl.textContent = currentAreas;
    if (expEl) expEl.textContent = currentExp;

    // Update localStorage
    localStorage.setItem(`NumAreas_${uid}`, currentAreas);
    localStorage.setItem(`NumEXP_${uid}`, currentExp);

    // Update Firestore
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { NumAreas: currentAreas, NumEXP: currentExp });
        console.log("Updated Firestore:", currentAreas, currentExp);
    } catch (err) {
        console.error("Error updating Firestore:", err);
    }
}
