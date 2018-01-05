const nodemailer = require('nodemailer')
const keys = require('../config/keys')

const sendMail = (content) => {
  const { subject, text } = content
  const transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: keys.mailgunUser, // postmaster@sandbox[base64 string].mailgain.org
      pass: keys.mailgunPass, // You set this.
    },
  });
  const message = {
    from: 'no-reply@test2.com',
    to: 'abo46n2@gmail.com', // comma separated list
    subject,
    text,
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
