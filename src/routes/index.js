import books from './book';
import users from './users';

function setRoutes(app) {
  app.use('/api/books', books);
  app.use('/api/users', users);
}

export default setRoutes;