const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router
  .route("/")
  .get(getAllThoughts) // * `GET` to get all thoughts
  .get(getThoughtById) // * `GET` to get a single thought by its `_id`
  .post(createThought); // * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
router
  .route("/reactions/:thoughtId/:reactionId") // **`/api/thoughts/:thoughtId/reactions`**
  .post(addReaction) // * `POST` to create a reaction stored in a single thought's `reactions` array field
  .delete(deleteReaction); // * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
router
  .route("/:id")
  .put(updateThoughtById) // * `PUT` to update a thought by its `_id`
  .delete(deleteThoughtById); // * `DELETE` to remove a thought by its `_id`

module.exports = router;

// ```json
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
