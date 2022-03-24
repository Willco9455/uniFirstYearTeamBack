// quiz object
class Game {

    constructor(pin) {
        this.title = 'Game Title';
        this.pin = pin;
        this.players = []
        this.questions = []
        this.option1 = [] 
        this.option2 = [] 
        this.option3 = [] 
        this.option4 = [] 
        this.correct = [] 
        this.qnum = 0
    }

    addPlayer(uname) {
      this.players.push(new User(uname))
    }

    remPlayer(uname) {
        this.players = this.players.filter( obj => {
            return obj.uname != uname;
        });
    }

    clearPlayers() {
        this.players = []
    }


    getQNUm() {
        return this.qnum
    }

    nextQ() {
        this.qnum += 1
    }

    addPlayerScore(uname) {
        var index = this.players.findIndex(x => x.uname == uname)
        console.log(this.players[index])
        try {
            this.players[index].addScore()
        } catch (err){
            console.log(err)
        }
    }

    getPlayers() {
        return this.players
    }

    loadQuestions(qName) {
        this.title = qName
        this.questions = quizes[qName]['questions']
        this.option1 = quizes[qName]['option1']
        this.option2 = quizes[qName]['option2']
        this.option3 = quizes[qName]['option3']
        this.option4 = quizes[qName]['option4']
        this.correct = quizes[qName]['correct']
    }
}


class User {
    constructor(uname) {
        this.uname = uname;
        this.score = 0
    }

    addScore() {
        this.score = this.score + 1
    }
}

module.exports = Game




// hard coded quizes that everybody can use 

const quizes = {
    'avengers' : {
        'questions' : [
            'How many Infinity Stones are there?',
            'Where is Captain America from?'
        ],

        'option1' : [
            'six',
            'Yorkshire',
        ], 

        'option2' : [
            'five',
            'Queens',
        ],

        'option3' : [
            'four',
            'Brooklyn',
        ],

        'option4' : [
            'seven',
            'California'
        ], 

        'correct' : [
            1, 
            3
        ]
    }
}
