const express = require('express')
const router = express.Router()
const db = require('../db-config')


router.get("/", (req,res) =>{
    const sql = `SELECT * FROM Documents`;
    db.all(sql, [], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.get("/:id", (req,res) =>{
    const sql = `SELECT * FROM documents WHERE id = ?`;
    db.all(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        res.send(result[0]);
    });
});

router.post("/", (req,res) =>{
    const sql = `INSERT documents(idstudent, resume_path, factory_card_path, contact_path, signed_contact_path) VALUES(?, ?, ?, ?, ?)`;
    db.all(sql, [req.body.idStudent, req.body.resume_path, req.body.factory_card_path, req.body.contact_path, req.body.signed_contact_path], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.put("/:id", (req,res) =>{
    const sql = `UPDATE documents SET idstudent = ?, resumepath = ?, factorycardpath = ?, contactpath = ?, signedcontactpath = ? WHERE id = ?`;
    db.all(sql, [req.body.idStudent, req.body.resume_path, req.body.factory_card_path, req.body.contact_path, req.body.signed_contact_path, req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.delete("/:id", (req,res) =>{
    const sql = `DELETE FROM documents WHERE id = ?`;
    db.all(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

module.exports = router;