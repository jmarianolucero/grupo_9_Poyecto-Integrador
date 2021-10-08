const express = require("express");
const app = express();
const methodOverride =  require('method-override'); // Métodos PUT y DELETE
const routesMain = require("./routers/main")
const routesProduct = require('./routers/products')
const routesUser = require('./routers/users')


const session = require("express-session");


app.use(session({
    secret:"its a secret",
    resave:false,
    saveUninitialized:false
}));

 
app.use(express.static('public'));
app.set("view engine", "ejs");


app.listen(process.env.PORT || 3000,()=>{console.log("server iniciado")});
app.use(methodOverride('_method')); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/",routesMain);
app.use("/products",routesProduct);
app.use("/users",routesUser);
