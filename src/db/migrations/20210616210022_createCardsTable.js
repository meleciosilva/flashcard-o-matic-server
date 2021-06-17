
exports.up = function(knex) {
  return knex.schema.createTable("cards", (table) => {
    table.increments("card_id").primary().notNullable();
    table.string("front").notNullable();
    table.string("back").notNullable();
    table.integer("deck_id").unsigned();
    table
      .foreign("deck_id")
      .references("deck_id")
      .inTable("decks");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("cards");
};
