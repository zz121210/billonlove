const express = require('express')
const router = express.Router()
const db = require('../../assets/lib/db')
const session = require('express-session');	//세션관리용 미들웨어
const nodemailer = require('nodemailer');


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

let generateRandom = function (min, max) {
  let ranNum = Math.floor(Math.random()*(max-min+1)) + min;
  return ranNum;
}
const authCode = generateRandom(111111,999999)

router.get("/", (req, res) => {
  res.render("../../program/forgotPw/views/index.ejs")
})



router.post("/process", (req, res) => {
  post = req.body
  member_id = post.member_id
  db.query('SELECT * FROM hexy_member_account WHERE member_id = ?', [member_id], (err, row) => {
    hexy_member_code = row[0].hexy_member_code
    if(row[0]) {
      let transporter = nodemailer.createTransport({
        service: "gamil",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: "billionlove.kr@gmail.com", // generated ethereal user
          pass: "billionlove1005!", // generated ethereal password
        },
      });
      // send mail with defined transport object
      transporter.sendMail({
        from: '빌리온러브', // sender address
        to: member_id, // list of receivers
        subject: "[빌리온러브] 인증 관련 이메일입니다.", // Subject line
        text: "오른쪽의 숫자 6자리를 입력해주세요 : "+ authCode, // html body
      });
      req.session.authCode = authCode
      console.log(req.session.authCode)
      res.render("../../program/forgotPw/views/auth.ejs", 
      {
        hexy_member_code,
        member_id
      })
    } else {
      res.render("../../program/forgotPw/views/index.ejs", 
      {
        msg: '가입되어 있지않는 아이디입니다.'
      })
    }
  })
})

router.post("/auth", (req, res) => {
  post = req.body
  hexy_member_code = post.hexy_member_code
  member_id = post.member_id
  if(req.session.authCode == post.authCode){
    res.render("../../program/forgotPw/views/changePw.ejs", 
    { 
      hexy_member_code
    })
  } else {
    res.render("../../program/forgotPw/views/auth.ejs", 
    { 
      status : '인증번호가 일치하지 않습니다.',
      hexy_member_code,
      member_id
    })
  }
})

router.post("/changePw", (req, res) => {
  post = req.body
  hexy_member_code = post.hexy_member_code
  console.log(hexy_member_code)
  member_pw = post.member_pw
  db.query(`UPDATE hexy_member_account SET member_pw = ? WHERE hexy_member_code = ?`, [member_pw, hexy_member_code], (err) => {
    if(err) throw err
    res.redirect('/login') 
  })
})
module.exports = router;
