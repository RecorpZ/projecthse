const express = require('express')
const router = express.Router()
const db = require('../db-config')
const bcrypt = require("bcrypt")
const saltRounds = 12;

router.post("/login", (req,res) =>{
    const {login,password} = req.body

    db.all(`SELECT password_hash FROM Teachers WHERE login = '${login}' `, (err, rows)=>{
        if(err){
            throw err;
        }
        if (rows.length > 0)
        {
            if (bcrypt.compareSync(password,rows[0].password_hash))
            {
                res.send("AccountConfirmed");
                console.log("Профиль пользователя подтвержден");
            }
            else
            {
                res.send("WrongPass");
                console.log("Неправильный пароль");
            }
        }
        else
        {
            db.all(`SELECT password_hash FROM Students WHERE login = '${login}' `, (err, rows)=>{
                if(err){
                    throw err;
                }
                if (rows.length > 0)
                {
                    if (bcrypt.compareSync(password, rows[0].password_hash))
                    {
                        res.send("AccountConfirmed");
                        console.log("Профиль пользователя подтвержден");
                    }
                    else
                    {
                    res.send("WrongPass");
                    console.log("Неправильный пароль");
                    }
                }
                else
                {
                    res.send("NOAccount");
                    console.log("Нет такого");
                }
            } )
        }
    } )
});

router.post("/register", (req,res) =>{
    const {role, first_name, second_name, last_name, login, password, courseId} = req.body
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    db.all(`SELECT * FROM Teachers WHERE login = '${login}'`, (err, rows)=>
    { 
        if(err)
            {
                throw err;
            }
        if (rows.length > 0)
        {
            console.log('oshibka')
            res.send("allmail")
        }
    });
    db.all(`SELECT * FROM Students WHERE login = '${login}'`, (err, rows)=>
    { 
        if(err)
            {
                throw err;
            }
        if (rows.length > 0)
        {
            console.log('oshibka')
            res.send("allmail")
        }
    });
    if (role === "Teacher")
    {
        db.all(`INSERT INTO Teachers (first_name, second_name, last_name, login, password_hash) VALUES (?, ?, ?, ?, ?); `, [first_name, second_name, last_name, login, hashedPassword], (err, result)=>
        {               
            if(err)
            {
                throw err;
            }
        });
    }
    else{
        db.all(`INSERT INTO Students (first_name, second_name, last_name, login, password_hash, idCourse, own_company) VALUES (?, ?, ?, ?, ?, ?, 0); `, [first_name, second_name, last_name, login, hashedPassword, courseId], (err, result)=>
        {               
            if(err)
            {
                throw err;
            }
        })
    }
});

module.exports = router;