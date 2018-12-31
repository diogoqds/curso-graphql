"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class App {
    constructor() {
        this.express = express();
        this.middleware();
    }
    middleware() {
        this.express.use('/hello', (req, resp, next) => {
            resp.send({
                hello: "Hello world!"
            });
        });
    }
}
exports.default = new App().express;
