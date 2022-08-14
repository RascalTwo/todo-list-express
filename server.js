// Assign the imported `express` module to the constant variable `express`
const express = require('express')
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')
const MongoStore = require('connect-mongo');
const mongooseClient = require('./models/index.model.js');
// Assign the newly created express application to the constant variable `app`
const app = express()
// Assign the default port number `2121` to the constant variable `PORT`
const PORT = 2121
// Call the `config` method on the imported `dotenv` module, loading the environment variables from the `.env` file into `process.env`

// Call the `set` method of our express application, settings the default engine extension, allowing us to omit said extension when specifying view names.
app.engine('hbs', engine({extname: 'hbs'}))
app.set('view engine', 'hbs')
// Add the `serve-static` middleware to our express application, serving any files requested from the root found in the `public` directory.
app.use(express.static('public'))
// Add the `body-parser` `urlencoded` middleware to our express application, parsing the content of any requests with a `Content-Type` of `application/x-www-form-urlencoded` to a JavaScript object assigned to the request `body` property - additionally setting the `extended` property to `true` within the options object to allow for nested objects via the `qs` module.
app.use(express.urlencoded({ extended: true }))
// Add the `body-parser` `json` middleware to our express application, parsing the content of any requests with a `Content-Type` of `application/json` to a JavaScript object assigned to the request `body` property.
app.use(express.json())
app.use(cookieParser())
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 },
  rolling: true,
  store: MongoStore.create({ clientPromise: mongooseClient, dbName: 'todo' }),
}))
require('./services/passport.js')(app)

app.use(require('./routes/index.route.js'))
app.use(require('./routes/todo.route.js'))
app.use(require('./routes/auth.route.js'))
app.use(require('./routes/admin.route.js'))


// Start the server listening on either the PORT provided via environment variable or the default port stored in the PORT variable.
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})