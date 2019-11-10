import books from './books';
import copies from './copies';
import swaps from './swaps';
import users from './users';

function setRoutes(app) {
  app.use('/api/books', books);
  app.use('/api/swaps', swaps);
  app.use('/api/users/books', copies);
  app.use('/api/users', users);
}

export default setRoutes;