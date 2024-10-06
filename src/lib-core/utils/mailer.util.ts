import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendPasswordResetEmail = async (to: string, token: string) => {
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Restablecimiento de Contraseña',
        text: `Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para hacerlo: ${resetURL}`,
        html: `<p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para hacerlo:</p>
           <a href="${resetURL}">${resetURL}</a>`,
    };

    await transporter.sendMail(mailOptions);
};
