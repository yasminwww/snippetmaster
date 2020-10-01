/** Made by Yasmin Mushahdi 2018-02 */
'use strict'

let router = require('express').Router()
let Snippet = require('../models/snipp')

router.route('/scribble').get((req, res, next) => {
  Snippet.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(req.session.user)

    let context = {
      admin: req.session.user ? req.session.user : false,
      scribble: data.map(function (scribble) {
        return {
          text: scribble.text,
          createdAt: scribble.createdAt.toISOString().slice(0, 10),
          usernamE: scribble.username || '[Deleted user]',
          id: scribble._id,
        }
      }),
    }

    if (!req.session.user) res.render('scribbleHome', context)
    else res.render('scribbleAuth', context)
  })
})

module.exports = router
