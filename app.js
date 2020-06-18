const reset = document.querySelector(`.restart`);
const playerScore = document.querySelector(`#score`);
const gameTable = document.querySelector(`#cards`);
const nextCard = document.querySelector(`#next-card`);

let cardArr;
let score;

restart();

reset.addEventListener(`click`, restart);

gameTable.addEventListener(`click`, gameClick);

function gameClick(event) {
  if (event.target.className === `card` && !event.target.classList.contains(`matched`)) {
    score++;

    checkForMatch(event);

    setTimeout(() => {
      event.target.classList.remove(`show`);
      gameTable.addEventListener(`click`, gameClick);
    }, 500);

    gameTable.removeEventListener(`click`, gameClick);
    playerScore.textContent = score;
  }
}

// Every time a `next card` is matched, that item will be filtered out of the array.
// Then a new item is picked from the filtered array randomly for the `next card`.
function checkForMatch(e) {
  if (e.target.children[0].className === nextCard.children[0].className) {
    e.target.classList.add(`matched`);
    
    win();

    cardArr = cardArr.filter(element => (element !== e.target.children[0].className));
    nextCard.innerHTML = `<i class="${cardArr[getRandomInt(0, cardArr.length - 1)]}"></i>`;
  } else {
    e.target.classList.add(`show`);
  }
}

// Pops winning alert and restarts the game.
// setTimeout is used for get rid of the alert bug. (Same one in Assignment 3)
function win() {
  setTimeout(() => {
    if (cardArr.length === 0) {
      alert(`You win and your score is ${score}!`);
      restart();
    }
  }, 10);
}

// Removes all `matched` and `show` from class names. 
// Creates a shuffled array that contains class names which represent different icons.
// Inserts all icons in the game board. 
// Generates a random item in the array and set it to `next card`.
function restart() {
  const allCards = document.querySelectorAll(`.card .fas`);

  cardArr = [];

  for (let card of allCards) {
    card.parentElement.classList.remove(`matched`, `show`);
    cardArr.push(card.className);
  }

  cardArr = shuffle(cardArr);
  score = 0;
  playerScore.textContent = score;

  for (let x = 0; x < cardArr.length; x++) {
    allCards[x].className = cardArr[x];
  }
  nextCard.innerHTML = `<i class="${cardArr[getRandomInt(0, cardArr.length - 1)]}"></i>`;
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}