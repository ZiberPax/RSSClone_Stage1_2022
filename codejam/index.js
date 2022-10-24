let randomNum = 0;
let Day = 0;
let body = document.getElementById('body');

let watch = document.createElement('h2');
watch.className = 'watch'
document.body.append(watch);
watch.textContent = '00:00:00'
let miliseconds = 0;
let timer;

startWatch()
function startWatch () {
   clearInterval(timer);
   timer = setInterval(() => {
      miliseconds += 10;
      let dateTimer = new Date(miliseconds);
      watch.innerHTML = 
         ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
         ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
         ('0' + dateTimer.getUTCSeconds()).slice(-2);
   },10)
}

function resetWatch () {
   clearInterval(timer);
   miliseconds = 0;
   watch.innerHTML = `00:00:00`
   startWatch()
}

//счетчик ходов
let moves = 0
let movesContainer = document.createElement('div');
movesContainer.className = "movesContainer";
document.body.append(movesContainer);
movesContainer.textContent = `You did ${moves} moves`


let container = document.createElement('div');
container.className = "container";
document.body.append(container);



let winMessage = document.createElement('div');
winMessage.className = "winMessage";
document.body.append(winMessage);



let options = document.createElement('div');
options.className = 'options';
document.body.append(options);

let restartButton = document.createElement('button');
restartButton.className = 'restartbutton';
options.append(restartButton);
restartButton.textContent = 'RESTART';

let muteButton = document.createElement('button');
muteButton.className = 'muteButton';
options.append(muteButton);
muteButton.textContent = 'Sound off';




let puzzleContainer = document.querySelector('.container');
let sizeOfPuzzleElements = 150
let puzzle = []
let sizeOfPuzzle = 4

function getRandomNum(max) {
   let int = Math.floor(max * Math.random())
   if (int === 0) { int += 1 }
   return int
}

randomNum = getRandomNum(21)
Day = getDay()
function getDay() {
   Day = getRandomNum(5)
   if (Day === 1) {
      return 'night'
   } else if (Day === 2) {
      return 'morning'
   } else if (Day === 3) {
      return 'afternoon'
   } else if (Day === 4) {
      return 'evening'
   }
}

