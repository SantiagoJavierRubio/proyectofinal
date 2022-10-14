import { Router } from 'express';
import passport from 'passport';
import checkAuth from '../passport/checkAuth.js';
import {
  login,
  register,
  logout,
  getUserData,
  serveAdmin,
} from '../controladores/auth.js';
import 'dotenv/config';

const router = Router();

router.get('/', checkAuth, getUserData);
router.post(
  '/login',
  passport.authenticate('local'));
router.post('/register', register);
router.get('/logout', logout);

router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/register', (req, res) => {
  res.render('register');
});
router.get('/profile', checkAuth, (req, res) => {
  res.render('profile');
});
router.get('/admin', checkAuth, serveAdmin);

export default router;
