const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require("./src/routes");


app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", routes);


module.exports = app;