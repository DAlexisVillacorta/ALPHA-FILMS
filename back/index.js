
const server = require ("./src/services/server");
const router = require ("./src/routes/routesMovies");
const routerUsers = require("./src/routes/routerUsers");
const dbConfig = require ("./src/config/dbConfig");

const PORT = 3000;

server.use(router);
server.use(routerUsers);


dbConfig().then(() => {
    server.listen (PORT, () => {
    console.log("Servidor escuchando en el puerto", PORT);
});
})
.catch((err) => console.log("error", err));

