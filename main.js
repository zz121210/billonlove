//모듈
const expressLayouts = require('express-ejs-layouts')
const express = require('express')
const app = express()
const path = require('path')
const db = require('./assets/lib/db')

// 라우터

const loginRouter = require('./program/login/route')
const paperRouter = require('./program/paper/route')
const QRscanRouter = require('./program/QRscan/route')

//정적 파일을 사용하기위한 세팅
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
  res.render('../../program/home/views/index.ejs')
})

// login
app.use('/login', loginRouter)
// paper
app.use('/paper', paperRouter)
// QRsacn
app.use('/QRscan', QRscanRouter)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})