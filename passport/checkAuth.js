const checkAuth = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}

export default checkAuth