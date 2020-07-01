// function checkAuth (req, res, next) {
//   console.log('checkAuth ' + req.url)
//   // don't serve /secure to those not logged in
//   // you should add to this list, for each and every secure url
//   if (req.url === '/' && (!req.session || !req.session.authenticated)) {
//     res.render('unauthorised', { status: 403 })
//     return
//   }
//   next()
// }

// login
// if (user) {
//     let userId = user._id
//     // let usernName = user.username


//     user.comparePassword(req.body.password, function (err, user2) {
//       if (err) {
//         console.log(err)
//         req.session.flash = {
//           type: 'alert alert-danger',
//           message: 'Log in please'
//         }
//       } else if (user2) {
//         req.session.flash = {
//           type: 'alert alert-primary',
//           message: 'Welcome Snipper! You are now logged in :)'
//         }
//         req.session.user = userId
//         // req.session.username = usernName

// snippet
    // skapa ett objekt för logoutknappen :)
    // let o = {}
    // o.context = context
    // o.name = "hrj"
    // console.log('context ' , o )
    // if (!req.session.user) {
    //     res.redirect('/register')
    //   } else {
    //     res.render('snippet', context)
    //   }
    // })