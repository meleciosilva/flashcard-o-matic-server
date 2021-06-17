const knex = require("../db/connection");

function list() {
  return knex("decks")
    .select("*");
}

function create(newDeck) {
  return knex("decks")
    .insert(newDeck)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  list,
  create,
}