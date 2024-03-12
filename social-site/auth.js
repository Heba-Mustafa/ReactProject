import jsonServer from 'json-server';
import auth from 'json-server-auth';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

// Use default middlewares (CORS, etc)
server.use(middlewares);

// Set up authentication middleware
server.use(auth);

// Add custom routes for authentication endpoints if needed

// Use router
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
