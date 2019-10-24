import books from './books';
import copies from './copies';
import users from './users';

function setRoutes(app) {
  app.use('/api/books', books);
  app.use('/api/users/books', copies);
  app.use('/api/users', users);
}

export default setRoutes;