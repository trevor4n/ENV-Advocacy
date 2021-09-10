const express = require('express')
const router = express.Router()

const Snippet = require('../models/snippet')

// Index
router.get('/', (req, res, next) => { // todo - verify curator
    Snippet.find({})
    .populate('curator')
    .then(snippets => res.render('partials/snippets', {user: req.user, snips: snippets})) // ejs detects dir and extension
    .catch(next) // READ - https://expressjs.com/en/guide/routing.html#route-methods
})

// Create
router.get('/new', (req, res, next) => { // todo - verify curator
    res.render('partials/newSnippet')
})
router.post("/", (req, res, next) => { // todo - verify curator
    Snippet.create({
        data: req.body.data,
        tags: req.body.tags,
        src: req.body.src,
        // hidden: req.body.hidden === 'on', // stretch - hidden/archived/recycle-bin for snippets
        curator: req.user._id // stretch - curator: session user / editor
    })
    .then( snippet => { // fixed - ValidatorError, req.body { action: ''}, form inputs require schema
        res.redirect('/snippet')
    })
    // .catch(console.error)
    .catch(next)
})

// Show / Detail
router.get("/:id", (req, res, next) => { // todo - verify curator
    Snippet.findById(req.params.id)
    .populate('curator')
    .then(snippet => {
        // console.log(`Snippet::${snippet}`)
        res.render('partials/showSnippet', {snip: snippet})
    })  
    .catch(next)
})

// Update
router.get("/:id/edit", (req, res, next) => { // todo - verify curator
    Snippet.findById(req.params.id)
    .populate('curator')
    .then(snippet => res.render('partials/editSnippet', {snip: snippet}))
    .catch(next)
})
router.put('/:id', (req, res, next) => { // todo - verify curator
    console.log('cur::',req.user)
    Snippet.findOneAndUpdate(
        {_id: req.params.id},
        {
            data: req.body.data,
            tags: req.body.tags,
            src: req.body.src,
            // hidden: req.body.hidden === 'on', // stretch - hidden/archived/recycle-bin for snippets
            curator: req.user._id // stretch - curator: session user / editor
        },
        {new: true}
    )
    .then(res.redirect('/snippet'))
    .catch(next)
})

// Destroy
router.delete("/:id", (req, res, next) => { // todo - verify curator
    Snippet.findByIdAndRemove(req.params.id)
    .then(res.redirect('/snippet'))
    .catch(next)
})

module.exports = router