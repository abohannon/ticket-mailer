const nodemailer = require('nodemailer');
const keys = require('../config/keys');

const sendMail = (values, emails) => {
  const {
    checkin, start, pickup, shipping, shippingDate, digital, digitalDate,
  } = values;

  const transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: keys.mailgunUser,
      pass: keys.mailgunPass,
    },
  });

  const message = {
    from: 'ticketmailer@showstubs.com',
    to: emails, // comma separated list
    subject: 'Your VIP entry to TOUR NAME',
    html: `
      <h3>Check in time</h3>
      <p>${checkin}</p>
      <h3>Start time</h3>
      <p>${start}</p>
      <h3>Items to pickup at venue</h3>
      <p>${pickup}</p>
      <h3>Items shipping</h3>
      <p>${shipping}</p>
      <h3>Expected ship date</h3>
      <p>${shippingDate}</p>
      <h3>Digital items</h3>
      <p>${digital}</p>
      <h3>Expected digital delivery date</h3>
      <p>${digitalDate}</p>
    `,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Sent: ${info.response}`);
    }
  });
};

module.exports = sendMail;
