// Variable declaration

var quizWindow = $("<div></div>").attr("class", "quizWindow");
var questionDiv = $("<div></div>").attr("class", "questionDiv");
var timer = 60;
var questionCounter = 0;
var quizArray = [
  {
    question: "Have you ever gone so far as to become such as?",
    answers: ["Yes", "No", "Maybe", "What?"],
    correctAnswer: 2,
  },
  {
    question: "Beans?",
    answers: ["Huh", "Who?", "Do you mean legumes?", "BEANS!"],
    correctAnswer: 3,
  },
  {
    question: "What is your name?",
    answers: [
      "My name is Sir Lancelot of Camelot",
      "Sir Robin of Camelot",
      "Sir Galahad of Camelot",
      "It is Arthur, King of the Britains",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is your favorite color?",
    answers: ["Red", "Purple", "Green", "Blue... no yellow!"],
    correctAnswer: 3,
  },
  {
    question: "What is the airspeed velocity of an unladen swallow?",
    answers: [
      "A what?",
      "How should I know that?",
      "This makes no sense",
      "What do you mean, an African or European swallow?",
    ],
    correctAnswer: 3,
  },
];

// Function to begin the quiz

function startFunction() {
  $("#title").fadeOut(1000);
  setTimeout(function () {
    $("#mainContent").append(quizWindow);
  }, 1100);
  setTime();
  displayQuestion();
}

// Function to start timer

function setTime() {
  var timerCounter = setInterval(function () {
    timer--;
    $("#header")
      .children()
      .text(timer + " seconds remaining");
    if (timer === 0) {
      clearInterval(timerCounter);
    }
    if (questionCounter === quizArray.length) {
      clearInterval(timerCounter);
      endQuiz();
    }
  }, 1000);
}

// Function to handle generation of quiz elements on each question

function displayQuestion() {
  if (questionCounter === quizArray.length) {
    endQuiz();
  } else {
    var currentQuestion = quizArray[questionCounter];
    quizWindow.fadeIn(1000);
    quizWindow.append(questionDiv);
    questionDiv.fadeIn(1000);
    questionDiv.append($("<h1></h1>").text(currentQuestion.question));
    for (var i = 0; i < currentQuestion.answers.length; i++) {
      var currentAnswer = $("<div></div>")
        .attr("class", "answerChoice")
        .append($("<h3></h3>").text(currentQuestion.answers[i]));
      if (i === currentQuestion.correctAnswer) {
        currentAnswer.click(correct);
      } else {
        currentAnswer.click(incorrect);
      }
      quizWindow.append(currentAnswer);
    }
  }
}

// Click handler for start button

$("#startButton").click(startFunction);

// Functions to assist in with displayQuestion

function correct() {
  this.style.backgroundColor = "green";
  nextQuestion();
}

function incorrect() {
  this.style.backgroundColor = "red";
  timer = timer - 5;
  nextQuestion();
}

function nextQuestion() {
  quizWindow.fadeOut(2000);
  questionDiv.fadeOut(2000);
  setTimeout(removeElements, 1800);
  questionCounter++;
  setTimeout(displayQuestion, 2000);
}

function removeElements() {
  quizWindow.empty();
  questionDiv.empty();
}

function endQuiz() {
  window.location.href = "highscores.html";
}

// $("#initials").
