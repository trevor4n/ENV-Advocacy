const express = require('express')
const router = express.Router()

const Snippet = require('../models/snippet')
const Org = require('../models/org') // todo - org should have its own controller
const User = require('../models/user')


//Index
router.get('/', (req, res, next) => {
    Snippet.find({})
    //ref: https://git.generalassemb.ly/flex-323/express-apis-json/blob/master/README.md#second-half  
    //We could use a second API call to get the details for the curator, but Mongoose makes it easy to add virtual data to our response object
    .populate('curator')
    .then( snippets => {
        let tagSet = new Set()
        snippets.forEach(snippet => { snippet.tags.forEach(tag => tagSet.add(tag))})
        return tagSet
    })
    // .then(snippets => res.json(snippets))
    .then(tagSet => res.render('index', {tags: tagSet})) // ejs detects dir and extension
    .catch(next) // stretch - read https://expressjs.com/en/guide/routing.html#route-methods
})

//Show / Detail
router.get("/:id", (req, res, next) => {
    Snippet.findById(req.params.id)
    .populate('curator')
    .then(snippet => res.render('show', {data: snippet.data}))  
    // .then(snippet => res.json(snippet))
    .catch(next)
})

//Create
router.post("/", (req, res, next) => {
    Snippet.create(req.body)
    .then(snippet => res.json(snippet))
    .catch(next)
})

//Update - put
router.put('/:id', (req, res, next) => { // todo - verify curator first
    const id = req.params.id
    //Snippet.findByIdAndUpdate(
    Snippet.findOneAndUpdate( // todo - handle Orgs too (hb User?)
        //{id: req.params.id},
        {_id: id},
        {
            title: req.body.title, // todo - proper fields for snippet/org/user
            url: req.body.url
        },
        {new: true}
    )
    .then(snippet => res.json(snippet))
    .catch(next)
})

//Destroy
router.delete("/:id", (req, res, next) => {
    Snippet.findByIdAndRemove(req.params.id)
    .then(snippet => res.json(snippet))
    .catch(next)
})

module.exports = router