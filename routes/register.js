/** Made by Yasmin Mushahdi 2018-02 */
'use strict'

let router = require('express').Router()
let User = require('../models/user')

router.route('/register')
  .get((req, res) => {
    res.render('register', { title: "A snippet on you're mind?", success: false, errors: req.session.flash, link: '/login', linkaction: 'Sign In' })
    req.session.errors = null
  })
  // create a new instanse of a user and save in db
  .post(async(req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    // password validation
    req.check('password').isLength({min: 6, max: 18})

    let errors = req.validationErrors()
    
    if (errors) {
      req.session.flash = errors
      req.session.flash = {
        type: 'alert alert-danger',
        message: 'Password should be at Least 6-18 characters long, try again.'
      }
      res.redirect('/register')
      // create the snippet, udd username of the creator
    } else {
      const checkExistens = await User.countDocuments({username: req.body.username})
      if(checkExistens > 0) {
        req.session.flash = {
          type: 'alert alert-danger',
          message: 'Username taken, please pick another username.'
        }
        res.redirect('/register')
      }
      const snippetUser = new User()
      snippetUser.username = username
      snippetUser.password = password

      snippetUser.save((err, savedUser) => {
        if (err) {
          next(err)
          req.session.flash = {
            type: 'alert alert-danger',
            message: 'Registration was not a success, please try again.'
          }
          res.redirect('/register')
        } else {
          req.session.flash = {
            type: 'alert alert-success',
            message: 'The registration was a success :), now you can log in.'
          }
          console.log(savedUser)
          res.redirect('/login')
        }
      })
    }
  })

module.exports = router
