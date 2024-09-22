import request from "supertest";
import { createApp } from '../../main';

let app: any;

beforeAll(async () => {
    app = await createApp();
});

describe('AuthController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should respond with 200 status and return token', async () => {
        const api = "/api/v1/auth/token";
        const res = await request(app)
            .post(api)
            .send({ nickname: 'admin', password: 'admin' })
            .set('Content-Type', 'application/json');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});
