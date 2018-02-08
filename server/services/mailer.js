const ejs = require('ejs');
const keys = require('../config/keys');
const mailgun = require('mailgun-js')({
  apiKey: keys.mailgunPrivateAPIKey,
  domain: keys.mailgunDomain,
});

const sendMail = (formValues, emails, currentTourData, userVars) => {
  const path = `${__dirname}/emailTemplates/ticket.ejs`;

  const {
    checkin,
    start,
    eventNotes,
    pickup,
    shipping,
    shippingDate,
    digital,
    digitalDate,
  } = formValues;

  const { dateTitle } = currentTourData;

  const message = {
    'recipient-variables': JSON.stringify(userVars),
    from: 'ticketmailer@showstubs.com',
    to: emails,
    subject: `Your SHOWstubs VIP entry to ${dateTitle}`,
    html: ejs.renderFile(path, {
      band: '%recipient.vendor%',
      showDate: '%recipient.showDate%',
      bundleType: '%recipient.bundleType%',
      quantity: '%recipient.quantity%',
      fullName: '%recipient.fullName%',
      orderNum: '%recipient.orderNum%',
      email: '%recipient%',
      qrCode: false, // TODO: Update when file upload is implemented
      checkin,
      start,
      eventNotes,
      pickup,
      shipping,
      shippingDate,
      digital,
      digitalDate,
    }, (err, str) => {
      if (err) console.log('Error with ejs render', err)
      return str
    }),
  };

  mailgun.messages().send(message, (error, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(body);
    }
  });
};

module.exports = sendMail;
