import questions from './questions.json' with { type: 'json' };

// Main DOM elements
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");

// answers controller
let ctrPressedAnswer = new AbortController();

// Game state
const gameState = {
  currQuestionIdx: 0,
  score: 0,
}

// initial setups
document.querySelector("#max-questions").textContent = questions.length;
document.querySelector("#max-questions").textContent = questions.length;

document.querySelector("#btn-start").addEventListener("click", () => {
  gameState.currQuestionIdx = 0;
  gameState.score = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  loadNxtQuestion();
});

document.querySelector("#restart-quiz").addEventListener("click", () => {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
});


function checkAnswer(ev) {
  const btn = ev.target;
  const idx = gameState.currQuestionIdx;

  if (btn.dataset.correct === 'true') {
    btn.classList.add('correct');
    gameState.score++;
  }
  else {
    btn.classList.add('incorrect');
    document.querySelector('#ansbtn-'+questions[idx].correctAns).classList.add('correct');
  }
  
  // turns off click events
  ctrPressedAnswer.abort();

  gameState.currQuestionIdx++;
  setTimeout(() => loadNxtQuestion(), 1000);
}


function loadNxtQuestion() {
  // checa se já passou a ultima pergunta
  if (gameState.currQuestionIdx >= questions.length) {
    finishGame();
    return;
  }

  // att a barra de progresso
  document.querySelector("#progress").style.width = `${(gameState.currQuestionIdx+1) / questions.length*100}%`;

  ctrPressedAnswer = new AbortController();
  const idx = gameState.currQuestionIdx;

  document.querySelector('#question-txt').innerHTML = questions[idx].question;
  document.querySelector('#curr-quest-idx').innerHTML = idx+1;
  document.querySelector('#score').innerHTML = gameState.score;
  
  const ansContainter = document.querySelector('#answers-container');
  ansContainter.innerHTML = '';
  questions[idx].options.forEach((opt, n) => {
    const signal = ctrPressedAnswer.signal;
    
    const btn = document.createElement('button');
    btn.classList.add('answer-btn');
    btn.innerHTML = opt;

    btn.id = 'ansbtn-' + n;
    btn.dataset.correct = n === questions[idx].correctAns;

    btn.addEventListener('click', checkAnswer, { signal })
    ansContainter.appendChild(btn);
  });
}

function finishGame() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  document.querySelector("#final-score").textContent = gameState.score;
  document.querySelector("#max-score").textContent = questions.length;

  let resultMsg = "";
  switch (gameState.score){
    case 0:
      resultMsg = "Não tens o que é necessário...";
      break;
    case 1:
      resultMsg = "Tão sábio quanto uma Shadow.";
      break;
    case 2:
      resultMsg = "Kinda mid.";
      break;
    case 3:
      resultMsg = "Talvez mais inteligente que o Sora.";
      break;
    case 4:
      resultMsg = "Ansem the Wise estaria orgulhoso.";
      break;
    case 5:
      resultMsg = "Você é o John Kingdom Hearts.";
      break;
  }

  document.querySelector("#result-msg").textContent = resultMsg;

}

// loadQuestion(0);
