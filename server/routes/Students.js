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

router.get("/getStep/:id", (req,res) =>{
    const sql = `SELECT step FROM students WHERE id = ?`;
    db.all(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        res.send(result[0]);
    });
});

router.post("/", (req,res) =>{
    const sql = `INSERT students(login, password, first_name, second_name, last_name, idcourse, own_company) VALUES(?, ?, ?, ?, ?, ?, ?)`;
    db.all(sql, [req.body.login, req.body.password, req.body.first_name, req.body.second_name, req.body.last_name, req.body.idcourse, req.body.owncompany], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.put("/setOwnCompany/:id", (req,res) =>{
    const sql = `UPDATE students SET own_company = ? WHERE id = ?`;
    db.all(sql, [req.body.hasCompany, req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.put("/setStep/:id", (req,res) =>{
    const sql = `UPDATE students SET step = ? WHERE id = ?`;
    db.all(sql, [req.body.step, req.params.id], (err, result)=>{
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