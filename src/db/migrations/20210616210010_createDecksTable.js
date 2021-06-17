
exports.up = function(knex) {
  return knex.schema.createTable("decks", (table) => {
    table.increments("deck_id").primary().notNullable();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("decks");
};
