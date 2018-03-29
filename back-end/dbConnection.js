const mysql = require('mysql');
const dbConfig = require('./dbConfig');

function queryDatabase(query) {
  const con = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    con.connect(function(err) {
      if (err) throw err;
      con.query(query, function (err, result, fields) {
        if (err) throw err;
        con.end();
        resolve(result);
      });
    });
  });
}

module.exports = queryDatabase;
