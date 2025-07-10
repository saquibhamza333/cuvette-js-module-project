const choices = ["rock", "paper", "scissor"];

const choiceButtons = document.querySelectorAll(".choices .choice");

const resultContainer = document.getElementById("result-display-container");
const playerDisplay = document.getElementById("player-choice-display");
const computerDisplay = document.getElementById("computer-choice-display");
const playerWrapper = document.getElementById("player-circle-wrapper");
const computerWrapper = document.getElementById("computer-circle-wrapper");

const resultText = document.querySelector("#result-display h1");
const resultSubtext = document.querySelector("#result-display h2");
const playAgainBtn = document.querySelector(".play-again-btn");
const nextBtn = document.querySelector(".next-btn");

const playerScoreElement = document.querySelector("#player-score p");
const computerScoreElement = document.querySelector("#computer-score p");

let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

playerScoreElement.textContent = playerScore;
computerScoreElement.textContent = computerScore;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissor") ||
    (player === "scissor" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "player";
  }
  return "computer";
}

function updateScore(winner) {
  if (winner === "player") {
    playerScore++;
    localStorage.setItem("playerScore", playerScore);
    playerScoreElement.textContent = playerScore;
  } else if (winner === "computer") {
    computerScore++;
    localStorage.setItem("computerScore", computerScore);
    computerScoreElement.textContent = computerScore;
  }
}

function createChoiceButton(choice) {
  const btn = document.createElement("button");
  btn.classList.add("choice", `${choice}-btn`, "absolute-btn");

  const img = document.createElement("img");
  img.src =
    choice === "rock"
      ? "./images/icons8-fist-67 1.png"
      : choice === "paper"
      ? "./images/icons8-hand-64 1.png"
      : "./images/17911 1.png";

  img.alt = `${choice}-icon`;
  btn.appendChild(img);
  return btn;
}

function showChoice(wrapper, choice, isWinner) {
  wrapper.innerHTML = "";

  const outer = document.createElement("div");
  outer.className = "outer-circle";

  const middle = document.createElement("div");
  middle.className = "middle-circle";

  const inner = document.createElement("div");
  inner.className = "inner-circle";

  const choiceBtn = createChoiceButton(choice);

  if (isWinner) {
    inner.appendChild(choiceBtn);
    middle.appendChild(inner);
    outer.appendChild(middle);
    wrapper.appendChild(outer);
  } else {
    wrapper.appendChild(choiceBtn);
  }
}

function showResult(winner) {
  if (winner === "player") {
    resultText.textContent = "YOU WIN";
    nextBtn.style.display = "inline-block";
  } else if (winner === "computer") {
    resultText.textContent = "YOU LOSE";
    nextBtn.style.display = "none";
  } else {
    resultText.textContent = "TIE UP";
    nextBtn.style.display = "none";
  }
}

choiceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".choices").style.display = "none";

    const playerChoice = btn.classList.contains("rock-btn")
      ? "rock"
      : btn.classList.contains("paper-btn")
      ? "paper"
      : "scissor";

    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);

    showChoice(playerWrapper, playerChoice, winner === "player");
    showChoice(computerWrapper, computerChoice, winner === "computer");

    showResult(winner);
    updateScore(winner);

    resultContainer.style.display = "flex";
  });
});

playAgainBtn.addEventListener("click", () => {
  resultContainer.style.display = "none";
  nextBtn.style.display = "none";
  playerWrapper.innerHTML = "";
  computerWrapper.innerHTML = "";
  document.querySelector(".choices").style.display = "flex";
});

document.querySelector(".rules-btn").addEventListener("click", () => {
  document.querySelector(".game-rules").style.display = "block";
});

document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector(".game-rules").style.display = "none";
});

nextBtn.addEventListener("click", () => {
  document.querySelector(".main-game-container").style.display = "none";
  resultContainer.style.display = "none";
  document.querySelector(".hurray-page").style.display = "block";
});

const hurrayPlayAgainBtn = document.querySelector(".hurray-page button");

hurrayPlayAgainBtn.addEventListener("click", () => {
  document.querySelector(".hurray-page").style.display = "none";
  document.querySelector(".main-game-container").style.display = "block";
  document.querySelector(".choices").style.display = "flex";
  resultContainer.style.display = "none";
  nextBtn.style.display = "none";
  playerWrapper.innerHTML = "";
  computerWrapper.innerHTML = "";
});
