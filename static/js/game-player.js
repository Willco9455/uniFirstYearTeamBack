const socket = io();
var questions = undefined
var qnum = 0

// gets the questions from the sever and aves to questions variable
socket.emit('cGetQuestions', false, function(res) {
    questions = res
})


function buttonPress() {
    console.log(questions)
}

function loadQuestion() {
    document.getElementById('qnum').innerHTML = qnum.toString()
}

loadQuestion()  