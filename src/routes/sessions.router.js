import { Router } from "express";
import passport from "passport";
import {
  currentUser,
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/sessions.controller.js";

const sessionsRouter = Router();

//Loguear un usuario
sessionsRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/login-failure",
  }),
  loginUser,
);

//Registra un usuario
sessionsRouter.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/failure-register",
  }),
  registerUser,
);

//Muestra el usuario activo
sessionsRouter.get(
  "/current",
  passport.authenticate("jwt", {
    session: false,
  }),
  currentUser,
);

//Solicita cambiar la contraseña
sessionsRouter.post("/forgot-password", forgotPassword);

//Resetea la contraseña
sessionsRouter.post("/reset-password", resetPassword);

export default sessionsRouter;
