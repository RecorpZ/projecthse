const express = require("express")
const app = express()
const cors = require("cors")
// const axios = require("axios")

app.use(cors());
app.use((req,res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.json({limit:'10mb'}));

// console.log('%c 34 23 12 23 ', 'color: #7fcd93');

// Routers
const userRouter = require('./routes/Users');
app.use('/user', userRouter);

app.listen(3001 , () => console.log("Listening at port 3001"));


// app.post("/loginAcc", (req,res) =>{
//     const {email,password} = req.body

//     db.all(`select HashPass from Users where UserMail = '${email}' `, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         if (rows.length > 0)
//         {
//             if (bcrypt.compareSync(password,rows[0].HashPass))
//             {
//                 res.send("AccountConfirmed");
//                 console.log("Профиль пользователя подтвержден");
//             }
//             else
//             {
//             res.send("WrongPass");
//             console.log("Неправильный пароль");
//             }
//         }
//         else
//         {
//             res.send("NOAccount");
//             console.log("Нет такого");
//         }
//     } )
// })

// app.post("/materiallist", (req,res) =>{
//     db.all(`select CursName from Studm `, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         if (rows.length > 0)
//         {
//          res.send(rows)
//         }
//         else
//         {

//         }
//     } )
// })



// app.post("/addplans", (req,res) =>{  
//     const {combined,tplanname} = req.body;
//     db.all(`insert into NPlans (PlanName) VALUES ('${tplanname}'); `, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         db.all(`select Id from NPlans where PlanName = '${tplanname}'; `, (err, rows)=>{
//             if(err){
//                 throw err;
//             }
//             if (rows.length > 0)
//             {
//              const PlanId = rows[0].Id

//              combined.forEach(par => {
//                 db.all(`INSERT INTO "Plan-sm" (PlanId,MatId,Module,Hours,Cost) VALUES ('${PlanId}','${par.Id}','${par.Module}','${par.TeachHours}','${par.CreditCost}'); `, (err, rows)=>{
//                     if(err){
//                         throw err;
//                     }
//                     else{
                        
//                     }
    
//                 })
//               });

//             }
//         })
//     } )
// })

// app.get("/matlist", (req,res) =>{
//     db.all(`select * from Studm `, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         if (rows.length > 0)
//         {
//          res.send(rows)
//         }

//     } )
// })

// app.get("/plannamelist", (req,res) =>{
//     db.all(`select * from NPlans `, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         if (rows.length > 0)
//         {
//          res.send(rows)
//         }

//     } )
// })

// app.get("/planelist", (req,res) =>{
//     db.all(`select * from "Plan-sm" `, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         if (rows.length > 0)
//         {
//          res.send(rows)
//         }

//     } )
// })

// app.post("/crusnameid", (req,res) =>{
//     const {cursname} = req.body
//     db.all(`select Id from Studm where CursName = '${cursname}' `, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         if (rows.length > 0)
//         {
//          res.send(rows)
//         }
//         else
//         {

//         }
//     } )
// })
// app.post("/editmat", (req,res) =>{
//     const {changeid,cursname, curscost,cursdur,curstime,require} = req.body
//     db.all(`update Studm SET Cursname ='${cursname}', CreditCost = '${curscost}', CoursDuration = '${cursdur}', TeachHours = '${curstime}' where Id = '${changeid}'`, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         else
//         {
//          res.send("good")

//          db.all(`delete from Matreq WHERE CursId= '${changeid}';`, (err, rows)=>{
//             if(err){
//                 throw err;
//             }
        
//             require.forEach(par => {
//                 db.all(`INSERT INTO Matreq (CursId,ReqId) VALUES ('${par.CursId}','${par.ReqId}'); `, (err, rows)=>{
//                     if(err){
//                         throw err;
//                     }
//                     else{
                        
//                     }
    
//                 })
//               });
        
//         })
         
//         }
//     } )
// })


// app.post("/reqnameid", (req,res) =>{
//     const {reqid} = req.body
//     db.all(`select Id from Studm where CursName = '${reqid}' `, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         if (rows.length > 0)
//         {
//          res.send(rows)
//         }
//         else
//         {

//         }
//     } )
// })

// app.get("/reqlist", (req,res) =>{
//     db.all(`select * from Matreq `, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         if (rows.length > 0)
//         {
//          res.send(rows)
//         }

//     } )
// })

// app.post("/getname", (req,res) =>{
//     const {email} = req.body
//     db.all(`select UserName from Users where UserMail = '${email}' `, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         if (rows.length > 0)
//         {
//             res.send(rows[0].UserName);
//         }

//     } )
// })

// app.post("/getnickname", (req,res) =>{
//     const {email} = req.body
//     db.all(`select UserNickname from Users where UserMail = '${email}' `, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//         if (rows.length > 0)
//         {
//             res.send(rows[0].UserNickname);
//         }

//     } )
// })

// app.post("/delete", (req,res) =>{
//     const {cursName} = req.body
//     db.all(`delete from Matreq WHERE CursId= '${cursName}';`, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//     })
//     db.all(`delete from Matreq WHERE ReqId= '${cursName}';`, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//     })
//     db.all(`delete from Studm WHERE Id= '${cursName}';`, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//     })
//     db.all(`delete from "Plan-sm" WHERE MatId= '${cursName}';`, (err, rows)=>{
//         if(err){
//             throw err;
//         }
//     })
// })

// app.post("/regAcc", (req,res) =>{
//     const {name, nickname,email,password} = req.body
//     const hashedPassword = bcrypt.hashSync(password, saltRounds);
//     db.all(`select * from Users where UserMail = '${email}'`, (err, rows)=>
//     { 
//         if(err)
//             {
//                 throw err;
//             }
//         if (rows.length > 0)
//         {
//             console.log('oshibka')
//             res.send("allmail")
//         }
//         else
//         {
//             db.all(`INSERT INTO Users (UserMail, HashPass,UserName,UserNickname) VALUES ('${email}','${hashedPassword}','${name}','${nickname}'); `, (err, result)=>
//             {               
//                 if(err)
//                 {
//                     throw err;
//                 }
//             })
//         }       
//     })  
// })

// app.post("/crmat", (req,res) =>{
//     const {cursname, curscost,cursdur,curstime} = req.body
//     db.all(`select * from Studm where Cursname = '${cursname}'`, (err, rows)=>
//     { 
//         if(err)
//             {
//                 throw err;
//             }
//         if (rows.length > 0)
//         {
//             res.send("already")
//         }
//         else
//         {
//             db.all(`INSERT INTO Studm (CursName, CreditCost,CoursDuration,TeachHours) VALUES ('${cursname}','${curscost}','${cursdur}','${curstime}'); `, (err, result)=>
//             {               
//                 if(err)
//                 {
//                     throw err;
//                 }
//                 else{
//                     res.send("sled")
//                 }
//             })
//         }
        
//     })  
// })

// app.post("/crreq", (req,res) =>{
//     const {cursid, reqid2} = req.body


//     db.all(`INSERT INTO Matreq (CursId, ReqId) VALUES ('${cursid}','${reqid2}'); `, (err, rows)=>
//     {
        
//         if(err)
//             {
//                 throw err;
//             }
        
//     })  
// })


