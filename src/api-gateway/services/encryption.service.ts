import * as CryptoJS from 'crypto-js';

export class EncryptionService {

    private readonly key!: string;
    private readonly keySize = 256;
    private readonly ivSize = 128;
    private readonly iterations = 1000;

    constructor() {
        this.key = process.env.SECRET_KEY!;
    }

    encrypt(plainText: string): string {
        const salt = CryptoJS.lib.WordArray.random(16);
        const iv = CryptoJS.lib.WordArray.random(16);

        const key = CryptoJS.PBKDF2(this.key, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        const encrypted = CryptoJS.AES.encrypt(plainText, key, { iv: iv }).toString();
        const saltHex = salt.toString(CryptoJS.enc.Hex);
        const ivHex = iv.toString(CryptoJS.enc.Hex);
        return saltHex + ivHex + encrypted;
    }

    decrypt(encryptedText: string): string {
        const salt = CryptoJS.enc.Hex.parse(encryptedText.substr(0, 32));
        const iv = CryptoJS.enc.Hex.parse(encryptedText.substr(32, 32));
        const encrypted = encryptedText.substring(64);

        const key = CryptoJS.PBKDF2(this.key, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
