const express = require('express')
const cors = require('cors')
const ejs = require('ejs')
const app = express()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const keys = require('./backend/config/keys')
const mongoose = require('mongoose')
const User = require('./backend/models/user')
const session = require('express-session')

const port = 4100

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
    /*
    User.findOne({googleId: profile.id})
    .then(currentUser => {
        if(currentUser)
            done(null, currentUser)
        else{
            new User({googleId: profile.id, curator: true, name: profile.name, email: profile.email}).save()
            .then(newUser => {done(null, newUser)}) //callback signaling to passport that user access is complete
        }
    })
    */
    User.findOne({googleId: profile.id})
    .then(currentUser => {
        if(!currentUser){
            new User({googleId: profile.id, curator: true, name: profile.name, email: profile.email}).save()
            .then(newUser => {done(null, newUser)}) //callback signaling to passport that user access is complete    
        }        
        else{
            User.findOneAndUpdate(
                {googleId: profile.id}, {
                    googleId: profile.id, 
                    curator: true, 
                    name: profile.name, 
                    email: profile.email                    
                }, {
                    new: true
                }
            )
            done(null, currentUser)
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
    //  express-session default cookie values 🖤
    secret: keys.session.sessionKey,
    maxAge: 1000*60*60 //expires in one hour (ms)
}))
// END - PassportJS

// Use middleware to parse the data in the HTTP request body and add a property of body to the request object containing a POJO (Plain Old Java Object) with with data.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public',express.static('public'))
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

// START - controllers (after middleware)
const snippetController = require('./backend/controllers/snippet')
app.use('/snippet', snippetController)

const orgController = require('./backend/controllers/org')
app.use('/org', orgController)

const userController = require('./backend/controllers/user')
app.use('/user', userController)
// END - controllers

app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email'],
    prompt : "select_account" 
}))

// fix - chrome error: The page delivered both an 'X-Frame-Options' header and a 'Content-Security-Policy' header with a 'frame-ancestors' directive. Although the 'X-Frame-Options' header alone would have blocked embedding, it has been ignored.
// app.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: 'http://localhost:' + port + '/'}), (req, res, next) => { // stretch - add a back button to the login page (so that failures can redirect to /auth/login instead of /)
app.get('/auth/google/redirect', passport.authenticate('google', { successRedirect: 'http://localhost:' + port + '/', failureRedirect: 'http://localhost:' + port + '/'}), (req, res, next) => { // stretch - add a back button to the login page (so that failures can redirect to /auth/login instead of /)
    //console.log('curator: ' + res.user.curator)
    res.render('index', {user: req.user}, {cache: true})
    // return res.redirect('/')
    // res.redirect('/')
})

app.get('/auth/logout', (req, res) => { // todo - verify req or res below
    req.logout()
    // req.session.destroy()
    // res.clearCookie("connect.sid")
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
app.set('port', process.env.PORT || port)

app.listen(app.get('port'), () => {
    console.log(`🌟 PORT: ${app.get('port')} ✅`)
})

app.get('/', (req, res) => {res.render('index', {user: req.user})})