/** Made by Yasmin Mushahdi 2018-02 */
'use strict'

const path = require('path')
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const cookie = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const exphbs = require('express-handlebars')
const expressVal = require('express-validator')
require('dotenv').config()

const app = express()

const router = require('./routes/home')(express.Router())
// content security helper:
app.use(helmet())

app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.json())
// to get data from <form>
app.use(bodyParser.urlencoded({ extended: true }))

app.use(expressVal())
app.use(cookie())

app.use(
  session({
    key: 'user_sid',
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      // httpsOnly helps protect agains cookie theft/forgery.
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)
app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

// The flash middleware included to show alerts to the client
app.use((req, res, next) => {
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    // Delete it the flash from the session
    delete req.session.flash
  }
  next()
})

app.use('/', router)
app.use('/', require('./routes/scribble'))
app.use('/', require('./routes/login'))
app.use('/', require('./routes/snippet'))
app.use('/', require('./routes/register'))

let port = process.env.PORT || 8000

// connection to DB
const uri = process.env.MONGO_URI

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected…')
  })
  .catch((err) => console.log(err))

app.use('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('user_sid', { path: '/' }).redirect('/')
  })
})

app.listen(port, () => {
  console.log('Hello on port', port)
})

// show error type from server
app.use((req, res) => {
  res.status(400).render('errors/400')
})
app.use((req, res) => {
  res.status(403).render('errors/403')
})
app.use((req, res) => {
  res.status(404).render('errors/404')
})
app.use((req, res) => {
  res.status(500).render('errors/500')
})
