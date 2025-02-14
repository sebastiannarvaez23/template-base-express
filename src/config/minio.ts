import { Client } from 'minio';
import multer, { StorageEngine } from 'multer';

export class MinioConfig {

    private readonly _client: Client;
    private readonly _bucketName: string;
    private readonly _storage: StorageEngine;

    constructor() {
        this._client = new Client({
            endPoint: process.env.MINIO_ENDPOINT!,
            port: Number(process.env.MINIO_PORT!),
            useSSL: false,
            accessKey: process.env.MINIO_ACCESS_KEY!,
            secretKey: process.env.MINIO_SECRET_KEY!,
        });
        this._bucketName = process.env.MINIO_BUCKET_NAME!;
        this._storage = multer.memoryStorage();
    }

    async setFile(file: Express.Multer.File) {
        if (file) {
            const { originalname, buffer } = file!;
            await this._client.putObject(this._bucketName, originalname, buffer);
        }
    }

    async getPresignedUrl(objectName: string | null | undefined) {
        if (objectName) {
            const headers = { 'response-content-type': 'image/jpeg' };
            return await this._client.presignedGetObject(this._bucketName, objectName, 24 * 60 * 60, headers);
        }
    }

    async deleteImage(objectName: string) {
        if (objectName) {
            await this._client.removeObject(this._bucketName, objectName);
        }
    }

    async replaceImage(objectName: string, file: Express.Multer.File) {
        this.deleteImage(objectName);
        this.setFile(file);
    }

    getBucketName() {
        return this._bucketName;
    }

    getStorage() {
        return this._storage;
    }

    getClient() {
        return this._client;
    }
}