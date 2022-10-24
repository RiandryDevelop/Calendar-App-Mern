const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// Create express server
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public Directory
app.use(express.static("public"));

// Reading and parsing the body
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// listen to requests
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
