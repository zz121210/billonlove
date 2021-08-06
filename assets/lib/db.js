const mysql = require('mysql')

const db = mysql.createConnection({
  host     : 'billionlove.cafe24app.com',
  user     : 'billionlove',
  password : 'billionlove9584',
  database : 'billionlove',
  port:'3306'
})

db.connect()

module.exports = db;