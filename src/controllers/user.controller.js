import {
  getUsers as getUsersService,
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "../services/user.services.js";

//Muestra todos los usuarios
export async function getUsers(req, res) {
  try {
    const users = await getUsersService();
    res.status(200).send({ status: "success", payload: users });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

// Registro fallido
export async function failureRegister(req, res, next) {
  res.status(400).json({ status: "error", message: "Falló el resgistro" });
}

//Crea un usuario
export async function createUser(req, res) {
  const { email, password, ...userData } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Email y password son obligatorios" });
  }
  try {
    const newUser = await createUserService({ email, password, ...userData });
    res.status(201).send({ status: "success", payload: newUser });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "No se pudo crear el usuario",
    });
  }
}

//Actualiza un usuario
export async function updateUser(req, res) {
  const { email, ...updates } = req.body;
  if (!email) {
    return res.status(400).send({ error: "El email es obligatorio" });
  }
  if (Object.keys(updates).length === 0) {
    return res.status(400).send({ error: "No hay datos para actualizar" });
  }
  try {
    const user = await updateUserService(email, updates);
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
      message: "No se pudo actualizar el usuario",
    });
  }
}

//Elimina un usuario
export async function deleteUser(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ error: "El email es obligatorio" });
  }
  try {
    const user = await deleteUserService(email);
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
      message: "No se pudo eliminar el usuario",
    });
  }
}

export function allRoutes(req, res) {
  res.status(404).send("La ruta no se encuentra");
}
