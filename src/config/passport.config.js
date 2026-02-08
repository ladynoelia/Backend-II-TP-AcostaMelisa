import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { userModel } from "../models/user.model.js";
import { isValidPassword } from "../utils.js";
import { env } from "./environment.js";
import { createUser, getUserByEmail } from "../services/user.services.js";

export function initializePassport() {
  //Registro
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      async (req, username, password, done) => {
        const { email, ...userData } = req.body;
        try {
          const user = await getUserByEmail(email);
          if (user) {
            console.log("Ya existe el usuario");
            return done(null, false);
          }
          const newUser = { email, ...userData };
          const result = await createUser(newUser);

          done(null, result);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  //Login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            if (isValidPassword(password, user.password)) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  //JWT
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        //misma clave que en utils.js
        secretOrKey: env.JWT_KEY,
      },
      async (payload, done) => {
        try {
          return done(null, payload);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  //Funciones para usar con Sesiones
  /* passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = await userService.findById(id);
    done(null, user);
  }); */
}

function cookieExtractor(req) {
  if (req && req.cookies) {
    return req.cookies.jwt;
  }
}
