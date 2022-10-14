const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  next();
};

export default checkAuth;
