const mongoose = require('mongoose');
const sendMail = require('../services/mailer');

module.exports = {
  sendEmail(req, res, next) {
    const { formValues, orderData, currentTourData } = req.body;

    console.log(formValues);
    console.log(orderData);
    console.log(currentTourData);

    const emails = [];
    const userVars = {};

    orderData.forEach((customer) => {
      emails.push(customer.email);

      userVars[customer.email] = {
        first: customer.shipping_address.first_name,
        orderNum: customer.name,
      };
    });

    console.log(emails);
    console.log(JSON.stringify(userVars));

    // XXX: Uncomment to send
    sendMail(formValues, emails, currentTourData, userVars);
    console.log('sendMail controller');
  },
};
