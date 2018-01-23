const sendMail = require('../services/mailer');

module.exports = {
  sendEmail(req, res, next) {
    const { formValues, orderData, currentTourData } = req.body;
    // Regex for email validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log(formValues);
    console.log(orderData);
    console.log(currentTourData);

    const emails = [];
    const userVars = {};

    orderData.forEach((customer) => {
      // Test if valid email
      if (re.test(customer.email)) {
        emails.push(customer.email);
      }

      userVars[customer.email] = {
        first: customer.shipping_address.first_name,
        fullName: customer.shipping_address.name,
        orderNum: customer.name,
        bundleType: customer.line_items[0].variant_title,
        quantity: customer.line_items[0].quantity,
        showDate: customer.line_items[0].title,
        vendor: customer.line_items[0].vendor,
      };
    });

    // XXX: Uncomment to send
    sendMail(formValues, emails, currentTourData, userVars);
    console.log('sendMail controller');
  },
};
