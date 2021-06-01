const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

const decksRouter = require("./routers/decks.router");
const cardsRouter = require("./routers/cards.router");

app.use(cors({ origin: "*" }))
app.use(express.json());

app.use("/decks", decksRouter);
app.use("/cards", cardsRouter);

const listener = () => console.log(`Server up and running on port ${port}!`);
app.listen(port, listener);