const express = require('express')
const router = express.Router()
const db = require('../../assets/lib/db')
const qr = require('qrcode')


router.get("/:place", async (req, res, next) => {
  msg = `hello ${Date.now()}`
  url = await qr.toDataURL(msg)
  
  res.render("../../program/paper/views/index.ejs", 
    {
      title : 'Express',
      dataUrl: url,
    }
  )
})

module.exports = router;
