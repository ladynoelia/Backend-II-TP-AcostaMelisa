import { Router } from "express";
import { userModel } from "../models/user.model.js";

const usersRouter = Router();

//Muestra todos los usuarios
usersRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send({ result: "success", payload: users });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
    console.log("No se pudieron obtener los usuarios");
  }
});

//Crea un usuario
usersRouter.post("/", async (req, res) => {
  const user = req.body;
  try {
    const users = await userModel.create(user);
    res.send({ result: "success", payload: users });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
    console.log("No se pudo crear el usuario");
  }
});

//Actualiza un usuario
usersRouter.put("/:uid", async (req, res) => {
  const uid = req.params.uid;
  const { first_name } = req.body;
  try {
    const users = await userModel.findOneAndUpdate({ uid }, { first_name });
    res.send({ result: "success", payload: users });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
    console.log("No se pudo actualizar el usuario");
  }
});

usersRouter.delete("/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const user = await userModel.findOneAndDelete({ uid });
    res.status(200).send({ result: "success", payload: user });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
    console.log("No se pudo eliminar el usuario");
  }
});
export default usersRouter;
