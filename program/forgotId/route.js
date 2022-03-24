const express = require('express')
const router = express.Router()
const db = require('../../assets/lib/db')
const session = require('express-session');	//세션관리용 미들웨어
const smtpTransport = require('../../config/email');
const nodemailer = require('nodemailer');
const { render } = require('ejs');

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
  res.render("../../program/forgotId/views/index.ejs")
})

router.post("/process", (req, res) => {
  post = req.body
  member_phone = post.member_phone

  db.query(`
  SELECT member_id FROM hexy_member_account hma 
	LEFT JOIN hexy_member_info hmi ON hma.hexy_member_code = hmi.hexy_member_code
    WHERE hmi.member_phone = ?
  `, [member_phone], (err, row) => {
    function masking(email) {
      var len = email.split('@')[0].length-3; // AB***@gamil.com
      return email.replace(new RegExp('.(?=.{0,' + len + '}@)', 'g'), '*');
    }

    if(row[0]) {
      res.render("../../program/forgotId/views/index.ejs", 
      {
        msg : masking(row[0].member_id)
      })
    } else {
      res.render("../../program/forgotId/views/index.ejs", 
      {
        msg : '가입되어 있는 아이디가 없습니다.' 
      })
    }
  })
})

module.exports = router;
