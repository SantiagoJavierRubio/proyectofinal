import passport from 'passport';
import * as passportLocal from 'passport-local';
import { getUsuariosDAO } from '../persistencia/factories/usuariosDAO.factory.js';

const usuarios = getUsuariosDAO();

const LocalStrategy = passportLocal.Strategy;

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (username, password, done) => {
      try {
        const user = await usuarios.checkCredentials(username, password);
        if (!user) return done(null, null);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await usuarios.getById(id, '-password');
  if (user.error) return done(user.error);
  return done(null, user);
});
