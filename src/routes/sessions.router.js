import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { generateToken, createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const sessionsRouter = Router();

// Link del formulario
//sessionsRouter.get("/github", passport.authenticate("github"));

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
/* sessionsRouter.post("/register", passport.authenticate("register", {failureRedirect: "/failure-register"}), async (req, res, next) => {
    const {first_name, last_name, age, email, password} = req.body;
    try {
      const user = await userModel.create({first_name, last_name, age, email, password: createHash(password)});
      res.send({ result: "success", payload: user });
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: error.message,
      });
    }
}); */
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

//Loguear un usuario
/* sessionsRouter.post("/login", async (req, res, next) => {
    const {email, password} = req.body;
    try {
      const user = await userModel.findOne({email});
      if (isValidPassword(password, user.password)) {
        //req.session.user = user;
        res.status(200).redirect("/profile");
      }else{
        res.status(403).json({message: "Falló el login. Verificar usuario y/o contraseña."})
        console.log("No se encontró el usuario");
      }
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: error.message,
      });   
    }
}); */
/* sessionsRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failure-login" }),
  async (req, res, next) => {
    res.status(200).json({ message: "Logueado éxitosamente" });
  }
); */

export default sessionsRouter;
