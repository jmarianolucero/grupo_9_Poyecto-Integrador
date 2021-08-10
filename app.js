const express = require("express");
const app = express();
const path = require("path");
const port = 3000

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.listen(port,()=>{console.log("server iniciado en el puerto N° "+port)});

app.get("/",(req,res)=>{
    res.sendFile(path.resolve("views/home.html"))
})

app.get("/register",(req,res)=>{
    res.sendFile(path.resolve("views/register.html"))
})
app.get('/product', (req, res)=> {
    res.sendFile(path.resolve(__dirname, './views/product.html'))
});
app.get('/cart', (req, res)=> {
    res.sendFile(path.resolve(__dirname, './views/shopping-cart.html'))
});
