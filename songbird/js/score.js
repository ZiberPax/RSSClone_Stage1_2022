let score = localStorage.getItem("Очки")
score == 30 ? 
document.querySelector(".award-section_title-container_title").textContent = `Поздравляем! Ты победил в квизе, набрав ${score} баллов из 30 возможных!` :
document.querySelector(".award-section_title-container_title").textContent = `Поздравляем! Ты прошел квиз и набрал ${score} баллов из 30 возможных!`