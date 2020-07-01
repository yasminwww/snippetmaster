/** Made by Yasmin Mushahdi 2018-02 */
'use strict'

module.exports = (router) => {
  router.get('/', function (req, res) {
    if(req.session.user) {
      res.render('home',{ title: 'Hello Snippet Master!' , usersnippets: '/snippet', typebtn: 'Back to My Snippes!'})
    } else {
      res.render('home',{ title: 'Hello Snippet Master!'})
      
    }
  })
  return router
}

// module.exports = router
