const router = require("express").Router();
const controller = require("./../controllers/decks.controller");
const cardsRouter = require("./../routers/cards.router");

router.use("/:deckId/cards", controller.deckExists, cardsRouter);

router
  .route("/:deckId/cards")
  .get(controller.read)

router
  .route("/:deckId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)

router
  .route("/")
  .get(controller.list)
  .post(controller.create)


module.exports = router;