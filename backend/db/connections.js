const mongoose = require('mongoose')

const mongoURI = process.env.NODE_ENV === 'production' ? process.env.DB_URL : 'mongodb://localhost/ENV-Advocacy' // stretch - for testing w/ MongoDB Atlas Cluster0 (instead of the local db) change the secondary condition above to use the /config/keys.js dbURI... make sure to import the file and validate the URI.

mongoose.connect(mongoURI, { //connect method is asynchronous
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
)
.catch((error) => console.log('Connection failed!', error))

module.exports = mongoose

// STRETCH - using ES6 Promises instead of callbacks for monngoose queries 
// https://stackoverflow.com/a/54995263/3911210
// https://rossbulat.medium.com/using-promises-async-await-with-mongodb-613ed8243900