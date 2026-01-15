import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { userModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
//import { Strategy as GithubStrategy } from "passport-github2";

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
        try {
          const hashedPassword = createHash(password);
          const newUser = await userModel.create({
            ...req.body,
            password: hashedPassword,
          });
          done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
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
      }
    )
  );

  //Oauth con Github
  /* passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:3030/api/sessions/login",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { username } = profile;
          const user = await userModel.findOne({ username });
          if (!user) {
            const newUser = await userModel.create({ username });
            done(null, newUser.toJSON());
          } else {
            done(null, user.toJSON());
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    )
  ); */

  //JWT
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        //misma clave que en utils.js
        secretOrKey: "jwtdefuwafuwa",
      },
      async (payload, done) => {
        try {
          return done(null, payload);
        } catch (error) {
          return done(error);
        }
      }
    )
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
