import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendRecoveryEmail = async (to, token) => {
  const recoveryLink = `http://localhost:5173/reset-password/${token}`; // Enlace al frontend

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Recupera tu contraseña | MyCodeStage",
    html: `
      <h2>¿Olvidaste tu contraseña?</h2>
      <p>Haz clic en el siguiente enlace para restablecerla:</p>
      <a href="${recoveryLink}" target="_blank">Recuperar contraseña</a>
      <p>Este enlace expirará en 15 minutos.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de recuperación enviado a:", to);
  } catch (error) {
    console.error("Error al enviar correo de recuperación:", error);
    throw new Error("No se pudo enviar el correo de recuperación");
  }
};
