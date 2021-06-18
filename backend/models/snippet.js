const mongoose = require('../db/connections')

const SnippetSchema = new mongoose.Schema({
    data: String,
    tags: [String],
    src: {type: String, required: 'Please document your {PATH}'}, //TODO - verify that path prints as src
    ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Org'
        // ref: String
    },
    curator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
})

const Snippet = mongoose.model('Snippet', SnippetSchema)

module.exports = Snippet