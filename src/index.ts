import { config } from "./config/config";
import { createServer, Server } from 'http';
import app from "./app";
import { Db } from "./db";

// use this line to get port from environment variable
const PORT = config.project.port || 3000;
const server: Server = createServer(app);

const db = new Db();

db.connect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`
      __ ${config.project.name} __

      [ENVIRONNEMENT] : ${config.envName}

      [MONGO_PATH] : ${config.mongo.path}
      [MONGO_NAME] : ${config.mongo.name}
      
      Server started at ${config.project.apiUrl}:${PORT}
      `);
    });
  })
  .catch(err => {
    console.log("index.js connect db error")
  });






