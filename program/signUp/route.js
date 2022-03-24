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
  // res.render("../../program/signUp/views/index.ejs")
  res.render("../../program/login/views/index.ejs") // 의뢰인 요청으로 인한 회원가입 기능 일시 제한
})

router.post("/process", (req, res) => {
  post = req.body
  member_id = post.member_id
  member_pw = post.member_pw
  member_name = post.member_name
  member_address = post.member_address1+' '+post.member_address2+' '+post.member_address3+ ' '+post.member_address4
  member_phone = post.member_phone
  db.query(`SELECT * FROM hexy_member_account WHERE member_id = ?`,[member_id], (err, row) => {
    if(row[0]) {
      res.render("../../program/signUp/views/index.ejs", 
        { 
          emailMsg : '이미 사용중인 아이디(이메일) 입니다.',
          member_id
        }
      )
    } else {
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
      res.render("../../program/signUp/views/auth.ejs", 
        {
          member_id,
          member_pw,
          member_name,
          member_address,
          member_phone
        }
      )
    }
  })
})

router.post('/auth', (req, res) => {
  post = req.body
  console.log('인증번호 : '+req.session.authCode)
  member_id = post.member_id
  member_pw = post.member_pw
  member_name = post.member_name
  member_address = post.member_address
  member_phone = post.member_phone
  if(req.session.authCode == post.authCode) {
    db.query(`
      INSERT INTO hexy_member_account
        (member_id, member_pw) VALUES
        (?, ?)`, [member_id, member_pw], (err) => {
        if(err) throw err
    })
    
    db.query(`
      SELECT hexy_member_code FROM hexy_member_account WHERE member_id = ? AND member_pw = ?
    `,[member_id, member_pw], (err, row) => {
      hexy_member_code = row[0].hexy_member_code

      db.query(`
        INSERT INTO hexy_member_info
          (hexy_member_code, member_name, member_address, member_phone) VALUES
          (?, ?, ?, ?)`, [hexy_member_code, member_name, member_address, member_phone], (err) => {
            if(err) throw err
      })
    })

    db.query(`
      INSERT INTO security_pledge
        (member_id, description) VALUES
        (?, ?)`, [member_id, '내용을 입력하세요.'], (err) => {
          if(err) throw err
        })
  } else {
    res.render("../../program/signUp/views/auth.ejs", 
      {
        member_id,
        member_pw,
        member_name,
        member_address,
        member_phone,
        status : '인증번호가 일치하지 않습니다.'
      }
    )
  }
  res.redirect('/login')
})

module.exports = router;
