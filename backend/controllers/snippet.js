const express = require('express')
const router = express.Router()

const Snippet = require('../models/snippet')

//Index
router.get('/', (req, res, next) => {
    Snippet.find({})
    .populate('curator')
    .then( snippets => {
        let tagSet = new Set()
        snippets.forEach(snippet => { snippet.tags.forEach(tag => tagSet.add(tag))})
        //console.log(snippets)
        return tagSet
    })
    // .then(snippets => res.json(snippets))
    .then(tagSet => res.render('index', {tags: tagSet})) // ejs detects dir and extension
    .catch(next) // stretch - read https://expressjs.com/en/guide/routing.html#route-methods
})

//Show / Detail
router.get("/:id", (req, res, next) => {
    Snippet.findById(req.params.id)
    //.populate('curator') //shouldnt be necessary for UI
    .then(snippet => res.render('show', {data: snippet.data, src: snippet.src, curator: snippet.curator, tags: snippet.tags}))  
    // .then(snippet => res.json(snippet))
    .catch(next)
})

//Create
router.post("/", (req, res, next) => {
    Snippet.create(req.body)
    .then(snippet => res.json(snippet))
    .then(console.log('^ snippet create ^'))
    .then(res.redirect('index')) // todo - fix path
    .catch(next)
})

//Update - put
router.put('/:id', (req, res, next) => { // todo - verify curator first?
    const id = req.params.id
    //Snippet.findByIdAndUpdate(
    Snippet.findOneAndUpdate(
        //{id: req.params.id},
        {_id: id},
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
    //todo - 0redirect after update?
    .catch(next)
})

//Destroy
router.delete("/:id", (req, res, next) => {
    Snippet.findByIdAndRemove(req.params.id)
    .then(snippet => res.json(snippet))
    .then(console.log('^ snippet destroyed ^'))
    .then(res.redirect('index')) // todo - fix path
    .catch(next)
})

module.exports = router