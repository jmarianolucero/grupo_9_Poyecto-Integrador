const controller = {
    "home":(req,res)=>{
        res.render("home")
    },
    "login":(req,res)=>{
        res.render("login")
    },
    
    "register":(req,res)=>{
        res.render("register")},
    "cart":(req,res)=>{res.render("shopping-cart")
    },
    "newProduct": (req, res)=>{
        res.render("new-product")
    }
}

module.exports = controller