function setBg(bgNum) {
   const img = new Image();
   bgNum = randomNum.toString().padStart(2, '0');
   img.src = `https://github.com/ZiberPax/imgForMomentum/blob/main/${Day}/${bgNum}.webp?raw=true`;
   img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`
   }
}







/* запуск логики игры */
generateElementsForGame(puzzle)
const startPuzzle = []

generateElementsForGame(startPuzzle)
//console.log(startPuzzle);
randomizeElementsForGame()
renderGameField()
setBg()
userPressKey()


alert(`Привет. Реализовал ход только по нажатию на стрелочки, пожалуйста, воспользуйтесь этим способом`)



let pieceOfPuzzle = document.getElementsByClassName('puzzleItem')
// console.log(pieceOfPuzzle);
// userClick()

//считаем пары для формулы решабельности (не факт, что работает нормально)
let pairs = 0 
for (let i = 0; i < 16; i++) {
   if (puzzle[i]) {
      for (let j = 0; j < i; j++) {
         
         if (puzzle[j].value > puzzle[i].value) {
            //console.log(`пары для определения решаемости ${puzzle[j].value}:${puzzle[i].value} `)
            pairs++
         }
      }
   }
}

const emptyPuzzle = getEmpyPuzzle()
const isAbovePuzzleExist = getRow(emptyPuzzle.position)

//если решений нет, то страница перезагружается до тех пор, пока не найдет нужный расклад
console.log(pairs);
if ((isAbovePuzzleExist + pairs + 4) % 2 == 0) {
   console.log(`решений нет`)
   location.reload();
}

//получаем строку
function getRow(pos) {
   return Math.ceil(pos / sizeOfPuzzle)
}


//получаем колонку
function getCol(pos) {
   const col = pos % sizeOfPuzzle
   if (col === 0) {
      return sizeOfPuzzle
   }
   return col
}

//генерируем массив пазлов
function generateElementsForGame(myArray) {
   for (let i = 1; i <= sizeOfPuzzle * sizeOfPuzzle; i++) {
      myArray.push({
         value: i,
         position: i,
         x: (getCol(i) - 1) * sizeOfPuzzleElements,
         y: (getRow(i) - 1) * sizeOfPuzzleElements,   
         disabled: false
      })
   }
   //console.log(myArray)
}

// for (let i = 0; i < puzzle.length; i++) {
//    if (puzzle[i].value == puzzle[i].position) {
//       console.log(`${puzzle[i].value} на месте `)
//    }
// }



//функция отображения пазлов
function renderGameField() {
   let gameEndArray = []
   puzzleContainer.innerHTML = ''
   for (let puzzleItem of puzzle) {
      if (puzzleItem.disabled) { continue }
      puzzleContainer.innerHTML += `
      <div class='puzzleItem' style='left: ${puzzleItem.x}px; top:${puzzleItem.y}px;height:${sizeOfPuzzleElements}px;width:${sizeOfPuzzleElements}px;'>
         ${puzzleItem.value}
      </div>
      `
      if (puzzleItem.value == puzzleItem.position) {
         gameEndArray.push(puzzleItem)
         // console.log(`${puzzleItem.value} на месте `)
         // console.log(gameEndArray.length);
      }
   }

   //проверка на победу
   let tempPuzzleForBadEnd = puzzle.find((el) => el.position == (sizeOfPuzzle * sizeOfPuzzle -1))
   let tempSecondPuzzleForBadEnd = puzzle.find((el) => el.position == sizeOfPuzzle * sizeOfPuzzle)

   if ((gameEndArray.length == 15) || (gameEndArray.length == 13 && tempPuzzleForBadEnd.value == 14 && tempSecondPuzzleForBadEnd.disabled)) {
      winMessage.textContent = `Hooray! You solved the puzzle in ${watch.textContent} and ${moves} moves!`
      winMessage.style.visibility = 'visible';

   } else {
      winMessage.style.visibility = 'hidden'
   }


}

//мешаем пазлы
function randomizeElementsForGame() {
   let i = 0
   let randomNumbers = getRandomsNumber()
   for (let puzzleItem of puzzle) {
      puzzleItem.value = randomNumbers[i]
      i++
   }
   const puzzleWithLastValue = puzzle.find((item) => item.value === sizeOfPuzzle * sizeOfPuzzle)
   puzzleWithLastValue.disabled = true
}

function getRandomsNumber() {
   let numbers = []
   for (let i = 1; i <= sizeOfPuzzle * sizeOfPuzzle; i++) {
      numbers.push(i)
   }
   numbers = _.shuffle(numbers)
   return numbers
}

function userPressKey() {
   document.addEventListener('keydown', handleKeyDown)
}

// function userClick() {
//    pieceOfPuzzle.addEventListener('click', handleClick)
// }

// function handleClick(event) {
//    console.log('click')
//    canMoveBelow()
//    moveLeft()
   

//    // //switch (event.key) {
//    //    case 'ArrowLeft':
//    //       moveLeft()
//    //       break
//    //    case 'ArrowRight':
//    //       moveRight()
//    //       break
//    //    case 'ArrowUp':
//    //       moveUp()
//    //       break
//    //    case 'ArrowDown':
//    //       moveDown()
//    //       break
//    //}
//    renderPuzzle()
// }

function canMoveBelow(s) {
   const emptyPuzzle = getEmpyPuzzle()
   console.log(emptyPuzzle);
   const isBelowPuzzleExist = getRow(emptyPuzzle.position) === sizeOfPuzzle
   console.log(isBelowPuzzleExist);
   if (isBelowPuzzleExist) { return null }
}

function handleKeyDown(event) {
   switch (event.key) {
      case 'ArrowLeft':
         moveLeft()
         renderGameField()
         break
      case 'ArrowRight':
         moveRight()
         renderGameField()
         break
      case 'ArrowUp':
         moveUp()
         renderGameField()
         break
      case 'ArrowDown':
         moveDown()
         renderGameField()
         break
   }
   
}
function moveLeft() {
   const emptyPuzzle = getEmpyPuzzle()
   const rightPuzzle = getRightPuzzle()
   if (rightPuzzle) {
      swapPositions(emptyPuzzle, rightPuzzle, true)
      moves++
      playAudio()
      movesContainer.textContent = `You did ${moves} moves`       
   }

}

function moveRight() {
   const emptyPuzzle = getEmpyPuzzle()
   const leftPuzzle = getLeftPuzzle()
   if (leftPuzzle) {
      swapPositions(emptyPuzzle, leftPuzzle, true)
      moves++
      playAudio()
      movesContainer.textContent = `You did ${moves} moves`       
   }

}

function moveUp() {
   const emptyPuzzle = getEmpyPuzzle()
   const belowPuzzle = getBelowPuzzle()
   if (belowPuzzle) {
      swapPositions(emptyPuzzle, belowPuzzle, false)
      moves++
      playAudio()
      movesContainer.textContent = `You did ${moves} moves`       
   }

}

function moveDown() {
   const emptyPuzzle = getEmpyPuzzle();
   const abovePuzzle = getAbovePuzzle()
   if (abovePuzzle) {
       swapPositions(emptyPuzzle, abovePuzzle, false)
       moves++
       playAudio()
       movesContainer.textContent = `You did ${moves} moves`
   }
   

}

function swapPositions(firstPuzzle, secondPuzzle, isXExist = false) {
   let temp = firstPuzzle.position
   firstPuzzle.position = secondPuzzle.position
   secondPuzzle.position = temp

   if (isXExist) {
      temp = firstPuzzle.x
      
      firstPuzzle.x = secondPuzzle.x
      secondPuzzle.x = temp
   } else {
      temp = firstPuzzle.y
      firstPuzzle.y = secondPuzzle.y
      secondPuzzle.y = temp
   }

}

function getRightPuzzle() {
   //ищем пазл, который находится правее от пустого

   const emptyPuzzle = getEmpyPuzzle()
   const isRightPuzzleExist = getCol(emptyPuzzle.position) === sizeOfPuzzle
   if (isRightPuzzleExist) { return null }
   const puzzle = getPuzzleByPos(emptyPuzzle.position + 1)
   return puzzle
}

function getLeftPuzzle() {
   const emptyPuzzle = getEmpyPuzzle()
   const isLeftPuzzleExist = getCol(emptyPuzzle.position) === 1
   if (isLeftPuzzleExist) { return null }
   const puzzle = getPuzzleByPos(emptyPuzzle.position - 1)
   return puzzle
}

function getAbovePuzzle() {
   const emptyPuzzle = getEmpyPuzzle()
   const isAbovePuzzleExist = getRow(emptyPuzzle.position) === 1
   if (isAbovePuzzleExist) { return null }
   const puzzle = getPuzzleByPos(emptyPuzzle.position - sizeOfPuzzle)
   return puzzle
}

function getBelowPuzzle() {
   const emptyPuzzle = getEmpyPuzzle()
   const isBelowPuzzleExist = getRow(emptyPuzzle.position) === sizeOfPuzzle
   if (isBelowPuzzleExist) { return null }
   const puzzle = getPuzzleByPos(emptyPuzzle.position + sizeOfPuzzle)
   return puzzle
}

function getEmpyPuzzle() {
   return puzzle.find((item) => item.disabled)
}

function getPuzzleByPos(pos) {
   return puzzle.find((item) => item.position === pos)
}


const mediaQueryTablet = window.matchMedia('(max-width: 640px)')
const mediaQueryMobile = window.matchMedia('(max-width: 420px)')
if (mediaQueryTablet.matches) {
   sizeOfPuzzleElements = 100
   for (let i = 1; i <= sizeOfPuzzle * sizeOfPuzzle; i++) {
      puzzle[i - 1].x = (getCol(i) - 1) * sizeOfPuzzleElements
      puzzle[i - 1].y = (getRow(i) - 1) * sizeOfPuzzleElements
}
   renderGameField()
}

if (mediaQueryMobile.matches) {

   sizeOfPuzzleElements = 60
   for (let i = 1; i <= sizeOfPuzzle * sizeOfPuzzle; i++) {
         puzzle[i - 1].x = (getCol(i) - 1) * sizeOfPuzzleElements
         puzzle[i - 1].y = (getRow(i) - 1) * sizeOfPuzzleElements
         console.log(puzzle[i])
   }
   renderGameField()
}

restartButton.addEventListener('click', function () {
   puzzle = []
   generateElementsForGame(puzzle)
   randomizeElementsForGame()
   renderGameField()
   resetWatch()
})

const audio = new Audio()
let spellNum = 1



function playAudio(){
   spellNum = getRandomNum(8)
   audio.src = `./spell${spellNum}.mp3`;
   audio.play();
}

document.querySelector('.muteButton').onclick = function() {
   if (audio.muted === true) {
     document.querySelector('.muteButton').innerHTML = 'Sound off'
     audio.muted = false;
   } else {
     document.querySelector('.muteButton').innerHTML = 'Sound on'
     audio.muted = true;
   }
 }

