import App from './app';
import dotenv from 'dotenv';

dotenv.config();

const server = new App();
const port = process.env.SERVER_PORT;

server.start(port);