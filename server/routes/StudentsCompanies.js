const express = require('express')
const router = express.Router()
const db = require('../db-config')


router.get("/", (req,res) =>{
    const sql = `SELECT * FROM studentscompanies`;
    db.all(sql, [], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.get("/companies/:id", (req,res) =>{
    const sql = `SELECT * FROM studentscompanies WHERE idcompany = ?`;
    db.all(sql, [req.params.idCompany], (err, result)=>{
        if(err) throw err;
        res.send(result[0]);
    });
});

router.get("/students/:id", (req,res) =>{
    const sql = `SELECT * FROM studentscompanies WHERE idstudent = ?`;
    db.all(sql, [req.params.idCourse], (err, result)=>{
        if(err) throw err;
        res.send(result[0]);
    });
});

router.post("/", (req,res) =>{
    const sql = `INSERT studentscompanies(idstudent, idcompany, priority, status) VALUES(?, ?, ?, ?)`;
    db.all(sql, [req.body.idStudent, req.body.idCompany, req.body.priority, req.body.status], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.put("/:id", (req,res) =>{
    const sql = `UPDATE studentscompanies SET idstudent = ?, idcompany = ?, priority = ?, status = ? WHERE id = ?`;
    db.all(sql, [req.body.idStudent, req.body.idCompany, req.body.priority, req.body.status, req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.delete("/:id", (req,res) =>{
    const sql = `DELETE FROM studentscompanies WHERE id = ?`;
    db.all(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

module.exports = router;