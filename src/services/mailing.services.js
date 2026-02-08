import { env } from "../config/environment.js";
import { transporter } from "../config/mailing.js";

export async function sendWelcomeMail(email) {
  await transporter.sendMail({
    from: env.MAILING_USER,
    to: email,
    subject: "Registro exitoso!",
    html: `
    <div>
      <h3>Bienvenido a Fuwafuwa Paradise</h3>
      <hr />
      <p>¡Estamos encantados de hayas unido a nuestra comunidad!</p>
      <p>Te esperan un montón de cosas lindas por eso queremos darte un 20% de descuento en tu primera compra con el código: WELCOME20</p>
      <p>Saludos!</p>
      <p>El equipo de Fuwafuwa Paradise</p>
      <hr />
    </div>
    `,
  });
}

export async function sendRecoveywordMail(email, resetLink) {
  await transporter.sendMail({
    from: env.MAILING_USER,
    to: email,
    subject: "Recuperación de contraseña - Backend II Proyect",
    html: `
      <div>
        <h3>Restablecer la Contraseña</h3>
        <hr />
        <p>Estimado usuario:</p>
        <p>Para restablecer su contraseña ingrese en el siguiente link</p>
        <a href="${resetLink}">Restablecer contraseña</a>        
        <p>Saludos!</p>
        <hr />      
      </div>
    `,
  });
}
