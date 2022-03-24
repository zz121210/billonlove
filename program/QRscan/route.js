const express = require('express')
const router = express.Router()
const db = require('../../assets/lib/db')
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
const cors = require('cors')
router.use(cors());
const session = require('express-session');	//세션관리용 미들웨어

router.use(session({
  httpOnly: true,	//자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
  secure: true,	//https 환경에서만 session 정보를 주고받도록처리
  secret: 'secret key',	//암호화하는 데 쓰일 키
  resave: false,	//세션을 언제나 저장할지 설정함
  saveUninitialized: true,	//세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
  cookie: {	//세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: true,
    Secure: true
  }
  })
);
router.get("/", (req, res) => {
  if(!req.session.member) {
    res.render('../../program/login/views/index.ejs')
  } else {
    res.render("../../program/QRscan/views/index.ejs")
  }
})

router.post('/ajax', (req, res) => {
  let temperature, symtom, etc_symtom, covid, country, entry_date, contact, name, phone, date
  temperature = req.body.data.split('/')[0]
  symtom = req.body.data.split('/')[1]
  etc_symtom = req.body.data.split('/')[2]
  covid = req.body.data.split('/')[3]
  country = req.body.data.split('/')[4]
  entry_date = req.body.data.split('/')[5]
  contact = req.body.data.split('/')[6]
  name = req.body.data.split('/')[7]
  phone = req.body.data.split('/')[8]
  date = req.body.data.split('/')[9]
  if( phone == null) {
    return false
  }
  
  db.query(`SELECT * FROM paper WHERE phone = '${phone}' AND date = '${date}'`, (err, rows) =>{
    if(rows[0] == undefined) {
      db.query(`
        iNSERT INTO paper
          (member_id ,temperature, symtom, etc_symtom, covid, country, entry_date, contact, name, phone, date) values
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [req.session.member.member_id ,temperature, symtom, etc_symtom, covid, country, entry_date, contact, name, phone, date], (err) => {
          if (err) throw err
          responseData = 1
          res.json(responseData);
      })
    } else {
      responseData = 0
      res.json(responseData);
    }
  })
})

module.exports = router;