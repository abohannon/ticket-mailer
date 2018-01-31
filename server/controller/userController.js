const mongoose = require('mongoose');

const User = mongoose.model('users');
const Email = mongoose.model('emails')
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

  fetchEmails(req, res, next) {
    try {
      Email.find({}, (err, emails) => {
        const recentEmails = emails.reduce((emailList, email, i) => {
          emailList[i] = {
            date: email.dateSent,
            tour: email.tourName,
            show: email.showDate,
            bundle: email.bundleType,
          }
          return emailList
        }, [])
        res.send(recentEmails.reverse())
      })
    } catch (err) {
      if (err) console.log('error fetching emails', err)
    }
  },
};
