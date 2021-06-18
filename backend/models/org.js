const mongoose = require('../db/connections')

const OrgSchema = new mongoose.Schema({
    name: String,
    abrev: String,
    logo: String,
    tags: [String],
    url: String,
    curator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
})

const Org = mongoose.model('Org', OrgSchema)

module.exports = Org