import { Router } from "express";
import {
  getUsers,
  failureRegister,
  createUser,
  updateUser,
  deleteUser,
  allRoutes,
} from "../controllers/user.controller.js";

const usersRouter = Router();

//Muestra todos los usuarios
usersRouter.get("/get-users", getUsers);

// Registro fallido
usersRouter.get("/failure-register", failureRegister);

//Crea un usuario
usersRouter.post("/register", createUser);

//Actualiza un usuario
usersRouter.put("/update", updateUser);

//Elimina un usuario
usersRouter.delete("/delete", deleteUser);

usersRouter.use(allRoutes);

export default usersRouter;
