import { Router } from 'express'
import passport from 'passport'
import { login, register, logout } from '../logica/auth.js'

const router = Router()

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), login)
router.post('/register', register)
router.get('/logout', passport.authenticate('local', { failureRedirect: '/login' }), logout)

export default router