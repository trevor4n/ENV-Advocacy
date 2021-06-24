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
    console.log(profile)
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
            .then(newUser => {done(null, newUser)})
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
    scope: ['profile', 'email'],
    prompt : "select_account" 
}))

//app.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: 'http://localhost:' + port + '/snippet'}), (req, res) => {
app.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: 'http://localhost:' + port + '/'}), (req, res) => { // stretch - route the user back to the login page if the login page has a back button to home
    //console.log(res)
    res.send(req.user)
    //res.send('reached redirect URI')
    // then redirect
    //res.redirect('/')
    console.log(req.user)
    res.redirect('/')
    res.render('index', {curator: user.curator})
})

app.get('/auth/logout', (req, res) => {
    //console.log(res)
    req.logout()
    //res.send(req.user)
    res.redirect('/')
})

app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 4200)

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).send(message)
})

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})

//app.get('/', (req, res) => {res.send(`You've reached the ENV-Advocacy index. </br> Navigate to the '/snippet/:id' path for routing`)})
//app.get('/', (req, res) => {res.redirect('/snippet')})