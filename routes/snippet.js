/** Made by Yasmin Mushahdi 2018-02 */
'use strict'

const router = require('express').Router()
const Snippet = require('../models/snipp')

// get snippetpage and to snippet of user by session
router
  .route('/snippet')
  .get((req, res) => {
    Snippet.find({ userID: req.session.user }, (err, data) => {
      if (err) {
        console.log(err)
      }
      const context = {
        snipp: data.map((snipp) => {
          return {
            text: snipp.text,
            createdAt: snipp.createdAt.toISOString().slice(0, 10),
            usernamE: snipp.username,
            id: snipp._id,
          }
        }),
        admin: req.session.user,
      }
      if (!req.session.user) {
        res.redirect('/register')
      } else {
        res.render('snippet', context)
      }
    })
  })

  // create snippet
  .post((req, res) => {
    let text = req.body.text

    const textObj = new Snippet()
    textObj.text = text
    textObj.userID = req.session.user
    textObj.username = req.session.username

    // save to DB
    textObj.save((err, savedText) => {
      if (err) {
        console.log(err)
        return res.status(500).send()
      }
      res.status(200).send()
    })
    return res.redirect('/snippet')
  })

// render and delete snippet by id
router
  .route('/snippet/delete/:id')
  .get((req, res) => {
    res.render('delete', { id: req.params.id })
  })

  .post((req, res, next) => {
    Snippet.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        console.log(err)
      }
      res.redirect('/snippet')
    })
  })

// get and render updatepage
router
  .route('/snippet/update/:id')
  .get(async (req, res, next) => {
    if (!req.session.user) return res.redirect('/login')

    const snippet = await Snippet.findOne({
      _id: req.params.id,
      userId: req.session.user._id,
    })

    if (!snippet) return res.send('Snippet not found')
    return res.render('update', {
      id: snippet._id,
      text: snippet.text,
      admin: req.session.user,
    })
  })

  // ( async/await works well with mongose promises), upadate snippet by id
  .post(async (req, res) => {
    try {
      let text = req.body.text

      if (text.length === 0) {
        req.session.flash = {
          type: 'alert alert-warning',
          message: 'Please write something in the textfield',
        }
        return res.redirect('/snippet')
      } else {
        await Snippet.findByIdAndUpdate(req.params.id, {
          text: text,
          createdAt: Date.now(),
        })
        return res.redirect('/snippet')
      }
    } catch (error) {
      req.session.flash = {
        type: 'alert alert-danger',
        message: 'Someting went wrong with the connection',
      }
    }
  })

module.exports = router
