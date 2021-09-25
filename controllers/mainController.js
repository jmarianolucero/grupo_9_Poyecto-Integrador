const controller = {
    "home":(req,res)=>{
        res.render("home")
    },
    "cart":(req,res)=>{res.render("shopping-cart")
    }
}

module.exports = controller