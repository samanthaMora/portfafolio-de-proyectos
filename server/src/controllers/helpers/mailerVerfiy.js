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

export const sendVerificationEmail = async (to, token) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Confirma tu correo | MyCodeStage",
    html: `
      <h2>Gracias por registrarte en MyCodeStage</h2>
      <p>Haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
      <a href="${verificationLink}" target="_blank">Verificar correo</a>
      <p>Este enlace expirará en 15 minutos.</p>
    `,
  };

  try {
    console.log("🧪 Debug correo:");
    console.log("Usuario:", process.env.EMAIL_USER);
    console.log("Contraseña (oculta):", process.env.EMAIL_PASS?.slice(0, 4) + "••••");
    console.log("Desde:", process.env.EMAIL_FROM);
    console.log("Para:", to);
    console.log("Token:", token);
    console.log("Link:", verificationLink);

    await transporter.sendMail(mailOptions);
    console.log("📨 Correo de verificación enviado a:", to);
  } catch (error) {
    console.error("❌ Error al enviar el correo de verificación:", error);
    throw new Error("No se pudo enviar el correo de verificación");
  }
};
