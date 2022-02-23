const socket = io();
var questions = undefined
var qnum = 0
var timer = 31



// gets the questions from the sever and aves to questions variable
socket.emit('cGetQuestions', false, function(res) {
    questions = res
    loadQuestion()
})


function loadQuestion() {
    timer = 31;
    var curQ = questions[qnum]
    document.getElementById('question').innerHTML = curQ.question
    document.getElementById('answer1').innerHTML = curQ.ans0
    document.getElementById('answer2').innerHTML = curQ.ans1
    document.getElementById('answer3').innerHTML = curQ.ans2
    document.getElementById('answer4').innerHTML = curQ.ans3
    console.log(questions)
}

function nextQuestion() {
    qnum += 1
    loadQuestion()
    startTimer()
}

function startTimer() {
    test = setInterval( () => {
        timer -= 1
        console.log(timer)
        document.getElementById('timer').innerHTML = timer
        if (timer == 0) {
            clearInterval(test)
            timerEnd()
        } 
    }, 100)
}

function timerEnd() {
    // window.alert('Timer ended')
    document.getElementById('nextButton').style.display = "block"
}

startTimer()