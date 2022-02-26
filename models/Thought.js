const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema({
    thoughtText: {                          // * `thoughtText`
        type: String,                       //   * String
        required: true,                     //   * Required
        minLength: 1,                       //   * Must be between 1 and 280 characters
        maxLength: 280
    },
    createdAt: {                            // * `createdAt`
        type: Date,                         //   * Date
        default: Date.now,                  //   * Set default value to the current timestamp
        get: (createdAtVal) =>              //   * Use a getter method to format the timestamp on query
        moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },                      

    username: {                             // * `username` (The user that created this thought)
        type: String,                       //   * String
        required: true                      //   * Required
    },

            // * `reactions` (These are like replies)
    reactions: [reactionSchema]//   * Array of nested documents created with the `reactionSchema`
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
// This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;