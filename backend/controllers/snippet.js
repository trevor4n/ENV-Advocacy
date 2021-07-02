const express = require('express')
const router = express.Router()

const Snippet = require('../models/snippet')

//Index
router.get('/', (req, res, next) => { // todo - verify curator
    Snippet.find({})
    .populate('curator')
    /*
    .then( snippets => {
        let tagSet = new Set()
        // console.log("snippets")
        // console.log(snippets)
        // snippets.forEach(snippet => { snippet.tags.forEach(tag => tagSet.add(tag))}) // FIX - freezing
        return tagSet
    })
    */
    // .then(snippets => res.json(snippets))
    // .then(console.log("Gonna render snippets now..."))
    // .then((snippets, tagSet) => res.render('snippets', {user: req.user, snips: snippets, tags: tagSet})) // ejs detects dir and extension
    .then((snippets) => res.render('snippets', {user: req.user, snips: snippets})) // ejs detects dir and extension
    .catch(next) // stretch - read https://expressjs.com/en/guide/routing.html#route-methods
})

// fix - show route might need to go here

// fix - express-mvc ref
router.get('/new', (req, res, next) => {
    res.render('partials/newSnippet')
})

//Create
router.post("/", (req, res, next) => { // todo - verify curator
    Snippet.create(req.body)
    .then(snippet => res.json(snippet))
    .then(console.log('^ snippet create ^'))
    .then(res.render('partials/snippets')) // todo - review redirect path
    .catch(next)
})

//Show / Detail
router.get("/:id", (req, res, next) => { // todo - verify curator
    Snippet.findById(req.params.id)
    .populate('curator')
    .then(snippet => res.render('partials/showSnippet', {data: snippet.data, src: snippet.src, curator: snippet.curator, tags: snippet.tags}))  
    // .then(snippet => res.json(snippet))
    // todo - review redirect path
    .catch(next)
})

// fix - express-mvc ref
router.get("/:id/edit", (req, res, next) => { // todo - verify curator
    Snippet.findById(req.params.id)
    .populate('curator')
    .then(snippet => res.render('partials/editSnippet', {data: snippet.data, src: snippet.src, curator: snippet.curator, tags: snippet.tags}))  
    // .then(snippet => res.json(snippet))
    // todo - review redirect path
    .catch(next)
})

//Update - put
router.put('/:id', (req, res, next) => { // todo - verify curator
    const id = req.params.id
    Snippet.findOneAndUpdate(
        {_id: id}, // todo - review underscore
        {
            data: req.body.data,
            tags: req.body.tags,
            src: req.body.src,
            curator: req.body.curator // todo - session user (curator)
        },
        {new: true}
    )
    .then(snippet => res.json(snippet))
    .then(console.log('^ snippet updated ^'))
    .then(res.redirect('partials/showSnippet'))
    // todo - review redirect path
    .catch(next)
})

//Destroy
router.delete("/:id", (req, res, next) => { // todo - verify curator
    Snippet.findByIdAndRemove(req.params.id)
    //.then(snippet => res.json(snippet))
    .then(console.log('^ snippet destroyed ^'))
    .then(res.redirect('partials/snippets')) // todo - review redirect path
    .catch(next)
})

module.exports = router