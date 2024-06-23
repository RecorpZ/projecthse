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

router.get("/normal", (req,res) =>{
    console.log("SELECT normal SC")
    const sql = `WITH RankedCourses AS (
	SELECT SC.idStudent, SC.idCompany, SC.priority,
	row_number() OVER (PARTITION BY SC.idStudent ORDER BY SC.priority) AS rn
	FROM StudentsCompanies AS SC
    )
    SELECT s.id AS idStudent, first_name AS name, own_company AS ownCompany,
        max(CASE WHEN rc.rn = 1 THEN rc.idCompany END) AS Company1,
        max(CASE WHEN rc.rn = 1 THEN (SELECT name FROM Companies AS Com WHERE Com.id = rc.idCompany) END) AS Company1Name,
        max(CASE WHEN rc.rn = 1 THEN (SELECT status FROM StudentsCompanies AS SC WHERE SC.idCompany = rc.idCompany) END) AS Company1Status,
        max(CASE WHEN rc.rn = 2 THEN rc.idCompany END) AS Company2,
        max(CASE WHEN rc.rn = 2 THEN (SELECT name FROM Companies AS Com WHERE Com.id = rc.idCompany) END) AS Company2Name,
        max(CASE WHEN rc.rn = 2 THEN (SELECT status FROM StudentsCompanies AS SC WHERE SC.idCompany = rc.idCompany) END) AS Company2Status,
        max(CASE WHEN rc.rn = 3 THEN rc.idCompany END) AS Company3,
        max(CASE WHEN rc.rn = 3 THEN (SELECT name FROM Companies AS Com WHERE Com.id = rc.idCompany) END) AS Company3Name,
        max(CASE WHEN rc.rn = 3 THEN (SELECT status FROM StudentsCompanies AS SC WHERE SC.idCompany = rc.idCompany) END) AS Company3Status
    FROM Students AS s
    LEFT JOIN RankedCourses AS rc ON s.id = rc.idStudent
    GROUP BY s.id`;
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
    const sql = `INSERT INTO studentscompanies(idStudent, idCompany, priority, status) VALUES(?, ?, ?, 0)`;
    db.all(sql, [req.body.idStudent, req.body.idCompany, req.body.priority], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.put("/:idStudent/:idCompany", (req,res) =>{
    console.log("Update SC")
    console.log(req.body)
    const sql = `UPDATE studentscompanies SET idstudent = ?, idcompany = ?, priority = ?, status = ? WHERE idStudent = ? AND idCompany = ?`;
    db.all(sql, [req.body.idStudent, req.body.idCompany, req.body.priority, req.body.status, req.params.idStudent, req.params.idCompany], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.put("/setPriority/:idStudent", (req,res) =>{
    const sql = `UPDATE studentscompanies SET priority = ? WHERE idStudent = ?`;
    db.all(sql, [req.body.priority, req.params.idStudent], (err, result)=>{
        if(err) throw err;
        res.send();
    });
});

router.put("/setStatus/:idStudent", (req,res) =>{
    const sql = `UPDATE studentscompanies SET status = ? WHERE idStudent = ?`;
    db.all(sql, [req.body.status, req.params.idStudent], (err, result)=>{
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