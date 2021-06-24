const express = require('express')
const router = express.Router()

const User = require('../models/user')

/*
//Index
router.get('/', (req, res, next) => {
    User.find({})
    .populate('curator')
    .then( users => {
        let tagSet = new Set()
        users.forEach(user => { user.tags.forEach(tag => tagSet.add(tag))})
        //console.log(users)
        return tagSet
    })
    // .then(users => res.json(users))
    .then(tagSet => res.render('index', {tags: tagSet})) // ejs detects dir and extension
    .catch(next) // stretch - read https://expressjs.com/en/guide/routing.html#route-methods
})
*/

//Show / Detail
router.get("/:id", (req, res, next) => {
    `User`.findById(req.params.id)
    //.populate('curator') //shouldnt be necessary for UI
    .then(user => res.render('show', {data: user.data, src: user.src, curator: user.curator, tags: user.tags}))  
    // .then(user => res.json(user))
    .catch(next)
})

//Create
router.post("/", (req, res, next) => {
    User.create(req.body)
    .then(user => res.json(user))
    .then(console.log('^ user create ^'))
    .then(res.redirect('index')) // todo - fix path
    .catch(next)
})

//Update - put
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    //User.findByIdAndUpdate(
    User.findOneAndUpdate(
        //{id: req.params.id},
        {_id: id},
        {
            name: req.body.name,
            tags: req.body.tags,
            curator: req.body.curator,
            reRolled: req.body.reRolled 
            // snippets: req.body.snippets,
            // orgs: req.body.orgs
            // todo - should googleId be passed if its not always updated?
        },
        {new: true}
    )
    .then(user => res.json(user))
    .then(console.log('^ user updated ^'))
    //todo - 0redirect after update?
    .catch(next)
})

/*
//Destroy
router.delete("/:id", (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => res.json(user))
    .then(console.log('^ user destroyed ^'))
    .then(res.redirect('index')) // todo - fix path
    .catch(next)
})
*/
module.exports = router