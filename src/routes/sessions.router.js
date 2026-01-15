import { Router } from "express";
import { generateToken } from "../utils.js";
import passport from "passport";

const sessionsRouter = Router();

// Link del formulario
//sessionsRouter.get("/github", passport.authenticate("github"));

//Loguear un usuario
sessionsRouter.post(
  "/login",
  passport.authenticate("login", { session: false, failureRedirect: "/login" }),
  //passport.authenticate("github", { session: false }),
  async (req, res, next) => {
    const token = generateToken(req.user);
    res.cookie("jwt", token, { httpOnly: true }).redirect("/profile");
  }
);

//Registrar un usuario
sessionsRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failure-register" }),
  async (req, res, next) => {
    try {
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }
);

export default sessionsRouter;
