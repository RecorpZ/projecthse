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

router.get("/normal", (req,res) =>{
    const sql = `SELECT idCompany, idCourse, Com.name AS CompName, contact, Cur.name AS CourseName, places
                FROM CompaniesCourses AS CC
                JOIN Companies AS Com ON CC.idCompany = Com.id
                JOIN Courses AS Cur ON CC.idCourse = Cur.id
                ORDER BY Com.name`;
    db.all(sql, [], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.get("/normal/:idCompany/:idCourse", (req,res) =>{
    console.log("SELECT normal ids")
    console.log([req.params.idCompany, req.params.idCourse])
    const sql = `SELECT idCompany, idCourse, Com.name AS CompName, contact, Cur.name AS CourseName, places
                FROM CompaniesCourses AS CC
                JOIN Companies AS Com ON CC.idCompany = Com.id
                JOIN Courses AS Cur ON CC.idCourse = Cur.id
                WHERE CC.idCompany = ? AND CC.idCourse = ?`;
    db.all(sql, [req.params.idCompany, req.params.idCourse], (err, result)=>{
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
    const sql = `INSERT INTO companiescourses (idcompany, idcourse) VALUES(?, ?)`;
    db.all(sql, [req.body.idCompany, req.body.idCourse], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.delete("/compcourse/:idCompany/:idCourse", (req,res) =>{
    console.log([req.params.idCompany, req.params.idCourse])
    const sql = `DELETE FROM companiescourses WHERE idcompany = ? AND idcourse = ?`;
    db.all(sql, [req.params.idCompany, req.params.idCourse], (err, result)=>{
        if(err) throw err;
        // res.send(result);
    });

    const sql1 = `DELETE FROM Companies WHERE id = ?`;
    db.all(sql1, [req.params.idCompany], (err, result)=>{
        if(err) throw err;
        // res.send(result);
    });

    // const sql2 = `DELETE FROM Courses WHERE id = ?`;
    // db.all(sql2, [req.params.idCourse], (err, result)=>{
    //     if(err) throw err;
    //     res.send(result);
    // });
});

module.exports = router;