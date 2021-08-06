const express = require('express')
const router = express.Router()
const db = require('../../assets/lib/db')

router.get("/", (req, res) => {
  res.render("../../program/QRscan/views/index.ejs",{})
})

module.exports = router;
