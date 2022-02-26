const { Thought } = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            // .populate('reactionId')
            .then(thoughts => res.json(thoughts))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then(thoughts => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No thought found with this ID! 😞' });
                    return;
                }
                res.json(thoughts);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create thought to user
    createThought( req, res) {
        console.log(req);
        Thought.createThought(req)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(users => {
                if (!users) {
                    res.status(404).json({ message: 'No user found with this ID! 😞' });
                    return;
                }
                res.json(users);
            })
            .catch(err => res.json(err));
    },

    //update thought
    updateThoughtById(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            body,
            { new: true }
        )
        .then(thoughts => {
            if (!thoughts) {
                res.status(404).json({ message: 'No thought found with this ID! 😞' });
                return;
            }
            res.json(thoughts);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete thought
    deleteThoughtById(req, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this ID! 😞' });
                }
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );
            })
            .then(users => {
                if (!users) {
                    res.status(404).json({ message: 'No user found with this ID! 😞' });
                    return;
                }
                res.json(users);
            })
            .catch(err => res.json(err));
    },

    // add reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughts => {
                if (!thoughts) {
                    return res.status(404).json({ message: 'No thought found with this ID! 😞' });
                }
                res.json(thoughts);
            })
            .catch(err => res.json(err));
    },

    // delete reaction
    deleteReaction(req, res) {
        console.log(req.params.thoughtId, req.params.reactionId);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(users => res.json(users))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;