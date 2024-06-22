const express = require('express')
const router = express.Router()
const db = require('../db-config')
const multer = require('multer')
const path = require('path')


var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/documents/');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});


router.get("/", (req,res) =>{
    const sql = `SELECT * FROM Documents`;
    db.all(sql, [], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.get("/", (req,res) =>{
    const sql = `SELECT * FROM documents WHERE idStudent = ?`;
    db.all(sql, [req.body.idStudent], (err, result)=>{
        if(err) throw err;
        res.send(result[0]);
    });
});

router.get("/contractexists/:idStudent", (req,res) =>{
    const sql = `SELECT contract_path FROM documents WHERE idStudent = ?`;
    db.all(sql, [req.params.idStudent], (err, result)=>{
        if(err) throw err;
        res.send(result[0].contract_path != null);
    });
});

router.post("/", (req,res) =>{
    console.log(req.body)
    const sql = `INSERT INTO documents (idStudent) VALUES (?)`;
    db.all(sql, [req.body.idStudent], (err, result)=>{
        if(err) 
        {
            console.log(err);
            throw err;
        }
        console.log(result);
        res.send(result);
    });
});

// router.put("/:id", (req,res) =>{
//     const sql = `UPDATE documents SET idstudent = ?, resumepath = ?, factorycardpath = ?, contactpath = ?, signedcontactpath = ? WHERE id = ?`;
//     db.all(sql, [req.body.idStudent, req.body.resume_path, req.body.factory_card_path, req.body.contact_path, req.body.signed_contact_path, req.params.id], (err, result)=>{
//         if(err) throw err;
//         res.send();
//     });
// });

router.put("/resumepath/:id", upload.single("file"), (req,res) =>{
    if (!req.file) 
    {
        console.log("No file upload");
        res.send("NoFile");
    }
    var file_path = req.file.filename;
    const sql = `UPDATE documents SET resume_path = ? WHERE idStudent = ?`;
    db.all(sql, [file_path, req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.put("/factorycardpath/:id", upload.single("file"), (req,res) =>{
    if (!req.file) 
    {
        console.log("No file upload");
        res.send("NoFile");
    }
    else
    {
        var file_path = req.file.filename;
        const sql = `UPDATE documents SET factory_card_path = ? WHERE idStudent = ?`;
        db.all(sql, [file_path, req.params.id], (err, result)=>{
            if(err) throw err;
            res.send();
        });
    }
});

router.put("/contractpath/:id", upload.single("file"), (req,res) =>{
    if (!req.file) 
    {
        console.log("No file upload");
        res.send("NoFile");
    }
    var file_path = req.file.filename;
    const sql = `UPDATE documents SET contract_path = ? WHERE idStudent = ?`;
    db.all(sql, [file_path, req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.put("/signedcontractpath/:id", upload.single("file"), (req,res) =>{
    if (!req.file) 
    {
        console.log("No file upload");
        res.send("NoFile");
    }
    var file_path = req.file.filename;
    const sql = `UPDATE documents SET signed_contract_path = ? WHERE idStudent = ?`;
    db.all(sql, [file_path, req.params.id], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.delete("/", (req,res) =>{
    const sql = `DELETE FROM documents WHERE idStudent = ?`;
    db.all(sql, [req.body.idStudent], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

module.exports = router;