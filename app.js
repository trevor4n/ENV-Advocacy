const cors = require('cors')
const ejs = require('ejs')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const keys = require('./backend/config/keys')
const mongoose = require('mongoose')
const User = require('./backend/models/user')
const Snippet = require('./backend/models/snippet')
const session = require('express-session')
const methodOverride = require('method-override')
const express = require('express')

const app = express()
const port = 4100
let snipArray = []
let snipOut = null

// START - PassportJS Google OAuth 2.0
passport.use(new GoogleStrategy({
    clientID: process.env.NODE_ENV === 'production' ? process.env.client_id : keys.google.clientID,
    clientSecret: process.env.NODE_ENV === 'production' ? process.env.client_secret : keys.google.clientSecret,
    callbackURL: 'http://localhost:'+port+'/auth/google/redirect'
},
(accessToken, refreshToken, profile, done) => {
    // user = await User.findOneAndUpdate(
    //     { email: profile.emails[0].value },
    //     { googleId: profile.id },
    //     { upsert: true, new: true, setDefaultsOnInsert: true },
    //   )
    User.findOne({googleId: profile.id})
    .then(currentUser => {
        if(!currentUser){
            new User({googleId: profile.id, curator: true, name: profile.displayName, email: profile.emails[0].value}).save()
            .then(newUser => {done(null, newUser)}) //callback signaling to passport that user access is complete    
        }        
        else{
            User.findOneAndUpdate(
                {googleId: profile.id}, 
                {
                    googleId: profile.id,
                    curator: true, 
                    name: profile.displayName, 
                    email: profile.emails[0].value               
                }, {
                    new: true
                }
                // ,(error, updatedUser) => {
                //     console.log(updatedUser)
                //     done(null, updatedUser)
                // }
            )
            // .then((error, updatedUser) => {
            //     console.log(updatedUser)
            //    return done(null, updatedUser)
            // })
            done(null, currentUser)
        }
    })
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
    // express-session default cookie values 🖤
    resave: true,
    // express-session non-default values ❤️
    saveUninitialized: false,
    secret: process.env.NODE_ENV === 'production' ? process.env.session_key : keys.session.sessionKey,
    maxAge: 1000*60*60 //expires in one hour (ms)
}))
// END - PassportJS

// Use middleware to parse the data in the HTTP request body and add a property of body to the request object containing a POJO (Plain Old Java Object) with with data.
app.use(express.json()) //parses application/json request data and adds it to the request object as request.body
app.use(express.urlencoded({ extended: true })) //parses x-ww-form-urlencoded request data and adds it to the request object as request.body
app.use(methodOverride('_method'))
app.use('/public',express.static('public')) // static server
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

// START - primary controllers (after middleware)
app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email'],
    prompt : "select_account" 
}))

// fix - chrome error: The page delivered both an 'X-Frame-Options' header and a 'Content-Security-Policy' header with a 'frame-ancestors' directive. Although the 'X-Frame-Options' header alone would have blocked embedding, it has been ignored.
// app.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: 'http://localhost:' + port + '/'}), (req, res, next) => { // stretch - add a back button to the login page (so that failures can redirect to /auth/login instead of /)
app.get('/auth/google/redirect', passport.authenticate('google', { successRedirect: 'http://localhost:' + port + '/', failureRedirect: 'http://localhost:' + port + '/'}), (req, res, next) => { // stretch - add a back button to the login page (so that failures can redirect to /auth/login instead of /)
    console.log('user::', req.user)
    // res.render('index', {user: req.user}, {cache: true}) // FIXED - res not req ... cache leads to error
    // res.redirect('/')
    // return res.redirect('/')
})

app.get('/auth/logout', (req, res) => { // todo - verify req / res
    req.logout()
    // req.session.destroy()
    // res.clearCookie("connect.sid")
    res.redirect('/')
})

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    // res.status(statusCode).send(message)
    // console.log(res.status(statusCode))
    console.log('status: ',statusCode)
})

