const mongoose = require('mongoose');
const sendMail = require('../services/mailer');

module.exports = {
  sendEmail(req, res, next) {
    const { values, tourData } = req.body;
    console.log(values);
    console.log(tourData);

    const emails = [];

    tourData.forEach((customer) => {
      emails.push(customer.email);
    });
    console.log(emails);

    // XXX: Uncomment to send
    // sendMail(values, emails);
    // console.log('sendMail contoller');
  },
};
