const mongoose = require('../db/connections')

const SnippetSchema = new mongoose.Schema({
    data: String,
    tags: [String],
    src: String,
    ref: {
        type: mongoose.Schema.Types.ObjectId,
        //ref: "Org"
        ref: String
    },
    curator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    } 
})

const Snippet = mongoose.model('Snippet', SnippetSchema)

module.exports = Snippet