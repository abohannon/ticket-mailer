const keys = require('../config/keys');
const mailgun = require('mailgun-js')({
  apiKey: keys.mailgunPrivateAPIKey,
  domain: keys.mailgunDomain,
});

const sendMail = (formValues, emails, currentTourData, userVars) => {
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
    html: `
      <h3>Band</h3>
      <p>%recipient.vendor%</p>
      <h3>Show Date</h3>
      <p>%recipient.showDate%</p>
      <h3>Bundle Type</h3>
      <p>%recipient.bundleType%</p>
      <h3>Quantity</h3>
      <p>%recipient.quantity%</p>
      <h3>First Name</h3>
      <p>%recipient.first%</p>
      <h3>Order #</h3>
      <p>%recipient.orderNum%</p>
      <h3>Email</h3>
      <p>%recipient%</p>
      <h3>Check in time</h3>
      <p>${checkin}</p>
      <h3>Start time</h3>
      <p>${start}</p>
      <h3>Event notes</h3>
      <p>${eventNotes}</p>
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

  mailgun.messages().send(message, (error, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(body);
    }
  });
};

module.exports = sendMail;
