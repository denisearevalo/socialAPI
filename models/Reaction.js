const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
    reactionId: {                       // * `reactionId`
        type: Schema.Types.ObjectId,           //   * Use Mongoose's ObjectId data type
        default: ()=>new Types.ObjectID()   //   * Default value is set to a new ObjectId
    },

    reactionBody: {                     // * `reactionBody`
        type: String,                   //   * String
        required: true,                 //   * Required
        maxLength: 280                  //   * 280 character maximum
    },

    username: {                         // * `username`
        type: String,                   //   * String
        required: true,                 //   * Required
    },

    createdAt: {                        // * `createdAt`
        type: Date,                     //   * Date
        default: Date.now,              //   * Set default value to the current timestamp
        get: (createdAtVal) =>          //   * Use a getter method to format the timestamp on query
            moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
},
    {
        toJSON: {
            getters: true
        },
        id: false
    },
// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

);

module.exports = reactionSchema;