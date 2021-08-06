const express = require('express')
const router = express.Router()
const db = require('../../assets/lib/db')
const xl = require('excel4node');
const fs = require('fs')
let wb = new xl.Workbook();
let ws = wb.addWorksheet('Sheet 1');
let style = wb.createStyle({
  font: {
    color: '#FF0800',
    size: 12,
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -',
});



router.get("/", (req, res) => {
fs.readdir("/home/hosting_users/billionlove/apps/billionlove_billionlove/excel", (err, filelist) => {
  let dateQuery,get
  get = req.query
  if(get.date) {
    dateQuery = `WHERE date = '${get.date}'`
  }
  
  db.query(`SELECT * FROM paper ${dateQuery} ORDER BY date desc`, (err, rows) => {
  db.query('SELECT date FROM paper GROUP BY date', (err, date) => { 
    
    res.render("../../program/excel/views/index.ejs",
      {
        rows,
        date,
        filelist,
        selected : get.date,
      }
    )
  })
  }) 
})
})

router.get("/del/:value", (req, res) => {
  params = req.params
  fs.unlink(`/home/hosting_users/billionlove/apps/billionlove_billionlove/excel${params.value}`, (err) => {
    if(err) throw err
  })

  fs.readdir("/home/hosting_users/billionlove/apps/billionlove_billionlove/excel", (err, filelist) => {
    let dateQuery,get
    get = req.query
  
    if(get.date) {
      dateQuery = `WHERE date = '${get.date}'`
    }

    db.query(`SELECT * FROM paper ${dateQuery} ORDER BY date desc`, (err, rows) => {
    db.query('SELECT date FROM paper GROUP BY date', (err, date) => { 
      res.redirect('/excel')
    })
    }) 
  })
  })


router.post('/process', (req, res) => {
fs.readdir("/home/hosting_users/billionlove/apps/billionlove_billionlove/excel/excel", (err, filelist) => {
  let dateQuery,post
  post = req.body
  if(post.date) {
    dateQuery = `WHERE date = '${post.date}'`
  }
  db.query(`SELECT * FROM paper ${dateQuery} `, (err, rows) => {
    ws.cell(1, 1)
      .string('체온')
    ws.cell(1, 2)
      .string('증상')
    ws.cell(1, 3)
      .string('기타 증상')
    ws.cell(1, 4)
      .string('확진 과거력')
    ws.cell(1, 5)
      .string('국가')
    ws.cell(1, 6)
      .string('입국일자')  
    ws.cell(1, 7)
      .string('접촉 여부')
    ws.cell(1, 8)
      .string('이름')  
    ws.cell(1, 9)
      .string('전화번호')
    ws.cell(1, 10)
      .string('날짜')
    let s = 2
    for(let i=0; i<rows.length; i++){
      
      ws.cell(s, 1)
        .string(rows[i].temperature)
      ws.cell(s, 2)
        .string(rows[i].symtom)
      ws.cell(s, 3)
        .string(rows[i].etc_symtom)
      ws.cell(s, 4)
        .string(rows[i].covid)
      ws.cell(s, 5)
        .string(rows[i].country)
      ws.cell(s, 6)
        .string(rows[i].entry_date)
      ws.cell(s, 7)
        .string(rows[i].contact)
      ws.cell(s, 8)
        .string(rows[i].name)
      ws.cell(s, 9)
        .string(rows[i].phone)
      ws.cell(s, 10)
        .string(rows[i].date)
      s++
    }
    
    let file_name
    if(post.date == '') {
      file_name = 'all'
    } else {
      file_name = post.date
    }

    wb.write(`/home/hosting_users/billionlove/apps/billionlove_billionlove/excel/${file_name}_${Math.random().toString(36).substr(2,11)}.xlsx`);
    })
  })
  res.redirect('/excel')
})






module.exports = router;
