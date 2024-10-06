
import dotenv from "dotenv";
import { MailerConfig } from "../../config/mailer";

dotenv.config();
const mailerConfig: MailerConfig = new MailerConfig();

export const sendPasswordResetEmail = async (to: string, token: string) => {
    const transporter = mailerConfig.getTransporter();
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
