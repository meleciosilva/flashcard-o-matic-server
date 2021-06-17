const decksService = require("../services/decks.service");
let db = require("./../../db");
const VALID_PROPS = ["name", "description"];

// validation middleware

function deckExists(req, res, next) {
  let deckId = req.params.deckId;
  let deck = db.decks.find(deck => Number(deck.id) === Number(deckId));
  if (deck) {
    res.locals.deck = deck;
    return next();
  }
  res.json({ message: "ERROR" })
}

function hasOnlyValidProps(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPS.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function hasRequiredProps(req, res, next) {
  const { data = {} } = req.body;

  VALID_PROPS.forEach((property) => {
    if (!data[property]) {
      return next({
        status: 400,
        message: `A '${property}' property is required.`
      });
    }
  });
  next();
}

// router-level middleware

async function create(req, res, next) {
  try {
    const newDeck = req.body.data;
    const data = await decksService.create(newDeck);
    res.status(201).json({ data });
  } catch(error) {
    next(error);
  }
}

function read(req, res) {
  const { _embed } = req.query;

  let cards = db.cards;
  let deckCards = cards.filter(card => Number(card.deckId) === Number(res.locals.deck.id));
  
  if (_embed === "cards") {
    return res.json({ ...res.locals.deck, cards: deckCards });
  }

  return res.json([ ...deckCards ]);

}

function update(req, res) {
  
  const deck = res.locals.deck;
  
  const updatedDeck = req.body;

  if (deck !== updatedDeck) {
    res.locals.deck = { ...deck, ...updatedDeck };
    const index = db.decks.findIndex(deck => deck.id == res.locals.deck.id);
    db.decks[index] = res.locals.deck;
  }
  
  return res.json({ ...res.locals.deck });

}

async function list(req, res, next) {
  try {
  const decks = await decksService.list();
    res.json({ decks });
  } catch(error) {
      next(error);
  }
};

function destroy(req, res) {
  const index = db.decks.findIndex(deck => deck.id == res.locals.deck.id);
  db.decks.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  list,
  create: [hasOnlyValidProps, hasRequiredProps, create],
  read: [deckExists, read],
  update: [deckExists, update],
  delete: [deckExists, destroy],
  deckExists
}