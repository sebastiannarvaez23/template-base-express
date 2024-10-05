import { Application } from "express";

export class Server {
    constructor(private readonly _app: Application) { }

    raise() {
        const port = process.env.PORT;
        this._app.listen(port || '8000', () => {
            console.debug(`App listening on port: ${port}`);
        });
    }
}