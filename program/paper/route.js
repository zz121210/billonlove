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

  date = dt.getFullYear()+ '-' + dt.getMonth().toString().padStart(2,'0') + '-' + dt.getDate().toString().padStart(2,'0') + '-' + dt.getHours().toString().padStart(2,'0')+ '-' + dt.getMinutes().toString().padStart(2,'0')

  db.query(`
    iNSERT INTO paper
      (temperature, symtom, etc_symtom, covid, country, entry_date, contact, name, phone, date) values
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [temperature, symtom, etc_symtom, covid, country, entry_date, contact, name, phone, date], (err) => {
      if (err) throw err
  })

  msg = temperature+'/'+symtom+'/'+etc_symtom+'/'+covid+'/'+country+'/'+entry_date+'/'+contact+'/'+name+'/'+phone
  
  url = await qr.toDataURL(msg)
  res.render("../../program/paper/views/QR.ejs", 
    {
      title : 'Express',
      dataUrl: url,
    }
  )
})



module.exports = router;
