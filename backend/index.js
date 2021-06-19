const express = require('express')
const cors = require('cors')
const ejs = require('ejs')
const app = express()

// Use middleware to parse the data in the HTTP request body and add a property of body to the request object containing a POJO (Plain Old Java Object) with with data.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//start controllers (after middleware)
const snippetController = require('./controllers/snippet')
app.use('/snippet/', snippetController)
//end controllers

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).send(message)
})

app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 4200)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})

//app.get('/', (req, res) => {res.send(`You've reached the ENV-Advocacy index. </br> Navigate to the '/snippet/:id' path for routing`)})
app.get('/', (req, res) => {res.redirect('/snippet')})