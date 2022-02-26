const router = require('express').Router();

const {                             
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/')
    .get(getAllUsers)                       // * `GET` all users
    .post(createUser);                      // * `POST` a new user:

router.route('/:id')                        // * `GET` a single user by its `_id` and populated thought and friend data
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)                      // * `DELETE` to remove user by its `_id`

router.route('/:userId/friends/:friendId')  // **`/api/users/:userId/friends/:friendId`**
    .post(addFriend)                        // * `POST` to add a new friend to a user's friend list
    .delete(deleteFriend)                   // * `DELETE` to remove a friend from a user's friend list

module.exports = router;

// ```json
// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// ```

// **BONUS**: Remove a user's associated thoughts when deleted.
