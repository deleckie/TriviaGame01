//
// on document ready from jquery
//
// Once the entire html document has been parsed and the document object model
// built in memory, then execute my javascript code, pretty please chrome!
//
$(document).ready(function() {

  // $("#quiz").value()
  var quizContainer = document.getElementById("quiz");
  var resultsContainer = document.getElementById("results");
  var submitButton = document.getElementById("submit");
  var myQuestions = [
    {
      question: "Jaleel White (Know for playing Steve Urke in Family Matters)",
      answers: {
        a: "succcesful restaurateur in the L.A. area",
        b: "registered cpa accountant ",
        c: "still acting, you just havent seen him",
        d: "not so succcesful restaurateur in the L.A. area"
      },
      correctAnswer: "c"
    },
    {
      question: "Soleil Moon Frye (Know for playing Punky Brewster Punky Brewster in Punky Brewster)",
      answers: {
        a: "teaching at UCLA",
        b: "running a DIY crafting blog",
        c: "assistant coach for a WNBA team",
        d: "nobody knows, she hasent been seen since her kidnaping in 1989"
      },
      correctAnswer: "b"
    },
    {
      question: "Jeff Cohen (Know for playing Chuck in the Goonies)",
      answers: {
        a: "became an entertianment lawer",
        b: "became a fitness instructor",
        c: "contined to act into his early 30's",
        d: "opend a gym to help obese children lose weight"
      },
      correctAnswer: "a"
    },
    {
      question: "Emmanuel Lewis (Know for playing Webster in the TV show Webster)",
      answers: {
        a: "became an human rights activist",
        b: "started a taxi company",
        c: "is an active Freemason",
        d: "started his own ministry"
      },
      correctAnswer: "c"
    },
    {
      question: "Danica McKellar (Know for playing Winnie Cooper in The Wonder Years)",
      answers: {
        a: "opend a dance studio in Cheyenne, WY",
        b: "has had two sets of triplets",
        c: "became an American Sign Language translator",
        d: "studied mathematics at UCLA"
      },
      correctAnswer: "d"
    },
    {
      question: "Dustin Dimond (Know for playing Screech in Saved by the Bell )",
      answers: {
        a: "convicted of assult in a barroom stabbing",
        b: "runs a nonprofit for providing funding for no-kill animal shelters",
        c: "has made it to the poker semi finals for the world championship 4 times",
        d: "married his Saved by the Bell co-star Elizabeth Berkley"
      },
      correctAnswer: "a"
    },
    {
      question: "Noah Hathaway (Know for playing  Atreyu in The The Never Ending Story)",
      answers: {
        a: "taught combat-training classes for airline employees",
        b: "became the personal trainer for Rob Lowe",
        c: "runs a small food truck company in NYC called Waffles and Dingus",
        d: "declared dead after his flight Delta 7883 went missing in 1996"
      },
      correctAnswer: "a"
    },
    {
      question: "Danny Lloyd (Know for playing Danny Torrance in The Shining)",
      answers: {
        a: "worked at Walmart",
        b: " drove a tractor on a hog farm",
        c: "teaches biology at a community college",
        d: "all of the above"
      },
      correctAnswer: "d"
    }

  ];

  function buildQuiz(quiz, questions) {
    var output = [];

    questions.forEach((currentQuestion, questionNumber) => {
      var answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    quiz.innerHTML = output.join("");
  }

  function showResults() {
    var answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;

        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  buildQuiz(quizContainer, myQuestions);

  submitButton.addEventListener("click", showResults);

  $("#reset-button").hide();


  var resetIntervalInSecs = convertMsToS(80000);

  var countdown;

  function setInitialCountDown() {
    countdown = resetIntervalInSecs;
    $("#countdown").html(countdown); // Display initial value
  }

  setInitialCountDown();

  //
  // Do something every second
  //
  var countDownIntervalId = setInterval( function() {

    if (countdown > 0) {

      // countdown = countdown - 1; // that's decrement by one
      countdown--;

      $("#countdown").html(countdown); // starts at (initial value - 1) when counting down

    }
    // Do something, only one time, when the countdown reached zero
    else if (countdown == 0) {

      countdown--;

      $("#countdown").html("Game Over!"); // starts at (initial value - 1) when counting down

    }

    console.log("Seconds timer fired!");

  }, 1000);

  function convertMsToS(milliseconds) {

      // 1100 milliseconds

      // floor(1.1 seconds) // floating-point type of numeric value

      // = 1 second


      return Math.floor(milliseconds / 1000);
  }


  //
  // Do something, only one time, after 5 seconds
  //
  var resetButtonIntervalId = setInterval( function() {

    // clearInterval(countDownIntervalId);

    console.log("Showing the reset thing!");

    $("#reset-button").show();  // show the button

    $("#reset-button").on("click", function() {

      setInitialCountDown();

    })

    clearInterval(resetButtonIntervalId);

  }, resetIntervalInSecs);

});
