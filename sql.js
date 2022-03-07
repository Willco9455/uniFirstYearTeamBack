var mysql = require('mysql')

var con = mysql.createConnection({
    host: "sql208.epizy.com",
    user: "epiz_31220123",
    password: "BAncdfZkUmcU",
    database: "epiz_31220123_test"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


class sqlServer{
    constructor(host) {

    }
}



module.exports = sqlServer