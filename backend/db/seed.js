const Snippet = require('../models/snippet')
const Org = require('../models/org')
const User = require('../models/user')

const snippetSeeds = require('./snippetSeeds.json')
const orgSeeds = require('./orgSeeds.json')
// const userSeeds = require('./userSeeds.json')

let seedCurator = null

// Start - section to comment out during all subsequent seeds
seedCurator = User.create({name: 'seedcurator', curator: true})
// End - section to comment out during all subsequent seeds

// Start - section to comment out during first seed ever
// Snippet.deleteMany({})
// .then(() => {
//     Org.deleteMany({})
// })
// .then(() => {
//     User.deleteMany({})
// })
// .then(() => {
//     seedCurator = User.create({name: 'seed curator', tags: [], curator: true})
//     return seedCurator
// })
// End - section to comment out during first seed ever
.then((user) => {
    return snippetSeeds.map( (snippet) => {
        return ({...snippet, curator: user._id})
    })
})
.then((snippets) => {
    return Snippet.insertMany(snippets)
})
.then(seedCurator => {
    return orgSeeds.map( (org) => {
        return ({...org, curator: seedCurator._id})
    })
})
.then((orgs) => {
    return Org.insertMany(orgs)
})
.then(console.log).catch(console.error).finally(() => {process.exit()})