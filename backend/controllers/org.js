const express = require('express')
const router = express.Router()

const Org = require('../models/org')

//Index
router.get('/', (req, res, next) => { // todo - verify curator
    Org.find({})
    .populate('curator')
    .then( orgs => {
        let tagSet = new Set()
        console.log(orgs)
        orgs.forEach(org => { org.tags.forEach(tag => tagSet.add(tag))})
        return tagSet
    })
    //.then(orgs => res.json(orgs))
    .then(tagSet => res.render('index', {tags: tagSet})) // ejs detects dir and extension
    .catch(next) // stretch - read https://expressjs.com/en/guide/routing.html#route-methods
})

//Show / Detail
router.get("/:id", (req, res, next) => { // todo - verify curator
    Org.findById(req.params.id)
    .populate('curator')
    .then(org => res.render('show', {name: org.name, logo: org.logo, tags: org.tags, url: org.url, curator: org.curator}))  
    // .then(org => res.json(org))
    // todo - review redirect path
    .catch(next)
})

//Create
router.post("/", (req, res, next) => { // todo - verify curator
    Org.create(req.body)
    .then(org => res.json(org))
    .then(console.log('^ org create ^'))
    .then(res.redirect('index')) // todo - review redirect path
    .catch(next)
})

//Update - put
router.put('/:id', (req, res, next) => { // todo - verify curator
    const id = req.params.id
    Org.findByIdAndUpdate(
        {_id: id}, // todo - review underscore
        {
            name: req.body.name,
            logo: req.body.logo,
            tags: req.body.tags,
            url: req.body.url,
            curator: req.body.curator //todo - session user (curator)
        },
        {new: true}
    )
    .then(org => res.json(org))
    .then(console.log('^ org updated ^'))
    // todo - review redirect path
    .catch(next)
})

//Destroy
router.delete("/:id", (req, res, next) => { // todo - verify curator
    Org.findByIdAndRemove(req.params.id)
    //.then(org => res.json(org))
    .then(console.log('^ org destroyed ^'))
    .then(res.redirect('/')) // todo - review redirect path
    .catch(next)
})

module.exports = router