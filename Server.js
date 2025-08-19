const express = require('express');
const cors = require('cors');
const mysql=require('mysql2');
const app = express();

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Karthik@25',
    database : 'todolist'
})

app.use(cors());
app.use(express.json());

db.connect((err)=>{
    if(err){
        console.log("Database is not connected");
    }
    else {
        console.log("Database is connected");
    }
})

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.get('/',(req,res)=>{
    db.query(`Select * from todoitems`,(err,result)=>{
        if(err){
            console.log("Data is not fetched");
        }
        else{
            console.log(result);
            console.log("Data is Fetched");
        }
        res.send(result);
    })
})

app.post('/add-item',(req,res)=>{
    console.log(req.body);
    db.query(`insert into todoitems(task) values('${req.body.text}')`,(err,values)=>{
        if(err){
            console.log("Data is not uploaded");
        }
        else{
            console.log("Uploaded");
            console.log(values);
        }
    })
    res.send('Hello Posting')
})

app.put('/edit-item',(req,res)=>{
    console.log("Line 54 : ", req.body);
    res.send(req.body);
    db.query(`update todoitems set task=('${req.body.task}') where Id=('${req.body.id}')`,(err,values)=>{
        if(err){
            console.log("Data is not updated");
        }
        else{
            console.log("Updated");
        }
    })
})

app.listen(3000,(err)=>{
    if(err){
        console.log(err);
        console.log("Server is not running...");
    }
    console.log("Server is running...");
})