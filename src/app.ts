import * as express from 'express';

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
  }

  private middleware(): void {
    this.express.use('/hello', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
      resp.send({
        hello: "Hello world!"
      });
    });
  }
}

export default new App().express