const express = require('express')
const router = express.Router()
const db = require('../db-config')


router.get("/", (req,res) =>{
    const sql = `SELECT * FROM Companies`;
    db.all(sql, [], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.get("/:id", (req,res) =>{
    const sql = `SELECT * FROM companies WHERE id = ?`;
    db.all(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        res.send(result[0]);
    });
});

router.post("/", (req,res) =>{
    const sql = `INSERT INTO companies (name, contact, places) VALUES(?, ?, ?)`;
    db.all(sql, [req.body.name, req.body.contacts, req.body.places], (err, result)=>{
        if(err) throw err;
        // res.send();
    });
    const sql1 = `SELECT last_insert_rowid()`;
    db.all(sql1, [], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.put("/:id", (req,res) =>{
    const sql = `UPDATE companies SET name = ?, contact = ?, places = ? WHERE id = ?`;
    db.all(sql, [req.body.name, req.body.contacts, req.body.places, req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.delete("/:id", (req,res) =>{
    const sql = `DELETE FROM companies WHERE id = ?`;
    db.all(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

module.exports = router;