const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db' , (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log('connected to database')
});

db.close()
class sqlDatabase{
    constructor(host) {

    }
}



module.exports = sqlServer