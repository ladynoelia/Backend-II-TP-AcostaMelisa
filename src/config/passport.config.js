import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import { userModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import { Strategy } from "passport-github2";


export function initializePassport() {
    passport.use("register", new local({
        passReqToCallback: true,
        usernameField: "email",
        passwordField:"password",
        session: true
    },
        async (req, username, password, done ) => {
            try {
               password = createHash(password);
               const newUser = await userModel.create({...req.body, password});
               done(null, newUser); 
            } catch (error) {
                console.log(error.message)
            }
    }));
    
    passport.use("login", new local({
        usernameField: "email",
        passwordField:"password",
        session: true
    },
        async (username, password, done ) => {
            try {
               const user = await userModel.findOne({email: username });
               if (user){
                    if (isValidPassword(password, user.password)) {
                        done(null, user); 
                    }else{
                        done(null, false);
                    }
                }
            } catch (error) {
                console.log(error.message)
            }
    }));

    //Login con Github
    passport.use("github", new Strategy ({
        clientID:"",
        clientSecret:"",
        callbackURL:"http://localhost:3030/api/sessions/login"
    },
        async (accessToken, refreshToken, profile, done ) => {
            try {
                const { username } = profile;
                const user = await userModel.findOne({ username });
                if (!user ){
                    const newUser = await userModel.create({username});
                    done(null, newUser.toJSON());
                }else{
                    done(null, user.toJSON());
                }
            } catch (error) {
                console.log(error.message)
            }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id);
        done(null, user);
    });
};