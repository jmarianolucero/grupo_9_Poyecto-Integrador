const express = require("express");
const app = express();
const path = require("path");
app.use(express.static('public'));

app.listen(process.env.PORT || 3000,()=>{console.log("server iniciado")});

app.get("/",(req,res)=>{
    res.sendFile(path.resolve("views/home.html"))
})

app.get("/register",(req,res)=>{
    res.sendFile(path.resolve("views/register.html"))
})
app.get('/product', (req, res)=> {
    res.sendFile(path.resolve(__dirname, './views/product.html'))
});
app.get('/carrito', (req, res)=> {
    res.sendFile(path.resolve(__dirname, './views/shopping-cart.html'))
});
