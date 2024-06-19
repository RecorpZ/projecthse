const express = require('express')
const router = express.Router()
const db = require('../db-config')


router.get("/", (req,res) =>{
    const sql = `SELECT * FROM Courses`;
    db.all(sql, [], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.get("/last", (req,res) =>{
    const sql = `SELECT last_insert_rowid()`;
    db.all(sql, [], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.get("/:id", (req,res) =>{
    const sql = `SELECT * FROM Courses WHERE id = ?`;
    db.all(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        res.send(result[0]);
    });
});

router.post("/", (req,res) =>{
    const sql = `INSERT INTO Courses (name) VALUES(?)`;
    db.all(sql, [req.body.name], (err, result)=>{
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
    const sql = `UPDATE Courses SET name = ? WHERE id = ?`;
    db.all(sql, [req.body.name, req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.delete("/:id", (req,res) =>{
    const sql = `DELETE FROM courses WHERE id = ?`;
    db.all(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.delete("/clearNews", (req,res) =>{
    const sql = `DELETE FROM Сourses WHERE name = 'new'`;
    db.all(sql, (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

module.exports = router;