const mongoose = require('../db/connections')

const UserSchema = new mongoose.Schema({
    name: String,
    tags: [String],
    curator: {type: Boolean, default: false},
    reRolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Snippet"
        }
    ],
    snipets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Snipet"
    }],
    orgs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Org"
    }]
})

const User = mongoose.model('User', UserSchema)

module.exports = User