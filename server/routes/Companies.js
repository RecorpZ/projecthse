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

router.post("/getAcceptedCompanyByIdStudent", (req,res) =>{
    const sql = `SELECT name FROM StudentsCompanies
        JOIN Companies ON Companies.id = StudentsCompanies.idCompany
        WHERE idStudent = ? AND status = 3`;
    db.all(sql, [req.body.idStudent], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.post("/getCompaniesByIdStudent", (req,res) =>{
    const sql = `SELECT Companies.id, Companies.name FROM CompaniesCourses
        JOIN Companies ON Companies.id = CompaniesCourses.idCompany
        JOIN Students ON Students.idCourse = CompaniesCourses.idCourse
        WHERE Students.id = ? 
        AND NOT EXISTS(SELECT * FROM StudentsCompanies 
            WHERE StudentsCompanies.idStudent = Students.id AND StudentsCompanies.idCompany = Companies.id)`;
    db.all(sql, [req.body.idStudent], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

router.post("/getCompaniesStatusesByIdStudent", (req,res) =>{
    const sql = `SELECT Companies.id, Companies.name, StudentsCompanies.priority, StudentsCompanies.status FROM StudentsCompanies
        JOIN Companies ON Companies.id = StudentsCompanies.idCompany
        WHERE StudentsCompanies.idStudent = ? AND priority > 0
        ORDER BY priority ASC`;
    db.all(sql, [req.body.idStudent], (err, result)=>{
        if(err) throw err;
        res.send(result);
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


router.put("/setPriority", (req,res) =>{
    const sql = `UPDATE StudentsCompanies SET priority = ? WHERE idStudent = ? AND idCompany = ?`;
    db.all(sql, [req.body.priority, req.body.idStudent, req.body.idCompany], (err, result)=>{
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