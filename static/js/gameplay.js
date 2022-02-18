//i is used in place of the question number
let i = 0;
//lists of options
const option2 = ["4", "2", "3", "2", "6"];
const option3 = ["9", "7", "4", "3", "7"];
const option1 = ["6", "8", "8", "4", "8"];
const option4 = ["7", "5", "9", "5", "9"];
//list of questions
const questions = ["What is 5+1?", "What is 3+4?", "What is 7+2?", "What is 2+1?", "What is 3+6?"];
//value of the correct answer - 4=c, 2=b, 3=d, 1=a - this needs fixing - see below
//messed up order in regards to options c and d - need to fix in all instances
//c should be equal to 3, d should be equal to 4
//consider swapping the buttons for c and d to match the answers option rectangles
const correct = [4, 2, 3, 2, 3];
var option_chosen;

  function optiongenerator() {

    // displays the question and answer options
    document.getElementById("option1").innerHTML = option1[i];
    document.getElementById("option2").innerHTML = option2[i];
    document.getElementById("option3").innerHTML = option3[i];
    document.getElementById("option4").innerHTML = option4[i];
    document.getElementById("question").innerHTML = questions[i];

  // timer code below
  var countDownDate = new Date().getTime() + 15000;
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = seconds + "s ";

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timer").innerHTML = "Times up";
  //timer code above

  //checks the correct answer against the chosen answer
      if (correct[i] == window.option_chosen) {alert("correct");}
      else {alert("incorrect");}

      //increments i, moving on to the next question and set of answers
      i++;

      //calls the function again, displaying the next question and set of answers
      //and also restarting the timer
      optiongenerator();

        }

    }, 1000);
  }
//starts the timer and displays the first question and set of answers
 optiongenerator();

 // These functions are called when an answer button is pressed. It
 // stores the value of the option (1, 2, 3, 4), as a global variable,
 // which is then checked against the correct answers value (1, 2, 3, 4)
 function answer1() {window.option_chosen = 1;}
 function answer2() {window.option_chosen = 2;}
 function answer3() {window.option_chosen = 3;}
 function answer4() {window.option_chosen = 4;}
