// Variable declaration

var quizWindow = $("<div>").attr("class", "quizWindow");
var questionDiv = $("<div>").attr("class", "questionDiv");
var timer = 60;
var questionCounter = 0;
var isDisplaying;
var isStarting;
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
  if (isStarting) {
    return;
  } else {
    $("#title").fadeOut(1000);
    setTimeout(function () {
      $("#mainContent").append(quizWindow);
    }, 1100);
    setTime();
    displayQuestion();
  }
}

// Click handler for start button

$("#startButton").click(startFunction);

// Function to handle timer

function setTime() {
  var timerCounter = setInterval(function () {
    timer--;
    $("#header")
      .children()
      .text(timer + " seconds remaining");
    if (timer <= 0) {
      clearInterval(timerCounter);
      endQuiz();
    }
    if (questionCounter === quizArray.length) {
      clearInterval(timerCounter);
      endQuiz();
    }
  }, 1000);
}

// Functions to assist with displayQuestion

function removeElements() {
  quizWindow.empty();
  questionDiv.empty();
}

function nextQuestion() {
  if (isDisplaying) {
    return;
  } else {
    isDisplaying = true;
    quizWindow.fadeOut(800);
    questionDiv.fadeOut(800);
    setTimeout(removeElements, 1000);
    questionCounter++;
    setTimeout(displayQuestion, 1800);
  }
}

function correct() {
  this.style.backgroundColor = "green";
  nextQuestion();
}

function incorrect() {
  this.style.backgroundColor = "red";
  if (isDisplaying) {
    return;
  } else {
    timer = timer - 5;
  }
  nextQuestion();
}

function endQuiz() {
  quizWindow.fadeOut(800);
  questionDiv.fadeOut(800);
  var finalTime = timer;
  localStorage.setItem("finalTime", finalTime);
  setTimeout(function () {
    window.location.href = "highscores.html";
  }, 1000);
}

// Function to handle generation of quiz elements on each question

function displayQuestion() {
  isStarting = true;
  if (questionCounter === quizArray.length) {
    endQuiz();
  } else {
    var currentQuestion = quizArray[questionCounter];
    quizWindow.append(questionDiv);
    questionDiv.append($("<h1>").text(currentQuestion.question));
    for (var i = 0; i < currentQuestion.answers.length; i++) {
      var currentAnswer = $("<div>")
        .attr("class", "answerChoice")
        .append($("<h3>").text(currentQuestion.answers[i]));
      if (i === currentQuestion.correctAnswer) {
        currentAnswer.click(correct);
      } else {
        currentAnswer.click(incorrect);
      }
      quizWindow.append(currentAnswer);
    }
    quizWindow.fadeIn(1000);
    questionDiv.fadeIn(1000);
    isDisplaying = false;
  }
}

// Handling of highscores
$("#initials").keypress(function (e) {
  if (e.which === 13) {
    var inputVal = $("#initials").val();
    localStorage.setItem("initials", inputVal);
    var thisWork = localStorage.getItem("initials");
    var finalTime = localStorage.getItem("finalTime");
    var score = finalTime * 117;
    console.log(thisWork);
    $("#initials").val("");
    $("#highscores").append(
      $("<div>").append($("<h3>").text(thisWork + " " + score))
    );
    localStorage.clear();
  }
});
