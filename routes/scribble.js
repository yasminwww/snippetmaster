/** Made by Yasmin Mushahdi 2018-02 */
'use strict'

let router = require('express').Router()
let Snippet = require('../models/snipp')

router.route('/scribble')
.get((req, res, next) => {

   Snippet.find({}, function (err, data) {
    if (err) { console.log(err) }
     
    let context = {
      znipp: data.map(function (znipp) {
        return {
          text: znipp.text,
          createdAt: znipp.createdAt.toISOString().slice(0, 10),
          usernamE: znipp.username || 'a deleted user',
          id: znipp._id
        }
      })
    }
    
    if (!req.session.user)
    res.render('scribbleHome', context)
    else
    res.render('scribbleAuth', context)
  })
})

module.exports = router