
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE decks RESTART IDENTITY CASCADE")
    .then(() => {
      // Inserts seed entries
      return knex("decks").insert([
        {
          "name": "Rendering in React",
          "description": "React Router is a collection of navigational components that compose declaratively with your application."
        },
        {
          "name": "React Router",
          "description": "React Router is a collection of navigational components that compose declaratively with your application."
        },
      ]);
    });
};
