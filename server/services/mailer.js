const nodemailer = require('nodemailer')
const keys = require('../config/keys')

const sendMail = () => {
  const transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: keys.mailgunUser, // postmaster@sandbox[base64 string].mailgain.org
      pass: keys.mailgunPass, // You set this.
    },
  });
  const message = {
    from: 'no-reply@test.com',
    to: 'abo46n2@gmail.com', // comma separated list
    subject: 'Testing node mailer',
    text: 'Text contents.',
    html: '<b>Text contents.</b>',
  };
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Sent: ${info.response}`);
    }
  });
};

module.exports = sendMail
