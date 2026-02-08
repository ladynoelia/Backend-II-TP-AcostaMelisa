import { createHash, generateToken, isValidPassword } from "../utils.js";
import { UserDTO } from "../models/dto/user.dto.js";
import { getUserByEmail, updateUser } from "../services/user.services.js";
import jwt from "jsonwebtoken";
import { env } from "../config/environment.js";
import {
  sendRecoveywordMail,
  sendWelcomeMail,
} from "../services/mailing.services.js";

const userDto = new UserDTO();

export async function loginUser(req, res) {
  if (!req.user) {
    return res.status(400).send({
      status: "error",
      message: "No se encontró el usuario solicitado",
    });
  }
  const token = generateToken(req.user);
  res.cookie("jwt", token, { httpOnly: true }).redirect("/profile");
}

export async function registerUser(req, res) {
  try {
    await sendWelcomeMail(req.user.email);
    res.status(200).send({
      status: "success",
      message: "Bienvenid@! Se envió en mensaje al email registrado",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function currentUser(req, res) {
  try {
    const userData = userDto.setSessionUserData(req.user);
    res.status(200).send({ status: "success", payload: userData });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "No se pudo obtener al usuario actual",
    });
  }
}

export async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).send({
        status: "error",
        message: "No se encontró el usuario solicitado",
      });
    }

    const token = jwt.sign({ email: user.email }, env.JWT_RESET_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = `http://localhost:8080/reset-password?token=${token}`;

    //Nodemailer
    await sendRecoveywordMail(user.email, resetLink);

    res.status(200).send({
      status: "success",
      message: "Se enviarion instrucciones via mail",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "No se pudo realizar la operación",
    });
  }
}

export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;
    if (!token) {
      return res.status(400).send({
        status: "error",
        message: "Falta el Token",
      });
    }
    const payload = jwt.verify(token, env.JWT_RESET_SECRET);

    const user = await getUserByEmail(payload.email);
    if (!user) {
      return res.status(400).send({
        status: "error",
        message: "No se encontró al usuario",
      });
    }

    if (isValidPassword(newPassword, user.password)) {
      return res.status(400).send({
        status: "error",
        message: "La nueva contraseña no puede ser igual a la anterior",
      });
    }

    const newSecuredPassword = createHash(newPassword);
    await updateUser(user.email, { password: newSecuredPassword });

    return res.status(200).send({
      status: "success",
      message: "Contraseña actualizada",
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error,
    });
  }
}
