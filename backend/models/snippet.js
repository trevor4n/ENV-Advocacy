const mongoose = require('../db/connections')

const SnippetSchema = new mongoose.Schema({
    data: {type: String, required: true},
    tags: [String],
    src: {type: String, required: 'Please document your {PATH}'}, //todo - verify that path prints as src
    // ref: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Org'
    //     // ref: String
    // },
    curator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
}, {timestamps: true})

const Snippet = mongoose.model('Snippet', SnippetSchema)

module.exports = Snippet