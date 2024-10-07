import { ClientFeingConfig } from "../config";

export class UserClientFeign extends ClientFeingConfig {

    private baseURL: string;

    constructor(baseUrl: string) {
        super();
        this.baseURL = baseUrl;
    }

    public async getUserByNickname() {

    }

    public async getUserByEmail() {

    }
}