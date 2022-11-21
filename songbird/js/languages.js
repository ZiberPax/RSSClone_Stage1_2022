const languages = {
  ["en"]: {
    button: 'EN',
    title: 'Your Quize Is Waiting For You',
    description: 'Can you guess the bird just by hearing what sounds it makes? Challenge yourself and try to get the maximum score! Good luck!',
    header: ['Main', "Quiz", "Result", "Gallery"],
    startButton: 'Start quiz'
  },
  ["ru"]: {
    button: 'RU',
    title: 'Твой Квиз Ждет Тебя',
    description: 'Сможешь ли ты угадать птицу, только лишь услышив какие звуки она издает? Испытай себя и попробуй набрать максимальное количество очков! Удачи!',
    header: ['Главная', "Квиз", "Результаты", "Галерея"],
    startButton: 'начать квиз'
  }
}

let userLanguage = ""


const button = document.querySelector(".footer_button_language");


const title = document.querySelector(".introduce__text_title");
const description = document.querySelector(".introduce__text_describe");
const startButton = document.querySelector(".introduce__text_button_link");

const headerMain = document.querySelector(`.nav__ul :nth-child(${1}) a`);
const headerQuiz = document.querySelector(`.nav__ul :nth-child(${2}) a`);
const headerResult = document.querySelector(`.nav__ul :nth-child(${3}) a`);
const headerGallery = document.querySelector(`.nav__ul :nth-child(${4}) a`);

console.log(birdLevel6);

console.log(headerMain);

function changeLang (lang) {
  title.textContent = languages[lang].title;
  description.textContent = languages[lang].description;

  headerMain.textContent = languages[lang].header[0]; 
  headerQuiz.textContent = languages[lang].header[1]; 
  headerResult.textContent = languages[lang].header[2]; 
  headerGallery.textContent = languages[lang].header[3]; 


  startButton.textContent = languages[lang].startButton;
  button.textContent = languages[lang].button;
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