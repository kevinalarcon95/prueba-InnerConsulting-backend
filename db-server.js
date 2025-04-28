const jsonServer = require("json-server");
const path = require("path");


const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 10000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server is running on http://0.0.0.0:${PORT}`);
});
