const languages = {
  ["en"]: {
    button: 'EN',
    header: ['Main', "Quiz", "Result", "Gallery"],
    levels: ['Warm up', "Passerines", "Forest birds", "Songbirds", "Predator birds", "Sea birds"]
  },
  ["ru"]: {
    button: 'RU',
    header: ['Главная', "Квиз", "Результаты", "Галерея"],
    levels: ['Разминка', "Воробьиные", "Лесные птицы", "Певчие птицы", "Хищные птицы", "Морские птицы"]
  }
}

let userLanguage = ""


const button = document.querySelector(".footer_button_language");

const headerMain = document.querySelector(`.nav__ul :nth-child(${1}) a`);
const headerQuiz = document.querySelector(`.nav__ul :nth-child(${2}) a`);
const headerResult = document.querySelector(`.nav__ul :nth-child(${3}) a`);
const headerGallery = document.querySelector(`.nav__ul :nth-child(${4}) a`);

const birdLevel1 = document.querySelector(`.levels-section_pagination :nth-child(${1}) a`);
const birdLevel2 = document.querySelector(`.levels-section_pagination :nth-child(${2}) a`);
const birdLevel3 = document.querySelector(`.levels-section_pagination :nth-child(${3}) a`);
const birdLevel4 = document.querySelector(`.levels-section_pagination :nth-child(${4}) a`);
const birdLevel5 = document.querySelector(`.levels-section_pagination :nth-child(${5}) a`);
const birdLevel6 = document.querySelector(`.levels-section_pagination :nth-child(${6}) a`);

function changeLang (lang) {
  headerMain.textContent = languages[lang].header[0]; 
  headerQuiz.textContent = languages[lang].header[1]; 
  headerResult.textContent = languages[lang].header[2]; 
  headerGallery.textContent = languages[lang].header[3]; 
  button.textContent = languages[lang].button;

  birdLevel1.textContent = languages[lang].levels[0]; 
  birdLevel2.textContent = languages[lang].levels[1]; 
  birdLevel3.textContent = languages[lang].levels[2]; 
  birdLevel4.textContent = languages[lang].levels[3]; 
  birdLevel5.textContent = languages[lang].levels[4]; 
  birdLevel6.textContent = languages[lang].levels[5]; 
}
// if (localStorage.getItem('Lang')) {
//   userLanguage = localStorage.getItem('Lang')
// } 
// console.log(userLanguage);

button.addEventListener("click", () => {
  if (localStorage.getItem('Lang') == 'ru' || localStorage.getItem('Lang') == null) {
    localStorage['Lang'] = 'en';
    changeLang("en")
  } else {
    localStorage['Lang'] = 'ru';
    changeLang("ru")
  }
})