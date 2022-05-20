import { Router } from 'express'
import passport from 'passport'
import checkAuth from '../passport/checkAuth.js'
import __dirname from '../dirname.js'
import { login, register, logout, getUserData } from '../logica/auth.js'

const router = Router()

router.get('/', checkAuth, getUserData)
router.get('/login', (req, res) => res.sendFile('/public/login.html', {root: __dirname}))
router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' }), login)
router.get('/register', (req, res) => res.sendFile('/public/register.html', {root: __dirname}))
router.post('/register', register)
router.get('/logout', logout)
router.get('/profile', checkAuth, (req, res) => res.sendFile('/public/profile.html', {root: __dirname}))
router.get('/admin', (req, res) => res.sendFile('/public/admin.html', {root: __dirname}))

export default router