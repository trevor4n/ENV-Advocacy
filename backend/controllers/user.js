const express = require('express')
const router = express.Router()

const User = require('../models/user')

//Index
router.get('/', (req, res, next) => { // todo - verify curator/admin??
    User.find({})
    .populate('curator')
    .then( users => {
        let tagSet = new Set()
        users.forEach(user => { user.tags.forEach(tag => tagSet.add(tag))})
        return tagSet
    })
    // .then(users => res.json(users))
    .then(tagSet => res.render('index', {tags: tagSet})) // ejs detects dir and extension
    .catch(next) // stretch - read https://expressjs.com/en/guide/routing.html#route-methods
})

//Show / Detail
router.get("/:id", (req, res, next) => { // todo - verify curator/admin??
    User.findById(req.params.id)
    .then(user => res.render('show', {data: user.data, src: user.src, curator: user.curator, tags: user.tags}))  
    // .then(user => res.json(user))
    // todo - review redirect path
    .catch(next)
})

//Create
router.post("/", (req, res, next) => { // todo - verify curator/admin??
    User.create(req.body)
    .then(user => res.json(user))
    .then(console.log('^ user created ^'))
    .then(res.redirect('index')) // todo - review redirect path
    .catch(next)
})

//Update - put
router.put('/:id', (req, res, next) => { // todo - verify curator/admin??
    const id = req.params.id
    User.findByIdAndUpdate(
    // User.findOneAndUpdate(
        {_id: id}, // todo - review underscore
        {
            name: req.body.name,
            tags: req.body.tags,
            curator: req.body.curator,
            reRolled: req.body.reRolled 
            // snippets: req.body.snippets,
            // orgs: req.body.orgs
            // stretch - should googleId be passed if its not updated?
        },
        {new: true}
    )
    // .then(user => res.json(user)) // probs not best to expose the googleId to console
    .then(console.log('^ user updated ^'))
    // todo - review redirect path
    .catch(next)
})

//Destroy
router.delete("/:id", (req, res, next) => { // todo - verify curator/admin??
    User.findByIdAndRemove(req.params.id)
    // .then(user => res.json(user))
    .then(console.log('^ user destroyed ^'))
    .then(res.redirect('index')) // todo - review redirect path
    .catch(next)
})

module.exports = router