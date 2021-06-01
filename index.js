const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

const decksRouter = require("./src/routers/decks.router");
const cardsRouter = require("./src/routers/cards.router");

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json());

app.use("/decks", decksRouter);
app.use("/decks", cardsRouter);

const listener = () => console.log(`Server up and running on port ${port}!`);
app.listen(port, listener);