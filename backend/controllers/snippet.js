const express = require('express')
const router = express.Router()

const Snippet = require('../models/snippet')
const Org = require('../models/org')
const User = require('../models/user')

//Index
router.get('/', (req, res, next) => {
    Snippet.find({})
    //ref: https://git.generalassemb.ly/flex-323/express-apis-json/blob/master/README.md#second-half  
    //We could use a second API call to get the details for the curator, but Mongoose makes it easy to add virtual data to our response object
    .populate('curator')
    .then(snippets => res.json(snippets))
    .catch(next) //STRETCH (reading) - https://expressjs.com/en/guide/routing.html#route-methods
})

//Show / Detail
router.get("/:id", (req, res, next) => {
    Snippet.findById(req.params.id)
    .populate('curator')
    .then((snippet) => res.json(snippet))  
    .catch(next)
    })

//Create
router.post("/", (req, res, next) => {
    Snippet.create(req.body)
    .then(snippet => res.json(snippet))
    .catch(next)
})

//Update - put
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    //Snippet.findByIdAndUpdate(
    Snippet.findOneAndUpdate(
        //{id: req.params.id},
        {_id: id},
        {
            title: req.body.title,
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

//todo - https://git.generalassemb.ly/flex-323/express-apis-json/blob/master/README.md#second-half

//STRETCH: https://git.generalassemb.ly/flex-323/express-apis-json/blob/master/advanced.md 
// use redirects for post, update, delete routes (Paresh)
//example
// app.get("/", (req, res) => {
//   res.redirect("/api/snippets");
// });

module.exports = router