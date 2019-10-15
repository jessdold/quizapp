let questionNumber = 0;
let quizScore = 0;


//when the document is ready, render the opening page


//update question number and score
function updateCountAndScore() {
  $('.questionNum').text(questionNumber);
  $('.scoreCount').text(quizScore);
}


//when the let's start button is clicked, begin the quiz
function beginQuiz() {
  $("#beginQuiz").on('click', function(event) {
    questionNumber++;
    updateCountAndScore();
    $('.description').hide();
    $('.question').show();
    $('.counter').html(`Question    
      <span class="questionNum">0</span> / 5 --- Your  score: <span class="scoreCount">0</span>`)
    renderQuestion();
    renderChoices();
    checkAnswer();

  });
}

//render question
function renderQuestion() {
  const quest = STORE[questionNumber - 1].question;
  $(".question").html(
    `<p>${quest}</p>`
    
    
  ); 
}


//render choices
function renderChoices() {

  const choices = STORE[questionNumber - 1].choices;
    $('.answers').html(
      `<form action="post" role="questions" id="answerChoices">
      <input type="radio" id="choiceOne" name="choice1" value="${choices[0]}">
        <label for="choiceOne">${choices[0]}</label><br>
      <input type="radio" id="choiceTwo" name="choice1" value="${choices[1]}">
        <label for="choiceTwo">${choices[1]}</label><br>
      <input type="radio" id="choiceThree" name="choice1" value="${choices[2]}">
        <label for="choiceThree">${choices[2]}</label><br>
      <input type="radio" id="choiceFour" name="choice1" value="${choices[3]}">
        <label for="choiceFour">${choices[3]}</label><br>
      <button type="button" for="answerChoices" id="submitAnswer">Submit</button>
    </form>`
    )
  };


//when question submit clicked, check to see if answer is correct and render feedback 
function checkAnswer() {
  $('.answers').on('click', '#submitAnswer', function(event) {
    $('.question').hide();
    $('.answers').hide();
    
    var choice = $("input[name='choice1']:checked").val();
    
    if (questionNumber < 5) {

      if (choice === STORE[questionNumber - 1].answer) {
        quizScore++;
        updateCountAndScore();
        $('.description').show().html(`<section class="container">
        <div class="resultImage">
          <img class="result" src="https://kamedia.ca/wp-content/uploads/Thumbs-Up-Kid-03.png" alt="pic of nerdy kid giving 2 thumbs up">
        </div>
        <div class="resultsBox">
          <h3>You are correct!</h3>
          <p>Well done. Carry on...</p>
        </div>
      </section>
      <button id="nextButton" type="button">Next</button>`)
      }

      else 
        $('.description').show().html(`<section class="container">
        <div class="resultImage">
          <img class="result" src="https://pixel.nymag.com/imgs/daily/intelligencer/2015/10/24/24-Obama-grumpy-cat.w700.h700.jpg" alt="pic of Barack Obama with a disappointed frowny face">
        </div>
        <div class="resultsBox">
          <h3>WRONG!</h3>
          <h4>The correct answer is:</h4>
          <p>${STORE[questionNumber - 1].answer}</p>
        </div>
      </section>
      <button id="nextButton" type="button">Next</button>`)
      
    }

    if (questionNumber === 5) {
     
      if (choice === STORE[questionNumber - 1].answer) {
        quizScore++;
        updateCountAndScore();
        $('.description').show().html(`<section class="container">
        <div class="resultImage">
          <img class="result" src="https://kamedia.ca/wp-content/uploads/Thumbs-Up-Kid-03.png" alt="pic of nerdy kid giving 2 thumbs up">
        </div>
        <div class="resultsBox">
          <h1>You are correct!</h1>
          <p>Well done. Carry on...</p>
        </div>
      </section>
      <button id="finish" type="button">See Your Score</button>`)
      }

      else 
        $('.description').show().html(`<section class="container">
        <div class="resultImage">
          <img class="result" src="https://pixel.nymag.com/imgs/daily/intelligencer/2015/10/24/24-Obama-grumpy-cat.w700.h700.jpg" alt="pic of Barack Obama with a disappointed frowny face">
        </div>
        <div class="resultsBox">
          <h1>WRONG!</h1>
          <h3>The correct answer is:</h3>
          <p>${STORE[questionNumber - 1].answer}</p>
        </div>
      </section>
      <button id="finish" type="button">See Your Score</button>`)
      
    }
    
    });
    renderResults();
  }

  function handleNextQuestion() {
  $(".description").on('click', '#nextButton', function(event) {
    $('.question').show();
    $('.answers').show();
    $('.description').hide();
    questionNumber++;
    updateCountAndScore();
    renderQuestion();
    renderChoices();
  })
}

handleNextQuestion();


//when last question is answered, render results
function renderResults() {
  $(".description").on('click', '#finish', function(event) {
    $('.counter').hide();
    $('.description').hide();

    if (quizScore < 4) {

      $('.final').html(`<div class="finalContainer"><h3>Hmm... You scored ${quizScore} out of 5.</h3>
      <div><img class="snob" src="https://cdn.now.howstuffworks.com/media-content/8d87872d-79a6-481a-914e-d684b8de0aeb-1920-1080.jpg" alt="Jim Carrey as Lloyd Christmas in Dumb and Dumber"></div>
      <h3>I fear your snob level is less than satisfactory.</h3>
      </div>
      <button type="button" id="startOver">Start Over</button></div>`)
    }

    else {
      $('.final').html(`<div class="finalContainer"><h3>You scored ${quizScore} out of 5!</h3>
      <div><img class="snob" src="https://www.edchoice.org/wp-content/uploads/2015/06/snob-large.jpg" alt="Snobby woman sipping tea"></div>
      <h3>It would appear as though you are, in fact, a music snob. Cheers to you.</h3>
      </div>
      <button type="button" id="startOver">Start Over</button></div>`)
    }
    });
  }

function startOver() {
  $(".final").on('click', '#startOver', function (event) {
    questionNumber=1;
    quizScore=0;
    updateCountAndScore();
    console.log('starting over at question number ' + questionNumber);
    $('.final').hide();
    $('.counter').show();
    $('.question').show();
    $('.answers').show();
    renderQuestion();
    renderChoices();
  });
}

startOver(); 

$(beginQuiz);
