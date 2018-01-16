$(function() {
  $("#gamePage").hide();
  function quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }
  // current question
  quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
  };
  // if quiz is over
  quiz.prototype.isEnded = function() {
    return this.questions.length === this.questionIndex;
  };

  // if answer is correct
  quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().correctAnswer(answer)) {
      this.score++;
      console.log(this.score);
    }
    this.questionIndex++;
  };

  function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  Question.prototype.correctAnswer = function(choice) {
    return choice === this.answer;
  };

  function populate() {
    if (quiz.isEnded()) {
      showScores();
    } else {
      //show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;
      // show choices
      var choices = quiz.getQuestionIndex().choices;
      for (var i = 0; i < choices.length; i++) {
        var element = document.getElementById("button-" + (i + 1));
        element.innerHTML = choices[i];
        guess("btn" + (i + 1), choices[i]);
      }
      showProgress();
    }
  }

  function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
      quiz.guess(guess);
      populate();
    };
  }

  function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML =
      "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  }

  function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'>Your Score: " + quiz.score + " out of " + quiz.questions.length + " </h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
  }
  var questions = [
    new Question(
      "What is the 5th planet in the Solar System?",
      ["Jupiter", "Mars", "Uranus", "Earth"],
      "Jupiter"
    ),
    new Question(
      "How did Humpty Dumpty break his shell?",
      [
        "he was ran over",
        "He cracked himself",
        "He fell off a wall",
        "He was hit on the head"
      ],
      "He fell off a wall"
    ),
    new Question(
      "Why was 6 afraid of 7?",
      [
        "because he was a bully",
        "Because 7 8 9",
        "He insulted his mother",
        "He's a larger number"
      ],
      "Because 7 8 9"
    ),
    new Question(
      "Where would you find the Sea of Tranquility?",
      ["Europe", "The Moon", "Antartica", "South America"],
      "The Moon"
    ),
    new Question(
      "Name the world's largest ocean",
      ["Artic", "Indian", "Atlantic", "Pacific"],
      "Pacific"
    )
  ];
  var quiz = new quiz(questions);

  populate();

  var number = 20;
  $("#startButton").click(function() {
    $("#gamePage").show();
    $("#startPage").hide();
    run();
  });

  var number = 10;


  var intervalId;

  function run() {
    intervalId = setInterval(decrement, 1000);
  }

  function decrement() {
    number--;
    $("#show-number").html("<h2>Time Remaining: " + number + " seconds</h2>");
    if (number === 0) {
  
      showScores();
    }
  }
  console.log(number);
});
