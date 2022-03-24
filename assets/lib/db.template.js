const mysql = require('mysql')

//database
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rnfptskfn1!',
  database : 'billionlove',
})

db.connect()

module.export = db;