const expressLayouts = require('express-ejs-layouts')
const express = require('express')
const app = express()
const path = require('path')
const loginRouter = require('./program/login/route')
const paperRouter = require('./program/paper/route')
const QRscanRouter = require('./program/QRscan/route')
const ExcelRouter = require('./program/excel/route')
const session = require('express-session');	//세션관리용 미들웨어

app.use(session({
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


app.use(express.static(path.join(__dirname,'/')));

// bodyparser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// html template ejs 및 ejs layouts
app.set('view engine', 'ejs') 
app.set('views', __dirname + '/components/layout')
app.set("layout extractScript", true)
app.use(expressLayouts)

app.get('/', (req, res) => {
  if(req.session.a) {
    res.render('../../program/home/views/index.ejs')
  } else {
    res.render('../../program/login/views/index.ejs')
  }
})

// login
app.use('/login', loginRouter)
// paper
app.use('/paper', paperRouter)
// QRsacn
app.use('/QRscan', QRscanRouter)
// excel
app.use('/excel', ExcelRouter)
app.listen(8001, () => {
  console.log(`Example app listening at http://localhost:8001`)
})