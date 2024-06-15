const express = require('express')
const router = express.Router()
const db = require('../db-config')


router.get("/", (req,res) =>{
    const sql = `SELECT * FROM companiescourses`;
    db.all(sql, [], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.get("/companies/:id", (req,res) =>{
    const sql = `SELECT * FROM companiescourses WHERE idcompany = ?`;
    db.all(sql, [req.params.idCompany], (err, result)=>{
        if(err) throw err;
        res.send(result[0]);
    });
});

router.get("/courses/:id", (req,res) =>{
    const sql = `SELECT * FROM companiescourses WHERE idcourse = ?`;
    db.all(sql, [req.params.idCourse], (err, result)=>{
        if(err) throw err;
        res.send(result[0]);
    });
});

router.post("/", (req,res) =>{
    const sql = `INSERT companiescourses(idcompany, idcourse) VALUES(?, ?)`;
    db.all(sql, [req.body.idCompany, req.body.idCourse], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.delete("/:id", (req,res) =>{
    const sql = `DELETE FROM companiescourses WHERE id = ?`;
    db.all(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

module.exports = router;