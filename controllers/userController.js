const { User, Thought } = require('../models');

const userController = {
//get all users
getAllUsers(req,res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status (500).json(err))
},
//get single user
getUserById(req,res) {
    User.findOne({_id:req.params.userId})
    .select('-__v')
    .then((users) =>
        !users
          ? res.status(404).json({ message: 'No user with that ID! 😞' })
          : res.json(users)
    )
    .catch((err) => res.status(500).json(err));
},
// create user
createUser(req,res){
    User.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
},
//update user
updateUser(req,res){
    User.findOneAndUpdate({_id:req.params.id})
    .then((users) =>
        !users
          ? res.status(404).json({ message: 'No user with that ID! 😞' })
          : res.json(users)
    )
    .catch((err) => res.status(500).json(err));
},
//delete user
deleteUser(req,res){
    User.findOneAndDelete({_id:req.params.id})
    .then((users) =>
        !users
          ? res.status(404).json({ message: 'No user with that ID! 😞' })
          : Thought.deleteMany({_id: {$in:users.thoughts}})
    )
    .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
    .catch((err) => res.status(500).json(err));  
}, 
//add friend
addFriend(req,res){
    User.findOneAndUpdate({_id: req.params.id}, {$addToSet:{friends:req.params.friendId}})
    .then((users) => 
        !users
          ? res.status(404).json({ message: 'No user with that ID! 😞' })
          : res.json(users)
    )
    .catch((err) => res.status(500).json(err));
},
//delete a friend
deleteFriend(req,res) {
    User.findOneAndDelete({_id: req.params.id}, {$pull:{friends:req.params.friendId}})
    .then((users) => 
        !users
          ? res.status(404).json({ message: 'No user with that ID! 😞' })
          : res.json(users)
    )
    .catch((err) => res.status(500).json(err));
}
}

module.exports = userController;