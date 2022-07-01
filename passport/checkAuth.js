const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ message: 'Usuario no logueado' });
  }
  if(req.user.email === 'admin@admin') req.isAdmin = true;
  next();
};

export default checkAuth;
