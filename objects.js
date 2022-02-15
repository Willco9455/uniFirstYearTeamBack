// quiz object
class Game {
     
    constructor(pin) {
        this.title = 'Game Title';
        this.pin = pin;
        this.hostId = ''
        this.players = []
    }

    addPlayer(uname) {
      this.players.push(new User(uname))
    }
}

class User {
    constructor(uname) {
        this.uname = uname
    }
}

module.exports = Game