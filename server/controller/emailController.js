const mongoose = require('mongoose');
const sendMail = require('../services/mailer');

const Email = mongoose.model('emails');

module.exports = {
  async sendEmail(req, res, next) {
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

    const emailData = new Email({
      tourName: currentTourData.tourTitle,
      showDate: currentTourData.dateTitle,
      vendor: currentTourData.vendor,
      bundleType: currentTourData.variantTitle,
      checkin,
      start,
      eventNotes,
      pickup,
      shipping,
      shippingDate,
      digital,
      digitalDate,
      recipients: emails.map(email => ({ email })),
      dateSent: Date.now(),
      _user: req.user.id,
    });

    try {
      await sendMail(formValues, emails, currentTourData, userVars);
      console.log('sendMail controller');
      await emailData.save();
      res.send('Email Send Success');
    } catch (err) {
      res.status(422).send(err);
    }
  },

  fetchEmails(req, res) {
    function formatDate(date) {
      const monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December',
      ];

      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();

      return `${day} ${monthNames[monthIndex]} ${year}`;
    }

    try {
      Email.find({}, (err, emails) => {
        const recentEmails = emails.reduce((emailList, email, i) => {
          emailList[i] = {
            date: formatDate(email.dateSent),
            tour: email.tourName,
            show: email.showDate,
            bundle: email.bundleType,
            vendor: email.vendor,
          }
          return emailList
        }, [])

        res.send(recentEmails.reverse())
      })
    } catch (err) {
      if (err) console.log('error fetching emails', err)
    }
  },

  fetchEmail(req, res) {
    try {
      Email.findOne({ showDate: req.params.id }, (err, email) => {
        if (err) console.log(err)
        res.send(email)
      })
    } catch (err) {
      if (err) console.log('error fetching email', err)
    }
  },
};
