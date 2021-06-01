let db = require("./../../db");


function deckExists(req, res, next) {
  let deckId = req.params.deckId;
  let deck = db.decks.find(deck => Number(deck.id) === Number(deckId));
  if (deck) {
    res.locals.deck = deck;
    return next();
  }
  res.json({ message: "ERROR" })
}


// Since some ID's may already be used, you find the largest assigned id.
let lastId = db.decks.reduce((maxId, deck) => Math.max(maxId, deck.id), 0)

function create(req, res) {
  let newDeck = { ...req.body, id: ++lastId  }
  db.decks.push(newDeck);
  res.status(201).json({ ...newDeck });
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

function list(req, res) {
  
  const { _embed } = req.query;
  
  if (_embed === "cards") {
    let cards = db.cards;
    let results = db.decks.map(deck => {
      let deckCards = cards.filter(card => Number(card.deckId) === Number(deck.id));
      return { ...deck, cards: deckCards }
    });
    return res.json( [...results] )
  }

  const decks = db.decks;
  res.json( [...decks] );
};

function destroy(req, res) {
  const index = db.decks.findIndex(deck => deck.id == res.locals.deck.id);
  db.decks.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [deckExists, read],
  create,
  update: [deckExists, update],
  delete: [deckExists, destroy],
  deckExists
}