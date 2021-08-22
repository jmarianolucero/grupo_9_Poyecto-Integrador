const express = require("express");
const app = express();
const routesMain = require("./routers/main")
app.use(express.static('public'));
app.set("view engine", "ejs");


app.listen(process.env.PORT || 3000,()=>{console.log("server iniciado")});
app.use("/",routesMain);


