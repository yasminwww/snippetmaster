/** Made by Yasmin Mushahdi 2018-02 */
'use strict'

const router = require('express').Router()
const User = require('../models/user')

router
  .route('/login')
  .get((req, res) => {
    res.render('login', {
      title: 'A snippet on your mind?',
      link: '/register',
      linkaction: 'Sign Up',
    })
  })

  .post((req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (!user) {
        req.session.flash = {
          type: 'alert alert-danger',
          message: 'No Snipper matched :(',
        }
        console.log(err)
        return res.redirect('/login')
      }

      if (user) {
        const userId = user._id
        const usernName = user.username

        user.comparePassword(req.body.password, (err, user2) => {
          console.log(user2)
          if (err) {
            console.log(err)
          } else if (!user2) {
            req.session.flash = {
              type: 'alert alert-warning',
              message: 'Something went wrong, try again.',
            }
            res.redirect('/login')
          } else if (user2) {
            req.session.flash = {
              type: 'alert alert-primary',
              message: 'Welcome Snipper! You are now logged in :)',
            }
            req.session.user = userId
            req.session.username = usernName
          }
          return res.redirect('/snippet')
        })
      }
    })
  })

module.exports = router
