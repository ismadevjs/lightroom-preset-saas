exports.checkifAdmin = function(req, res, next) {
    if (req.session.user.role === "admin") {
        next()
    } else {
        req.session.save(() => {
          res.redirect("/404");
        });
    }
}