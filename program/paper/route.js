const express = require('express')
const router = express.Router()
const db = require('../../assets/lib/db')
const qr = require('qrcode')


router.get("/", (req, res, next) => {
  res.render("../../program/paper/views/index.ejs")
})

router.post("/process", async (req, res) => {
  let temperature = req.body.temperature 
  let symtom = req.body.symtom
  if (symtom == undefined) symtom = '아니오'
  let etc_symtom = req.body.etc_symtom
  if (etc_symtom == undefined) etc_symtom = '아니오'
  let covid = req.body.covid
  if (covid == undefined) covid = '아니오'
  let country = req.body.country
  if (country == undefined) country = '아니오'
  let entry_date = req.body.entry_date
  if (entry_date == undefined) entry_date = '아니오'
  let contact = req.body.contact
  if (contact == undefined) contact = '아니오'
  let name = req.body.name
  let phone = req.body.phone
  
  let now = new Date();	// 현재 날짜 및 시간
  let year = now.getFullYear();	// 연도
  let month = now.getMonth();	// 월
  let day = now.getDate();	// 일
  date = `${year}-${month}-${day}`

  db.query(`
    iNSERT INTO paper
      (temperature, symtom, etc_symtom, covid, country, entry_date, contact, name, phone, date) values
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [temperature, symtom, etc_symtom, covid, country, entry_date, contact, name, phone, date], (err) => {
      if (err) throw err
  })

  msg = temperature+'/'+symtom+'/'+etc_symtom+'/'+covid+'/'+country+'/'+entry_date+'/'+contact+'/'+name+'/'+phone
  
  url = await qr.toDataURL(msg)
  res.render("../../program/paper/views/qr.ejs", 
    {
      title : 'Express',
      dataUrl: url,
    }
  )
})



module.exports = router;
