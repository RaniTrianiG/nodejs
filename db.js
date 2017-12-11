var mysql = require('mysql');

var cn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nodejs'
});
cn.connect();

module.exports = cn;