const { User, Thought } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      // .populate('reactionId')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with that ID! 😞" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create thought to user
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: "No thought found with this ID! 😞" })
          : res.json(thoughts)
      )
      .catch((err) => res.json(err));
  },

  //update thought
  updateThoughtById(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedThought) => {
        if (!updatedThought) {
          res
            .status(404)
            .json({ message: "No thought found with this ID! 😞" });
          return;
        }
        res.json(updatedThought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete thought
  deleteThoughtById(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
    //   .then((deletedThought) => {
    //     if (!deletedThought) {
    //       return res
    //         .status(404)
    //         .json({ message: "No thought with this ID! 😞" });
    //     }
    //     return User.findOneAndUpdate(
    //       { _id: req.params.userId },
    //       { $pull: { thoughts: req.params.thoughtId } },
    //       { new: true }
    //     );
    //   })
      .then((thoughts) => {
        if (!thoughts) {
          res.status(404).json({ message: "No user found with this ID! 😞" });
          return;
        }
        res.status(200).json({message: "Bye Felicia 👋"});
      })
      .catch((err) => res.json(err));
  },

  // add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }
      //   { new: true, runValidators: true }
    )
      .then((thoughts) => {
        if (!thoughts) {
          return res
            .status(404)
            .json({ message: "No thought found with this ID! 😞" });
        }
        res.json(thoughts);
      })
      .catch((err) => res.json(err));
  },

  // delete reaction
  deleteReaction(req, res) {
    console.log(req.params.thoughtId, req.params.reactionId);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
