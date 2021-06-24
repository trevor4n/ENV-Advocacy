const mongoose = require('../db/connections')

const UserSchema = new mongoose.Schema({
    //name: {type: String, unique: true, required: 'Please enter your {PATH}'},
    name: {type: String, unique: true},
    tags: [String],
    curator: {type: Boolean, default: false},
    reRolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Snippet'
        }
    ],
    // snippets: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Snippet'
    // }],
    // orgs: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Org'
    // }],
    googleId: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User