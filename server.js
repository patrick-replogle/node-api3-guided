const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const agent = require("./middleware/agent");
// const morgan = require("morgan");
const logger = require("./middleware/logger");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

//third-party middleware from NPM. Order matters
server.use(helmet());
server.use(logger("long"));
server.use(agent("insomnia"));
// server.use(morgan("short"));
//build-in express middleware
server.use(express.json());

server.use("/api/hubs", hubsRouter);
//custom middleware function to display custom not found message if route doesn't exist
server.use((req, res) => {
  res.status(404).json({
    message: "Route was not found"
  });
});

//custom error middleware
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "An internal error occured. Please try again later."
  });
});

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
