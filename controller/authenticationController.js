const User = require('../model/User')
exports.signupPost = function(req, res) {
    const user = new User(req.body)
    user.register().then(r => res.redirect('/login')).catch(e => res.send(e))
}