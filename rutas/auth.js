import { Router } from 'express'
import passport from 'passport'
import checkAuth from '../passport/checkAuth.js'
import { login, register, logout, getUserData } from '../logica/auth.js'

const router = Router()

router.get('/', checkAuth, getUserData)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), login)
router.post('/register', register)
router.get('/logout', logout)

export default router