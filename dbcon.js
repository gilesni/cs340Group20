var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_gilesni',
  password        : '4796',
  database        : 'cs340_gilesni'
});

module.exports.pool = pool;
