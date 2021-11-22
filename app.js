const express = require("express");
const app = express();
const methodOverride =  require('method-override'); // Métodos PUT y DELETE
const routesMain = require("./routers/main")
const routesProduct = require('./routers/products')
const routesUser = require('./routers/users')
const cookies = require('cookie-parser');
const session = require("express-session");
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// Middlewares
app.use(session({
    secret:"its a secret",
    resave:false,
    saveUninitialized:false
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookies());
app.use(express.static('public'));
app.use(methodOverride('_method')); 
app.use(express.json());
app.use(userLoggedMiddleware);
app.set("view engine", "ejs");


app.listen(process.env.PORT || 3000,()=>{console.log("server iniciado")});

//Routes
app.use("/",routesMain);
app.use("/products",routesProduct);
app.use("/users",routesUser);
