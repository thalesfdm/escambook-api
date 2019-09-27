import express, { json } from 'express';
import morgan from 'morgan';
import setRoutes from './routes';

class App {

  constructor() {
    this.app = express();
    this.setup();
  }

  setup() {
    this.app.use(json());
    this.app.use(morgan('dev'));
    setRoutes(this.app);
  }

  async start(port) {
    await this.app.listen(port);
    console.log(`Listening on port ${port}...`);
  }

}

export default App;