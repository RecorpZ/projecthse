const express = require('express')
const router = express.Router()
const db = require('../db-config')
const fs = require('fs')

router.get("/", (req,res) =>{
    fs.readFile('public/documents/uwu.jpg', function(err, data) {
        if (err) throw err // Fail if the file can't be read.
        // res.writeHead(200, {'Content-Type': 'image/jpeg'})
        res.send(data) // Send the file data to the browser.
      })
});

module.exports = router;
