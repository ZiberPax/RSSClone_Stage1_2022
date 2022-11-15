import { birdsData } from "./birds.js";

let scorePerLevel = 0;
let score = 0;
let currentQuestion = 1;
let canMoveOnNextLevel = false;
let guessBirdNumber = 0;
let end = false;

// Элементы
const activeLevel = document.querySelector(`.levels-section_pagination :nth-child(${currentQuestion})`);
const birdsName = document.querySelector(`.bird-details_ul__item_h4`);
const speciesBird = document.querySelector(`.bird-details_ul__item span`);
const birdDescription = document.querySelector(`.bird-details_description`);
const birdImage = document.querySelector(`.bird-details_image`);
const audioSourceDescription = document.querySelector(`.bird-details_ul__item__audio-player source`);
const audioPlayer = document.querySelector(`.bird-details_ul__item__audio-player`);
const birdDetailsCard = document.querySelector(".bird-details_card");
const inviteToListen = document.querySelector(".bird-details_invate-to-listen");
const hideNameBirds = document.querySelector(".random-birds-section__ul__item__title");

const hideImgBirds = document.querySelector(".random-birds-section__img");
const nextLevelButton = document.querySelector(".baze-block__button");

const hideBirdsBlockAudio = document.querySelector(".random-birds-section__audio-player");
const audioSourceForHiddenBird = document.querySelector(".random-birds-section__audio-player source");
const hideArr = [
  "******",
  "./assets/img/whatABird.jpg",
  "./assets/audio/05. Окраины.mp3",
];
const displayScore = document.querySelector(".score__a")

const winSound = new Audio();
winSound.src ="https://github.com/ZiberPax/imgForMomentum/blob/main/birds/assets/audio/win.mp3?raw=true";
winSound.load();
const failSound = new Audio();
failSound.src ="https://github.com/ZiberPax/imgForMomentum/blob/main/birds/assets/audio/error.mp3?raw=true";
failSound.load();

//Запуск логики
changeActiveLevel();
startLevel();

//Создаем основные функции

function hideBird() {
  hideNameBirds.textContent = hideArr[0];
  hideImgBirds.src = hideArr[1];
  if (!birdDetailsCard.classList.contains("hide")) {
    birdDetailsCard.classList.toggle("hide");
    birdDescription.classList.toggle("hide");
    inviteToListen.classList.toggle("hide");
  }
}

function changeActiveLevel() {
  const activeLevel = document.querySelector(
    `.levels-section_pagination :nth-child(${currentQuestion})`
  );
  activeLevel.classList.toggle("active");
  if (currentQuestion > 1) {
    document
      .querySelector(
        `.levels-section_pagination :nth-child(${currentQuestion - 1})`
      )
      .classList.toggle("active");
  }
}

function fillBirdsUl() {
  for (let i = 0; i < birdsData[currentQuestion - 1].length; i++) {
    document.querySelector(
      `.baze-block_right-column_ul :nth-child(${i + 1})`
    ).textContent = birdsData[currentQuestion - 1][i].name;
  }
}

function startLevel() {
  scorePerLevel = 5;
  end = false;
  guessBirdNumber = getRandomInt(0, 5);
  // console.log(guessBirdNumber);
  // console.log(birdsData[currentQuestion - 1][guessBirdNumber].name);
  // console.log(birdsData[currentQuestion - 1][5].name);
  birdsName.textContent = birdsData[currentQuestion - 1][guessBirdNumber].name;
  speciesBird.textContent =
    birdsData[currentQuestion - 1][guessBirdNumber].species;
  birdDescription.textContent =
    birdsData[currentQuestion - 1][guessBirdNumber].description;
  birdImage.src = birdsData[currentQuestion - 1][guessBirdNumber].image;
  audioSourceDescription.src =
    birdsData[currentQuestion - 1][guessBirdNumber].audio;
  audioSourceForHiddenBird.src =
    birdsData[currentQuestion - 1][guessBirdNumber].audio;
  hideBirdsBlockAudio.load();
  audioPlayer.load();
  for (let i = 0; i < 6; i++) {
    if (
      document
        .querySelector(`.baze-block_right-column_ul :nth-child(${i + 1})`)
        .classList.contains("fault")
    ) {
      document
        .querySelector(`.baze-block_right-column_ul :nth-child(${i + 1})`)
        .classList.toggle("fault");
    }
    if (
      document
        .querySelector(`.baze-block_right-column_ul :nth-child(${i + 1})`)
        .classList.contains("correct")
    ) {
      document
        .querySelector(`.baze-block_right-column_ul :nth-child(${i + 1})`)
        .classList.toggle("correct");
    }
  }
  fillBirdsUl();
  hideBird();
}

function showRightSectionBird(dataBirds) {
  birdsName.textContent = dataBirds.name;
  speciesBird.textContent = dataBirds.species;
  birdDescription.textContent = dataBirds.description;
  birdImage.src = dataBirds.image;
  audioSourceDescription.src = dataBirds.audio;
  audioPlayer.load();
}

function playAudio(name, type) {
  if (!name.paused) {
    name.pause();
    name.currentTime = 0;
    name.play();
  }
  console.log(name.paused);
  name.play();
  name.volume = 0.2;
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

let indicatorBird = document.querySelector(".baze-block_right-column_ul__item");
console.log(indicatorBird);

document
  .querySelector(".baze-block_right-column")
  .addEventListener("click", (event) => {
    showRightSectionBird(birdsData[currentQuestion - 1][+event.target.getAttribute("bird-number") - 1]);
    if (!end) {
      if (birdDescription.classList.contains("hide")) {
        birdDescription.classList.remove("hide");
        birdDetailsCard.classList.remove("hide");
      }
      if (!inviteToListen.classList.contains("hide")) {
        inviteToListen.classList.add("hide");
      }
      if (+event.target.getAttribute("bird-number") == guessBirdNumber + 1) {
        if (currentQuestion != 6) {
          score += scorePerLevel;
          displayScore.textContent = `Счёт: ${score}`;
          end = true;
          canMoveOnNextLevel = true;

          hideImgBirds.src = birdsData[currentQuestion - 1][guessBirdNumber].image;
          hideNameBirds.textContent = birdsData[currentQuestion - 1][guessBirdNumber].name;

          event.target.classList.toggle("correct");
          nextLevelButton.classList.toggle("active");
          playAudio(winSound, `win`);
        } else {
          end = true;
          hideImgBirds.src = birdsData[currentQuestion - 1][guessBirdNumber].image;
          hideNameBirds.textContent = birdsData[currentQuestion - 1][guessBirdNumber].name;
          event.target.classList.toggle("correct");
          playAudio(winSound, `win`);
        }
      } else {
        scorePerLevel--;
        playAudio(failSound, `error`);
        if (!event.target.classList.contains("fault")) {
          event.target.classList.toggle("fault");
        }
      }
    }
  });

// Кнопка перехода на некст уровень

nextLevelButton.addEventListener("click", function () {
  if (currentQuestion != 6) {
    if (canMoveOnNextLevel) {
      canMoveOnNextLevel = false;
      currentQuestion++;
      nextLevelButton.classList.toggle("active");
      changeActiveLevel();
      startLevel();
      fillBirdsUl();
      console.log(currentQuestion);
    }
  }
});
