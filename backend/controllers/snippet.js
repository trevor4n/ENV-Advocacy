const express = require('express')
const router = express.Router()

const Snippet = require('../models/snippet')

//Index
router.get('/', (req, res, next) => { // todo - verify curator
    Snippet.find({})
    .populate('curator')
    .then( snippets => {
        let tagSet = new Set()
        console.log(snippets)
        snippets.forEach(snippet => { snippet.tags.forEach(tag => tagSet.add(tag))})
        return tagSet
    })
    // .then(snippets => res.json(snippets))
    .then(tagSet => res.render('index', {tags: tagSet})) // ejs detects dir and extension
    .catch(next) // stretch - read https://expressjs.com/en/guide/routing.html#route-methods
})

//Show / Detail
router.get("/:id", (req, res, next) => { // todo - verify curator
    Snippet.findById(req.params.id)
    .populate('curator')
    .then(snippet => res.render('show', {data: snippet.data, src: snippet.src, curator: snippet.curator, tags: snippet.tags}))  
    // .then(snippet => res.json(snippet))
    // todo - review redirect path
    .catch(next)
})

//Create
router.post("/", (req, res, next) => { // todo - verify curator
    Snippet.create(req.body)
    .then(snippet => res.json(snippet))
    .then(console.log('^ snippet create ^'))
    .then(res.redirect('index')) // todo - review redirect path
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
    // todo - review redirect path
    .catch(next)
})

//Destroy
router.delete("/:id", (req, res, next) => { // todo - verify curator
    Snippet.findByIdAndRemove(req.params.id)
    //.then(snippet => res.json(snippet))
    .then(console.log('^ snippet destroyed ^'))
    .then(res.redirect('index')) // todo - review redirect path
    .catch(next)
})

module.exports = router