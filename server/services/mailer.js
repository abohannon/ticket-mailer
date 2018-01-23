const nodemailer = require('nodemailer');
const keys = require('../config/keys');

const sendMail = (formValues, emails, currentTourData, userVars) => {
  const {
    checkin,
    start,
    pickup,
    shipping,
    shippingDate,
    digital,
    digitalDate,
  } = formValues;

  const { tourTitle, dateTitle, variantTitle } = currentTourData;

  const transporter = nodemailer.createTransport({
    service: 'Mailgun',
    port: 587,
    auth: {
      user: keys.mailgunUser,
      pass: keys.mailgunPass,
    },
  });

  const message = {
    headers: {
      'X-Mailgun-Recipient-Variables': JSON.stringify(userVars),
    },
    from: 'ticketmailer@showstubs.com',
    to: emails, // TODO: NOT WORKING. Passing all emails.
    subject: `Your SHOWstubs VIP entry to ${dateTitle}`,
    text:
      'Hey %recipient.first%, your order number is %recipient.orderNum%. Your email is %recipient%.',
    // html: `
    //   <h3>First Name</h3>
    //   <p>%recipient.first%</p>
    //   <h3>Order #</h3>
    //   <p>%recipient.orderNum%</p>
    //   <h3>Check in time</h3>
    //   <p>${checkin}</p>
    //   <h3>Start time</h3>
    //   <p>${start}</p>
    //   <h3>Items to pickup at venue</h3>
    //   <p>${pickup}</p>
    //   <h3>Items shipping</h3>
    //   <p>${shipping}</p>
    //   <h3>Expected ship date</h3>
    //   <p>${shippingDate}</p>
    //   <h3>Digital items</h3>
    //   <p>${digital}</p>
    //   <h3>Expected digital delivery date</h3>
    //   <p>${digitalDate}</p>
    // `,
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
