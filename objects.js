// quiz object
class Game {
     
    constructor(pin) {
        this.title = 'Game Title';
        this.pin = pin;
        this.hostId = undefined
        this.players = []
        this.questions = 
        [   
            {
                question: 'What is the best colour?',
                ans0: 'Blue',
                ans1: 'Red',
                ans2: 'orange',
                ans3: 'Pink',
                cor: 2
            }, 
            {
                question: 'What is the worst colour?',
                ans0: 'Violet',
                ans1: 'Purple',
                ans2: 'Yellow',
                ans3: 'Grey',
                cor: 1
            }, 
        ]
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
}

class User {
    constructor(uname) {
        this.uname = uname;
    }
}

module.exports = Game