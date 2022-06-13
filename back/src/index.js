const { initDB } = require("./dataBase/index");
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const authRouter = require("./controllers/auth.controller");
const bugsRouter = require("./controllers/bugs.controller");
const gameRouter = require("./controllers/game.controller");
const gameVersionRouter = require("./controllers/gameVersion.controller");
const playtestRouter = require("./controllers/playtest.controller");
const taskRouter = require("./controllers/task.controller");
const { notFound, errorHandler } = require("./middlewares/main.middlewares");
// const Worker = require("./dataBase/models/Worker.model");

initDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("URL = ", req.url);
  console.log("Original_URL = ", req.originalUrl);
  console.log("METHOD = ", req.method);
  console.log("HOST = ", req.headers.host);
  console.log("IsSecure = ", req.secure);
  console.log("BODY", req.body);
  console.log("QUERY", req.query);
  // console.log(Worker.associations);
  next();
});

app.use('/auth', authRouter);
app.use('/bugs', bugsRouter);
app.use('/games', gameRouter);
app.use('/versions', gameVersionRouter);
app.use('/playtests', playtestRouter);
app.use('/tasks', taskRouter);

app.use(notFound);
app.use(errorHandler);

http.createServer(app).listen(3000, () => {
  console.log("Server is working on port 3000");
});
