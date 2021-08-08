const express = require('express')
const router = express.Router()
const db = require('../../assets/lib/db')
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
  res.render("../../program/login/views/index.ejs")
})

router.post("/process", (req, res) => {
  post = req.body
  if(post.member_id == 'billionlove' && post.member_pw == 'hattyjoey1005') {
    req.session.a = '1'
    res.redirect("/")
  }
 
})

module.exports = router;
