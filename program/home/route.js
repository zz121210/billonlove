const express = require('express')
const router = express.Router()
const db = require('../../assets/lib/db')


router.get("/", (req, res) => {
  res.render("../../program/home/views/index.ejs")
})

module.exports = router;
