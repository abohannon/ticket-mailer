# Ticket Mailer
> Custom Shopify app designed for SHOWstubs.com

Ticket Mailer is a custom MERN app designed specifically for SHOWstubs.com to send VIP concert tickets to customers after they purchase their VIP ticket bundles.

The app is built with React, Node, mongoDB, mongoose, express

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
cd server
npm run dev
```

The above command will start the Node server as well as start react-scripts and launch the app on localhost:3000.

## Developing

To install:

```shell
https://github.com/abohannon/ticket-mailer.git
cd ticket-mailer/
npm install
```
In order to successfully launch and develop the app, you will need the following in a dev.js file:

```
module.exports = {
  shopName: [shopifystorename],
  apiKey: [shopifyappapikey],
  password: [shopifyapppassword],
  mongoURI:[mongodbURI],
  cookieKey: [randomstring],
  mailgunUser: [mailgunuseraddress],
  mailgunPass: [mailgunpassword],
  mailgunPrivateAPIKey: [mailgunprivateAPIkey],
  mailgunDomain: [mailgunsandboxdomain],
};
```
Shopify App Developer Program (https://developers.shopify.com/)
mLab (https://mlab.com/)
Mailgun (https://www.mailgun.com/)

### Building

To build the project, change into the client directory and run npm run build.

```shell
cd server/client
npm run build
```
React build script will run and save assets in the client/build directory.

### Testing

To start the test, run the following command:

```shell
cd server
npm run test
```

## Features

* User can view current tours currently live in Shopify (collections)
* User can click each tour and see the show dates available and their available bundles (products & variants)
* User can click a bundle and see all orders and customer information
* From this page, user can edit the email fields for that particular show date and bundle type. Once finished, they may review
their inputs before sending to all customers who ordered that particular bundle.
* After this email is sent, it is saved to the db and from here the user can now send the email to individuals if necessary or edit and re-send
* Each order list page shows a 'last sent' status so the user knows if the email has been sent
* A history page shows a record of all emails that have been sent and the date
* An order page exists that shows all orders regardless of show date, variant, etc. User can use the search on this page to find a particular customer or order # and click through to the relevant show date and bundle page for that customer
* User can login and logout and remain authenticated while their cookie is valid.

## Future Considerations


## Contributing

If you find this project helpful as a starting point for your own project, please feel free to clone. If you are interested in submitting improvements, PRs are welcome!

## Links

Even though this information can be found inside the project on machine-readable
format like in a .json file, it's good to include a summary of most useful
links to humans using your project. You can include links like:

- Repository: https://github.com/abohannon/ticket-mailer
- Issue tracker: https://github.com/abohannon/ticket-mailer/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    abo46n2@gmail.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!

## Licensing

The code in this project is licensed under MIT license.
