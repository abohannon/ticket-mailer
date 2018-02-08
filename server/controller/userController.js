const mongoose = require('mongoose');

const User = mongoose.model('users');
const passport = require('passport');


module.exports = {
  createUser(req, res) {
    if (req.body.firstName && req.body.email && req.body.password) {
      const userData = {
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password,
      };

      User.create(userData, (err, user, next) => {
        if (err) return next(err);
        return res.send(userData);
      });
    }
  },

  loginUser(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.json({ success: false, message: info.message });
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.json({ success: false, message: loginErr });
        }
        return res.json({ success: true, message: 'Auth succeeded' });
      });
    })(req, res, next);
  },

  logoutUser(req, res, next) {
    req.logout();
    return res.json({ success: true, message: 'Logout successful' });
  },

  currentUser(req, res, next) {
    res.send(req.user);
  },
};
