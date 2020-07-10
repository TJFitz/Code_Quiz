// Variable declaration

var isDisplaying;
var isStarting;
var quizWindow = $("<div>").attr("class", "quizWindow");
var questionDiv = $("<div>").attr("class", "questionDiv");
var timer = 60;
var questionCounter = 0;
var scoresArray = [];

var quizArray = [
  {
    question: "Which of the following is NOT a common data type?",
    answers: ["Booleans", "Ropes", "Numbers", "Objects"],
    correctAnswer: 1,
  },
  {
    question: "Which of the follow is NOT a type of loop?",
    answers: ["For loop", "While loop", "Do/While", "Infinite"],
    correctAnswer: 3,
  },
  {
    question:
      "What type of brackets are used for defining the body of a function?",
    answers: ["Curly", "Square", "Parens", "Arrows"],
    correctAnswer: 0,
  },
  {
    question: "What is the operator for OR statements",
    answers: ["&&", "%", "...", "||"],
    correctAnswer: 3,
  },
  {
    question: "Arrays can hold how many items?",
    answers: ["100", "99", "As many as we would like", "What is an array?"],
    correctAnswer: 2,
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
    $("#timer").text(timer + " seconds remaining");
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
    $("#initials").val("");
    highscoreEntry = thisWork + " " + score;
    scoresArray.push(highscoreEntry);
    localStorage.setItem("highscoresArray", JSON.stringify(scoresArray));
    highScoreFunction();
  }
});

function highScoreFunction() {
  $("#highscores").empty();
  var storedArray = JSON.parse(localStorage.getItem("highscoresArray"));
  if (storedArray !== null && storedArray.length > 0) {
    scoresArray = storedArray;
    for (var i = 0; i < scoresArray.length; i++) {
      $("#highscores").append(
        $("<div>").append($("<h3>").text(scoresArray[i]))
      );
    }
  }
}

highScoreFunction();

// Function to handle highscores/tryagain button, this is still not functioning properly

$("#highscoreDiv").click(function () {
  if (window.location.href === "index.html") {
    window.location.href = "highscores.html";
  } else {
    window.location.href = "index.html";
  }
});
