const express = require("express")
const app = express()
const cors = require("cors")
const sqlite3 = require("sqlite3")
const bcrypt = require("bcrypt")
const axios = require("axios")
const saltRounds = 12;

app.use(cors())
app.use((req,res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.json({limit:'100mb'}))

let db = new sqlite3.Database("maindatabase.db" , (err) => {
    if (err) {
        console.error(err.message)
    }
    console.log("Connected to the access database")
})

app.post("/loginAcc", (req,res) =>{
    const {email,password} = req.body

    db.all(`select HashPass from Users where UserMail = '${email}' `, (err, rows)=>{
        if(err){
            throw err;
        }
        if (rows.length > 0)
        {
            if (bcrypt.compareSync(password,rows[0].HashPass))
            {
                res.send("AccountConfirmed");
                console.log("Профиль пользователя подтвержден");
                console.log(res)
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
            console.log(res)
        }
    } )
})

app.post("/regAcc", (req,res) =>{
    const {name, nickname,email,password} = req.body
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    db.all(`select * from Users where UserMail = '${email}'`, (err, rows)=>
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
        else
        {
            db.all(`INSERT INTO Users (UserMail, HashPass,UserName,UserNickname) VALUES ('${email}','${hashedPassword}','${name}','${nickname}'); `, (err, result)=>
            {               
                if(err)
                {
                    throw err;
                }
            })
        }       
    })  
})


app.listen(3001 , () => console.log("Listening at port 3001"))