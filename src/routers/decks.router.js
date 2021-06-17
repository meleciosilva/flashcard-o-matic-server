const router = require("express").Router();
const controller = require("./../controllers/decks.controller");
const cardsRouter = require("./../routers/cards.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use("/:deckId/cards", controller.deckExists, cardsRouter);

router
  .route("/:deckId/cards")
  .get(controller.read)
  .all(methodNotAllowed);

router
  .route("/:deckId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);


module.exports = router;