import { Router } from "express";
import { userModel } from "../models/user.model.js";
import {createHash, isValidPassword} from "../utils.js";
import passport from "passport";

const sessionsRouter = Router();

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
sessionsRouter.post("/register", passport.authenticate("register", {failureRedirect: "/failure-register"}), async (req, res, next) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});
// Registro fallido
sessionsRouter.get("/failure-register", async (req, res, next) => {
  res.status(400).json({message: "Falló el resgistro"});
})

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
sessionsRouter.post("/login", passport.authenticate("login", {failureRedirect: "/failure-login"}), async (req, res, next) => {
  res.status(200).json({message: "Logueado éxitosamente"})
}); 


export default sessionsRouter;