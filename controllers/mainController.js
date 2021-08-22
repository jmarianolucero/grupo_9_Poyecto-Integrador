const controller = {
    "home":(req,res)=>{
        res.render("home")
    },
    "login":(req,res)=>{
        res.render("login")
    },
    "product":(req,res)=>{
        res.render("product")
    },
    "register":(req,res)=>{
        res.render("register")},
    "cart":(req,res)=>{res.render("shopping-cart")}
}

module.exports = controller