const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const app = express();
const cors = require("cors");

const decksRouter = require("./routers/decks.router");
const cardsRouter = require("./routers/cards.router");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use(cors({ origin: "*" }))
app.use(express.json());

app.use("/decks", decksRouter);
app.use("/cards", cardsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;