app.set('view engine', 'ejs')
app.set('port', process.env.PORT || port)

app.listen(app.get('port'), () => {
    console.log(`🌟 PORT: ${app.get('port')} ✅`)
})

app.get('/', (req, res, next) => {
    if(req.user === undefined || req.user == null){
        Snippet.find({})
        .then( snippets => {
            // console.log('snips',snippets)
            //res.render('index', {user: req.user, snippets: snippets}) // stretch - the snippet data set could get big down the road
            res.render('index', {snippets: snippets}) // stretch - the snippet data set could get big down the road
        })
    }
    else if(req.user.curator){
        Snippet.find({})
            .then(function(docs){
                snipArray = []
                docs.forEach(function(doc){
                    // console.log('doc::',doc)
                    snipArray.push(doc)
                })
                // console.log('snip array[0]::', snipArray[0].data)
                snipOut = snipArray[0]

                res.render('index', {user: req.user, snipsnip: snipOut})
        })
    }
})
// END - primary controllers (after middleware)

// START - secondary controllers (attach routers)
const snippetController = require('./backend/controllers/snippet')
app.use('/snippet', snippetController)
const orgController = require('./backend/controllers/org')
app.use('/org', orgController)
const userController = require('./backend/controllers/user')
app.use('/user', userController)
// END - secondary controllers (attach routers)

// START - HELPER CALLBACK FXs
// function getSnip(s){
//     snipArray.push(s)
// }
//END - HELPER CALLBACK FXs

// START - EJS HELPERS  
app.locals.getSnippetsHelper = function(usr){
    //console.log(`usr: ${usr}`)
    /*
    if(usr === undefined || usr === null){
        console.log('>>>not logged in<<<')
        Snippet.find({})
        .then(function(docs){
            snipArray = []
            docs.forEach(function(doc){
                // console.log('doc::',doc)
                snipArray.push(doc)
            })
            // console.log('snip array[0]::', snipArray[0].data)
            // return snipArray[0]
            snipOut = snipArray[0]
            return snipOut
        })
    } else 
    */
    if(usr.reRolled === undefined || usr.reRolled.length == 0){ //logged in with no snippets seen 
        //.sort // stretch
        // Snippet.find().toArray() 
        /*
        Snippet.find({}).toArray().forEach( snip  => {
            getSnip(snip)
        })
        
        .then( snippets => {
            console.log(`snipz1: ${snippets}`)
        })
        .catch()
        */
        /*
        Snippet.find({})
        .exec((err, snippets) => {
            console.log(`snipz1: ${snippets}`)
            let arr = []
            snippets.forEach(snippet => {
                arr.push(snippets) // ideally this just returns the first one
            })
            // randomSnippet = arr[0]
            return arr[0]
        })
        */

        Snippet.find({})
        .then(function(docs){
            snipArray = []
            docs.forEach(function(doc){
                // console.log('doc::',doc)
                snipArray.push(doc)
            })
            // console.log('snip array[0]::', snipArray[0].data)
            // return snipArray[0]
            snipOut = snipArray[0]
            return snipOut.data
        })
        /*
        // stretch - prioritize tag matching, when finished add fx to else below
        .then(snippets => {
            snippets.forEach(snippet => {
                let userTags = usr.tags
                snippet.tags.forEach(tag => {
                    if(userTags.contains(tag))
                        snips.add(snippet)
                })
            })
        })
        */
    } else {
        console.log('🚧 logged in with snippets seen 🚧')
        // Snippet.find({_id: {$nin: usr.reRolled}, }) //find all exclusive of previously seen
        Snippet.find({id: {$nin: usr.reRolled}})
        .then( snippets => {
            if((usr.reRolled.length > 0) && (snippets.length == 0)){
                console.log(`⚠️ There are no remaining unique snippets to display`)
                return null
            }
            else{
                console.log(`nin: ${snippets}`)
                return snippets[0] // send back a snippet
            }
        })
    }
}
// END - EJS HELPERS