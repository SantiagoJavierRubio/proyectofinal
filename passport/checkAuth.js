const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  if(req.user.email === 'admin@admin') req.isAdmin = true;
  next();
};

export default checkAuth;
