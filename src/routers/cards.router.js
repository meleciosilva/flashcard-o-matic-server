const router = require("express").Router({ mergeParams: true });
const controller = require("./../controllers/cards.controller");

router
  .route("/:cardId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)

router
  .route("/")
  .get(controller.list)
  .post(controller.create)

module.exports = router;