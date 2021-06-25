const express = require('express')
const cors = require('cors')
const ejs = require('ejs')
const app = express()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const keys = require('./config/keys')
const mongoose = require('mongoose')
const User = require('./models/user')
const session = require('express-session')

const port = 4200

// START - PassportJS Google OAuth 2.0
passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: 'http://localhost:'+port+'/auth/google/redirect'
},
(accessToken, refreshToken, profile, done) => {
    //console.log(profile)
    // user = await User.findOneAndUpdate(
    //     { email: profile.emails[0].value },
    //     { googleId: profile.id },
    //     { upsert: true, new: true, setDefaultsOnInsert: true },
    //   )
    // /*
    User.findOne({googleId: profile.id})
    .then(currentUser => {
        if(currentUser)
            done(null, currentUser)
        else{
            new User({googleId: profile.id}).save()
            .then(newUser => {done(null, newUser)}) //callback signaling to passport that user access is complete
        }
    })
    // */
    // console.log('access token: ', accessToken)
}))
passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})
app.use(session({
    //we like express-session default cookie values
    secret: keys.session.sessionKey,
    maxAge: 1000*60*60 //expires in one hour (ms)
}))
// END - PassportJS

// Use middleware to parse the data in the HTTP request body and add a property of body to the request object containing a POJO (Plain Old Java Object) with with data.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

//start controllers (after middleware)
const snippetController = require('./controllers/snippet')
app.use('/snippet/', snippetController)

const orgController = require('./controllers/org')
app.use('/org/', orgController)

const userController = require('./controllers/user')
app.use('/user/', userController)
//end controllers



app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email'],
    prompt : "select_account" 
}))

app.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: 'http://localhost:' + port + '/'}), (req, res, next) => { // stretch - route the user back to the login page if the login page has a back button to home
// app.get('/auth/google/redirect', passport.authenticate('google', { successRedirect: 'http://localhost:' + port + '/', failureRedirect: 'http://localhost:' + port + '/'}), (req, res, next) => { // stretch - route the user back to the login page if the login page has a back button to home
    // console.log('here ')
    // res.send(req.user)
    //res.send('reached redirect URI')
    // then redirect
    //res.redirect('/')
    //console.log(req.user)
    //let u = req.user
    //res.render('index', {user: req.user, curator: user.curator})
    //console.log('curator: ' + res.curator)
    //res.render('index', {curator: req.user.curator}) // FIX
    res.render('index', {user: req.user}) // FIX
    //return res.redirect('/')
    //res.redirect('/')
})

app.get('/auth/logout', (req, res) => {
    //console.log(res)
    req.logout()
    /*
    req.session.destroy()
    res.clearCookie("connect.sid")
    */
    //res.send(req.user)
    res.redirect('/')
})

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    //res.status(statusCode).send(message)
    //console.log(res.status(statusCode))
    console.log(statusCode)
})

app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 4200)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})

//app.get('/', (req, res) => {res.send(`You've reached the ENV-Advocacy index. </br> Navigate to the '/snippet/:id' path for routing`)})
//app.get('/', (req, res) => {res.redirect('/snippet')})
app.get('/', (req, res) => {res.render('index')})