// import books from './books';
import users from './users';

function setRoutes(app) {
  // app.use('/api/books', books);
  app.use('/api/users', users);
}

export default setRoutes;