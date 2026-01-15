import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { createHash } from "../utils.js";

const usersRouter = Router();

//Muestra todos los usuarios
usersRouter.get("/get-users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({ status: "success", payload: users });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
    console.log("No se pudieron obtener los usuarios");
  }
});

// Registro fallido
usersRouter.get("/failure-register", async (req, res, next) => {
  res.status(400).json({ status: "error", message: "Falló el resgistro" });
});

//Crea un usuario
usersRouter.post("/register", async (req, res) => {
  const { first_name, last_name, age, email, password, role } = req.body;
  try {
    const newUser = await userModel.create({
      first_name,
      last_name,
      age,
      email,
      password: createHash(password),
      role,
    });
    res.status(201).send({ status: "success", payload: newUser });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
    console.log("No se pudo crear el usuario");
  }
});

//Actualiza un usuario
usersRouter.put("/update", async (req, res) => {
  const { email, first_name, age } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { email },
      { first_name, age }
    );
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no encontrado",
      });
    }
    res.status(200).send({ status: "success", payload: user });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
    console.log("No se pudo actualizar el usuario");
  }
});

//Elimina un usuario
usersRouter.delete("/delete", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).send({
        status: "error",
        message:
          "El usuario que desea eliminar no se encuenta en la base de datos",
      });
    }
    res.status(200).send({ status: "success", payload: user });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
    console.log("No se pudo eliminar el usuario");
  }
});
export default usersRouter;
