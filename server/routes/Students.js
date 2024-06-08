const express = require('express')
const router = express.Router()
const db = require('../db-config')


router.get("/", (req,res) =>{
    const sql = `SELECT * FROM students`;
    db.all(sql, [], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.get("/:id", (req,res) =>{
    const sql = `SELECT * FROM students WHERE id = ?`;
    db.all(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        res.send(result[0]);
    });
});

router.post("/", (req,res) =>{
    const sql = `INSERT students(login, password, first_name, second_name, last_name, idcourse, owncompany) VALUES(?, ?, ?, ?, ?, ?, ?)`;
    db.all(sql, [req.body.login, req.body.password, req.body.first_name, req.body.second_name, req.body.last_name, req.body.idcourse, req.body.owncompany], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.put("/:id", (req,res) =>{
    const sql = `UPDATE students SET login = ?, password = ?, first_name = ?, second_name = ?, last_name = ?, idcourse = ?, owncompany = ? WHERE id = ?`;
    db.all(sql, [req.body.login, req.body.password, req.body.first_name, req.body.second_name, req.body.last_name, req.body.idcourse, req.body.owncompany, req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.delete("/:id", (req,res) =>{
    const sql = `DELETE FROM students WHERE id = ?`;
    db.all(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

module.exports = router;