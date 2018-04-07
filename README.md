![Homepage](https://github.com/abohannon/ticket-mailer/blob/develop/screenshots/Screen%20Shot%202018-02-26%20at%2011.56.23%20AM.png) 

# Ticket Mailer
> Custom Shopify app designed for SHOWstubs.com

Ticket Mailer is a custom MERN app designed specifically for SHOWstubs.com to send VIP concert tickets to customers based on their order details.

The primary stack for this app is React, Node, Express, and MongoDB.

The UI is designed primarily using Material UI - http://www.material-ui.com/

## Caveats

This is my first large app so I apologize in advance if the code or project structure isn't optimal for open source consumption. I do appreciate any feedback, issues, and PRs. Over time I plan to refactor a lot of the code and improve it's open source presence in general. Thank you for your understanding!

## Installing / Getting started

To get up and running:

```shell
cd server
npm run dev
```

The above command will start the Node server as well as start react-scripts and launch the app on localhost:3000.

### Create user account

Since you'll be using your own db, no user accounts will exist initially.

Once the app is running, navigate to `/signup` and create an account. Then `/login` and login with your credentials.

## Developing

To install:

```shell
https://github.com/abohannon/ticket-mailer.git
cd ticket-mailer/
npm install
```
In order to successfully launch and develop the app, you will need the following in a dev.js file in the server/config dir:

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
Relevant links:

* Shopify App Developer Program - https://developers.shopify.com/
* mLab - https://mlab.com/
* Mailgun - https://www.mailgun.com/

### Shopify Settings

Once you've created your custom Shopify app, you'll need to set the following options in the settings section to "Read Access"

* Store content like articles, blogs, comments, pages, and redirects
* Customer details and customer groups
* Orders, transactions and fulfillments
* Product information
* Products, variants and collections

Also make sure the box is checked next to "Allow this app to access your storefront data using the Storefront API" at the bottom of this admin page.

### Building

To build the project, change into the client directory and run npm run build.

```shell
cd server/client
npm run build
```
React build script will run and save assets in the client/build directory.

### Testing

(In progress. Currently,  not all tests are implemented.)

To start the tests, run the following command:

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

![Tour Page](https://raw.githubusercontent.com/abohannon/ticket-mailer/develop/screenshots/Screen%20Shot%202018-02-26%20at%2011.52.05%20AM.png) 

![Shows Page](https://github.com/abohannon/ticket-mailer/blob/develop/screenshots/Screen%20Shot%202018-02-26%20at%2011.52.47%20AM.png?raw=true) 

![Orders Page](https://github.com/abohannon/ticket-mailer/blob/develop/screenshots/Screen%20Shot%202018-02-26%20at%2011.53.17%20AM.png?raw=true) 

![Email Edit Page](https://github.com/abohannon/ticket-mailer/blob/develop/screenshots/Screen%20Shot%202018-02-26%20at%2011.55.40%20AM.png?raw=true) 

![Email Confirm Page](https://github.com/abohannon/ticket-mailer/blob/develop/screenshots/Screen%20Shot%202018-02-26%20at%2011.55.57%20AM.png) 

More screenshots here: https://www.behance.net/gallery/62558537/Ticket-Mailer-App

## Future Considerations


## Contributing

If you find this project helpful as a starting point for your own project, please feel free to clone. If you are interested in submitting improvements, PRs are welcome!


## Links

- Repository: https://github.com/abohannon/ticket-mailer
- Issue tracker: https://github.com/abohannon/ticket-mailer/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    abo46n2@gmail.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!

## Licensing

The code in this project is licensed under MIT license.
