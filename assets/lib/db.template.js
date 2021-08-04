const mysql = require('mysql')

//database
const db = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
})

db.connect()

module.export = db;