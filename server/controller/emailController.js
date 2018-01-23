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
        fullName: customer.shipping_address.name,
        orderNum: customer.name,
        bundleType: customer.line_items[0].variant_title,
        quantity: customer.line_items[0].quantity,
        showDate: customer.line_items[0].name,
        vendor: customer.line_items[0].vendor,
      };
    });

    // XXX: TESTING
    // userVars['mgbox01@gmail.com'] = {
    //   first: 'mailgun',
    //   orderNum: '#123',
    // };
    // emails.push('mgbox01@gmail.com');

    console.log('Contr: emails', emails);
    console.log('Contr: userVars', userVars);

    // XXX: Uncomment to send
    // sendMail(formValues, emails, currentTourData, userVars);
    // console.log('sendMail controller');
  },
};
