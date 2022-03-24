const mysql = require('mysql')

const db = mysql.createConnection({
  connectionLimit : 100,
  waitForConnections : true,
  queueLimit :0,
  host     : 'db.billionlove.kr',
  user     : 'qkrdndud21',
  password : 'billionlove1005!',
  database : 'dbqkrdndud21',
  wait_timeout : 28800,
  connect_timeout :10
  
})

function handleDisconnect() {
  db.connect(function(err) {            
    if(err) {                            
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                   
  });                                 
                                         
  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      return handleDisconnect();                      
    } else {                                    
      throw err;                              
    }
  });
}

handleDisconnect(); 

setInterval(() => { 
  db.query('SELECT 1'); 
}, 5000);

module.exports = db;