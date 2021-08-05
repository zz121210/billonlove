const mysql = require('mysql')

const db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'rnfptskfn1xnqmffkr1illipal1',
  database : 'hexy_questionnaire'
})

db.connect()


module.exports = db;