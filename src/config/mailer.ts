import nodemailer from "nodemailer";

export class MailerConfig {

    private readonly _transporter: any;
    private readonly _EMAIL_PORT: number;
    private readonly _EMAIL_HOST: string;
    private readonly _EMAIL_SECURE: string;
    private readonly _EMAIL_USER: string;
    private readonly _EMAIL_PASS: string;

    constructor() {
        this._EMAIL_PORT = Number(process.env.EMAIL_PORT!);
        this._EMAIL_HOST = process.env.EMAIL_HOST!;
        this._EMAIL_SECURE = process.env.EMAIL_SECURE!;
        this._EMAIL_USER = process.env.EMAIL_USER!;
        this._EMAIL_PASS = process.env.EMAIL_PASS!;

        this._transporter = nodemailer.createTransport({
            host: this._EMAIL_HOST,
            port: this._EMAIL_PORT,
            secure: this._EMAIL_SECURE === 'true',
            auth: {
                user: this._EMAIL_USER,
                pass: this._EMAIL_PASS,
            },
        });
    }

    getTransporter() {
        return this._transporter;
    }
}