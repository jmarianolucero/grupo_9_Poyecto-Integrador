const express = require("express");
const app = express();
const path = require("path");
const port = 3000

app.listen(port,()=>{console.log("server iniciado en el puerto N° "+port)});

app.get("/",(req,res)=>{
    res.sendFile(path.resolve("views/home.html"))
})

app.get("/register",(req,res)=>{
    res.sendFile(path.resolve("views/register.html"))
})