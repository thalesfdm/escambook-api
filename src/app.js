import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { cloudinaryConfig } from './cloudinary';
import setRoutes from './routes';

class App {

  constructor() {
    this.app = express();
    this.setup();
  }

  setup() {
    this.app.use(json());
    this.app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
    this.app.use(morgan('dev'));
    this.app.use('*', cloudinaryConfig);
    setRoutes(this.app);
  }

  async start(port) {
    await this.app.listen(port);
    console.log(`Listening on port ${port}...`);
  }

}

export default App;