const express = require('express')
const router = express.Router()
const db = require('../../assets/lib/db')
const qr = require('qrcode')
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

nl2br = (str) => {  
  return str.replace(/\n/g, "<br />");  
}   


router.get("/", (req, res) => {
  res.render("../../program/paper/views/index.ejs")
})

router.get("/security_pledge", (req, res) => {
  get = req.query
  member_id = get.member_id
  db.query(`SELECT * FROM security_pledge WHERE member_id = ? `, [member_id], (err, row) => {
    description = row[0].description 
  
    res.render("../../program/paper/views/security_pledge.ejs", {
      description : nl2br(description)
    })
  })
})

router.get("/security", (req, res) => {
  get = req.query
  member_id = get.member_id
  db.query(`SELECT * FROM security_pledge WHERE member_id = ? `, [member_id], (err, row) => {
    description = row[0].description 
  
    res.render("../../program/paper/views/security.ejs", {
      description : nl2br(description)
    })
  })
})



router.get("/security_pledge_update", (req, res) => {
  if(!req.session.member) {
    res.redirect('/')
  }
  member_id = req.session.member.member_id
  db.query(`SELECT * FROM security_pledge WHERE member_id = ? `, [member_id], (err, row) => {
    description = row[0].description
    res.render("../../program/paper/views/security_pledge_update.ejs", {
      description : description,
      member_id
    })
  })
})


router.post('/update', (req, res) => {
  post = req.body
  description = post.description
  member_id = post.member_id
  db.query(`UPDATE security_pledge SET description = ? WHERE member_id = ?`,[description, member_id], (err) => {if(err) throw err})
  res.redirect('/paper/security_pledge_update')
})

router.post("/process", async (req, res) => {
  let temperature = req.body.temperature 
  let symtom = req.body.symtom
  if (symtom == undefined) symtom = '없음'
  let etc_symtom = req.body.etc_symtom
  if (etc_symtom == undefined) etc_symtom = '없음'
  let covid = req.body.covid
  if (covid == undefined) covid = '없음'
  let country = req.body.country
  if (country == undefined) country = '없음'
  let entry_date = req.body.entry_date
  if (entry_date == undefined) entry_date = '없음'
  let contact = req.body.contact
  if (contact == undefined) contact = '없음'
  let name = req.body.name
  let phone = req.body.phone
  let dt = new Date();
  date = dt.getFullYear()+ '-' + (dt.getMonth()+1).toString().padStart(2,'0') + '-' + dt.getDate().toString().padStart(2,'0') + '-' + dt.getHours().toString().padStart(2,'0')+ '-' + dt.getMinutes().toString().padStart(2,'0')

  msg = temperature+'/'+symtom+'/'+etc_symtom+'/'+covid+'/'+country+'/'+entry_date+'/'+contact+'/'+name+'/'+phone+'/'+date
  
  url = await qr.toDataURL(msg)
  res.render("../../program/paper/views/QR.ejs", 
    {
      title : 'Express',
      dataUrl: url,
    }
  )
})



module.exports = router;
