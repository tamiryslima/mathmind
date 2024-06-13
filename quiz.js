// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
  {
    question: 'Qual é a raiz de 81',
    answers: [
      {
        answer: '9',
        correct: true,
      },
      {
        answer: '6',
        correct: false,
      },
      {
        answer: '16',
        correct: false,
      },
      {
        answer: '8',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é a raiz de 2025',
    answers: [
      {
        answer: '34',
        correct: false,
      },
      {
        answer: '45',
        correct: true,
      },
      {
        answer: '89',
        correct: false,
      },
      {
        answer: '32',
        correct: false,
      },
    ],
  },
  {
    question: 'Quanto é 47% de 200',
    answers: [
      {
        answer: '97',
        correct: true,
      },
      {
        answer: '34',
        correct: false,
      },
      {
        answer: '67',
        correct: false,
      },
      {
        answer: '85',
        correct: false,
      },
    ],
  },
  {
    question: 'Quanto é 50% de 60',
    answers: [
      {
        answer: '30',
        correct: true,
      },
      {
        answer: '40',
        correct: false,
      },
      {
        answer: '15',
        correct: false,
      },
      {
        answer: '26',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é o valor do X a seguir: 5x−12=3  ',
    answers: [
      {
        answer: '9',
        correct: false,
      },
      {
        answer: '4',
        correct: false,
      },
      {
        answer: '3',
        correct: true,
      },
      {
        answer: '5',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é o valor do T a seguir: 5t+5=3t+7',
    answers: [
      {
        answer: '1',
        correct: true,
      },
      {
        answer: '5',
        correct: false,
      },
      {
        answer: '6',
        correct: false,
      },
      {
        answer: '3',
        correct: false,
      },
    ],
  },
  {
    question: 'Em um sítio há 12 árvores. Cada árvore possui 12 galhos e em cada galho tem 12 maçãs. Quantas maçãs existem no sítio?',
    answers: [
      {
        answer: '1 728',
        correct: true,
      },
      {
        answer: '1 638',
        correct: false,
      },
      {
        answer: '1 346',
        correct: false,
      },
      {
        answer: '1 567',
        correct: false,
      },
    ],
  },
  
  
];

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados tela de sucesso
  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// mostra ou esonde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  //zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();