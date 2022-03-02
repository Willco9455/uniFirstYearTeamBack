const socket = io();

var players = []
var leaderboard = []
var hostId = undefined
var quiz = undefined 

async function pageLoad() {
    // waits to recive playesrs array from server and hostId from server
    quiz = await getQuiz()  
    players = quiz.players
    hostId = quiz.hostId

    // sorts the array of players from hightest score to lowest score
    leaderboard = players.sort((a, b) => b.score - a.score)
    
    // adds the top 5 players to the list 
    for (let i = 0; i < 5; i++) {
        try {
            var user = leaderboard[i]
            var item = document.createElement('li');
            item.appendChild(document.createTextNode(`${user.uname} - ${user.score}`));
            document.getElementById('list').appendChild(item);
        } catch(err) {
            continue
        }
    }

    // checks if the user currently viewing page is the host and displays the next question option if they are
    if (hostId == localStorage.getItem('uname')) {
        console.log('isHost')
        document.getElementById('button').style.display = 'block'
    }
    
    document.getElementById('question').innerHTML = `Question ${quiz.qnum + 1}`
    console.log(quiz)
}


// gets quiz object from server
function getQuiz() {
    return new Promise(resolve => socket.emit('cGetQuiz', false, data => {
      resolve(data)
    }))
}

// tells the server the next question button has been pressed
function nextQButton() {
    socket.emit('cNextQ')
    console.log('nextQuestion please')
}


// listener for server sending nextQuestion update,, will reload the questions
socket.on('sNextQ', function() { 
    document.location.href = "/game";
})

//loads leaderboard page
pageLoad()