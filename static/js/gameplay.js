const socket = io();
var sent = [];
var questions = []; 
var option1 = [];
var option2 = [];
var option3 = [];
var option4 = [];
var correct = [];
var quiz = undefined

var uname = localStorage.getItem('uname')

// gets the questions from the sever and aves to questions variable
socket.emit('cGetQuestions', false, function(res) {
  sent = res
  questions = sent[0] 
  option1 = sent[1]
  option2 = sent[2]
  option3 = sent[3]
  option4 = sent[4]
  correct = sent[5]
  // load question
  optiongenerator();
})


//Create canvas
var canvas = document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
ctx.font="30px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";


//list of questions

//value of the correct answer - 4=c, 2=b, 3=d, 1=a - this needs fixing - see below
//messed up order in regards to options c and d - need to fix in all instances
//c should be equal to 3, d should be equal to 4
//consider swapping the buttons for c and d to match the answers option rectangles

var option_chosen;

async function optiongenerator() {
  // gets full quiz object from the database
  quiz = await getQuiz()

  //i is used in place of the question number
  // i becomes current question of quiz
  i = quiz.qnum

  // player stored on localstorage is retrived from the players array in quiz object
  player = await quiz.players.filter(obj => {
    return obj.uname === uname
  })[0]
  console.log(player)

  // error will throw if user is host
  try {
    var score = player.score
  } catch(err) {
    var score = 'host'
  }

  // adds score to page
  document.getElementById("score").innerHTML = "Score: " + score;


  var circleStart = 1.5 * Math.PI;
  var circleEnd = circleStart;
  var timeLimit = 15000;
  var previousDistance = timeLimit;

  // displays the question and answer options
  document.getElementById("option1").innerHTML = option1[i];
  document.getElementById("option2").innerHTML = option2[i];
  document.getElementById("option3").innerHTML = option3[i];
  document.getElementById("option4").innerHTML = option4[i];
  document.getElementById("question").innerHTML = questions[i];

// timer code below

  // Update the count down every 1 second
  var countDownDate = new Date().getTime() + timeLimit;
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clears the canvas
    ctx.fillText(seconds + "s ", canvas.width/2, canvas.height/2);  // Displays remaing time in seconds on the canvas
    //Displays two circles around the timer

    //Displays a red circle
    ctx.beginPath();
    ctx.lineWidth = 13;
    ctx.strokeStyle = "Red";
    ctx.arc(canvas.width/2 -5, canvas.height/2 - 10, 75, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();

    //Displays a green circle
    ctx.strokeStyle = "#02de0d";
    ctx.arc(canvas.width/2 -5, canvas.height/2 - 10, 75, circleStart, circleEnd);
    circleEnd = circleEnd - (((previousDistance - distance)/timeLimit)*2*Math.PI);
    previousDistance = distance;
    ctx.stroke();

    //When the time has run out, timer animation is cleared and replaced with a message saying 'Times Up'
    if (distance < 0) {
      clearInterval(x);
      ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clears the canvas
      ctx.fillText("Times Up", canvas.width/2, canvas.height/2);
      //timer code above

      //checks the correct answer against the chosen answer
      if (correct[i] == window.option_chosen) {
        socket.emit('cAddPlayerScore', uname)
        document.getElementById("score").innerHTML = "Score:" + score;
        alert("correct"); 
        score++;
      }else { 
        alert("incorrect");
      }

      document.location.href = "/leaderboard";

    }
    
  }, 50);//This number changes how frequently the function is called
}



// These functions are called when an answer button is pressed. It
// stores the value of the option (1, 2, 3, 4), as a global variable,
// which is then checked against the correct answers value (1, 2, 3, 4)
function answer1() {window.option_chosen = 1;}
function answer2() {window.option_chosen = 2;}
function answer3() {window.option_chosen = 3;}
function answer4() {window.option_chosen = 4;}

// wills server functions 


// will get the current question number returns as a resolved promise so it can be used asynchronously
function getQuiz() {
  return new Promise(resolve => socket.emit('cGetQuiz', false, data => {
    resolve(data)
  }))
}


