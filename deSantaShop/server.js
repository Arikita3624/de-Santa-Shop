// const jsonServer = require('json-server');
// const jsonServerAuth = require('json-server-auth');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

// const authMiddleware = jsonServerAuth;
// server.use(middlewares);
// server.use(authMiddleware);

// server.use((req, res, next) => {
//   if (req.method === 'POST' && req.path === '/login') {
//     const { username, password } = req.body;
//     if (username === 'admin' && password === 'admin') {
//       return res.status(200).jsonp({ token: 'admin' });
//     }
//     return res.status(401).jsonp({ error: 'wrong username or password' });
//   }
//   next();
// });

// server.use(router);

// server.listen(3000, () => {
//   console.log('JSON Server is running at http://localhost:3000');
// });

