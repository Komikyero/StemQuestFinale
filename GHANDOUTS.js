document.querySelectorAll(".QuizButton").forEach(btn => {
			btn.addEventListener("click", () => {
				const grade = btn.dataset.grade;           // e.g., "11"
				const index = Number(btn.dataset.index);   // array index
				const uid = localStorage.getItem("currentUID") || "guest";

                console.log(`[QuizButton Clicked] grade: ${grade}, index: ${index}, uid: ${uid}`);

				// Save grade + quiz index to localStorage
				localStorage.setItem("currentGrade", grade);
				localStorage.setItem(`currentQuizIndex_${grade}`, index);

				// Optional: store if this is a replay
				const completedIndex = Number(localStorage.getItem(`completedIndex_${uid}_grade${grade}`) || 0);
				localStorage.setItem("isReplay", index < completedIndex ? "1" : "0");

				// Optional: store EXP if using
				localStorage.setItem("currentQuizExp", btn.dataset.exp || 10);

				// Navigate to quiz page
				if (btn.dataset.file) window.location.href = btn.dataset.file;
			});
		});
