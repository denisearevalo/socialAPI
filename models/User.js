const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {                     // * `username`
        type: String,               //   * String
        unique: true,               //   * Unique
        required: true,             //   * Required
        trim: true,                 //   * Trimmed
    },

    email: {                        // * `email`
        type: String,               //   * String
        required: true,             //   * Required
        unique: true,               //   * Unique
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter valid email address.']   //* Must match a valid email address 
    },

// * `thoughts`
//   * Array of `_id` values referencing the `Thought` model
    thoughts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'thoughts' 
    }],

// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)
    friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    }]
},

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
{
    toJSON: {
        virtuals: true
    },
    id: false
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('users', userSchema);

module.exports = User;