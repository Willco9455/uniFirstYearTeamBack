// quiz object
class Game {

    constructor(pin) {
        this.title = 'Game Title';
        this.pin = pin;
        this.hostId = undefined
        this.players = []
        this.questions = ['9 + 3', '3 + 4', '7 + 7']
        this.option1 = ['12', '5', '2'] 
        this.option2 = ['13', '7', '8'] 
        this.option3 = ['2', '3', '14'] 
        this.option4 = ['4', '2', '12'] 
        this.correct = [1, 2, 3] 
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

    setHost(uname) {
        this.hostId = uname
    }

    clearPlayers() {
        this.players = []
    }

    getQuestions() {
        var send = [this.questions, this.option1, this.option2, this.option3, this.option4, this.correct]
        return send
    }

    getQNUm() {
        return this.qnum
    }

    nextQ() {
        this.qnum += 1
    }
}

class User {
    constructor(uname) {
        this.uname = uname;
        this.score = 0
    }
}

module.exports = Game