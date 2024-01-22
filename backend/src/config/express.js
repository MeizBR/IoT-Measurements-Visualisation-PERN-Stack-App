// config/express.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const ws = require("../WebSocket/DB_Back_FrontWebSocket");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;
