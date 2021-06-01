const db = require("./../../db");

function cardExists(req, res, next) {
  const cardId = req.params.cardId;
  const cards = db.cards;
  const card = cards.find(card => Number(card.id) === Number(cardId));
  if (card) {
    res.locals.card = card;
    return next();
  }
  res.json({ message: "No card found" });
}

function list(req, res) {
  const cards = db.cards;
  const { deckId } = req.params;
  const byResult = deckId ? card => Number(card.deckId) === Number(deckId) : () => true;
  const results = cards.filter(byResult);
  res.json([ ...results ]);
}

let lastId = db.cards.reduce((maxId, card) => Math.max(maxId, card.id), 0)

function create(req, res) {
  const deckId = res.locals.deck.id;
  let newCard = { ...req.body, id: ++lastId, deckId }
  db.cards.push(newCard);
  res.status(201).json({ ...newCard });
}

function read(req, res) {
  return res.json({ ...res.locals.card });
}

function update(req, res) {
  
  const card = res.locals.card;
  
  const updatedCard = req.body;

  if (card !== updatedCard) {
    res.locals.card = { ...card, ...updatedCard };
    const index = db.cards.findIndex(card => card.id == res.locals.card.id);
    db.cards[index] = res.locals.card;
  }
  
  return res.json({ ...res.locals.card });

}

function destroy(req, res) {
  const index = db.cards.findIndex(card => card.id == res.locals.card.id);
  db.cards.splice(index, 1);
  res.sendStatus(204); 
}

module.exports = {
  list,
  create,
  read: [cardExists, read],
  update: [cardExists, update],
  delete: [cardExists, destroy]
}