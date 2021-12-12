const { render } = require("ejs")

const authAdmin = function (req, res, next) {
    if (req.session.userLogged && req.session.userLogged.category == 'admin') {

    } else {
        return res.redirect('/')
    }
    next()
}

module.exports = authAdmin