import * as CryptoJS from 'crypto-js';

export class EncryptionService {
    private readonly key: string = 'mySecretKey1234567890';
    private readonly keySize = 256;
    private readonly ivSize = 128;
    private readonly iterations = 1000;

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
