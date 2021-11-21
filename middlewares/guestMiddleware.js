function guestMiddleware(req, res, next) {
    if (req.session.userLogged){
        return res.redirect('/users/user')
    }
    next();
}

module.exports = guestMiddleware;