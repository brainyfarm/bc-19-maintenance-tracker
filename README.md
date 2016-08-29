# Maintenance Tracker
[![Build Status](https://travis-ci.org/azemoh/bc-19-maintenance-tracker.svg?branch=master)](https://travis-ci.org/azemoh/bc-19-maintenance-tracker)

## Introduction

Maintenance Tracker is a system that allows reporting of maintenance and repairs request, and helps track the maintenance process from submission to resolution.
Users are able to request for repairs or maintenance of their facilities. These request are later managed by an Administrator who is able to assign experts to work on each request. The Admin is also able to approve, reject or resolve each request.
A live version is available on [Heroku](https://maintenance-tracker.herokuapp.com).

## Features

- User Authentication and role-based authorisation. 
- Repairs/Maintenance requests.
- Image upload for each request.
- Commenting feature.
- Admin can add Experts to the system.
- Request rejection, approval and resolution by an Admin user.
- SMS notifications for experts assigned to each request.


## Technologies

### Backend
- [Node.js](nodejs.org) - A JavaScript runtime for building server-side JavaScript applications.
- [Express](http://expressjs.com/) - A minimal and flexible Node.js web application framework. 
- [Postgresql](https://www.postgresql.org/) - An open source relational database. 
- [Sequelize](http://docs.sequelizejs.com/en/v3/) - A promise based Object Relational Mapper that helps map JavaScript models to database tables and objects to database records.
- [Jusibe](https://github.com/azemoh/jusibe) - A Node.js module for consuming [Jusibe.com](https://jusibe.com) API service. - Written by yours faithfully 😉.

### Front-end
- [Material Design Lite](https://getmdl.io) - Google's Material design lite CSS Library. Used for styling.

### Third-Party Integration
- [Jusibe](https://jusibe.com) - A local API service that allows you to send SMS using a REST API, used to send SMS notifications to experts assigned to maintenance requests.
- [Cloudinary](https://cloudinary.com) - A Service that provides an API for cloud media storage. Used to store images uploaded by users.


## Setup
Before we begin, ensure you have the required softwares to run this application.

### Dependencies.
- [Node.js](nodejs.org) - A version with ECMAScript 2015 (ES6) support. This app have been [tested](https://travis-ci.org/azemoh/bc-19-maintenance-tracker) on version 4.5.0, so any version above that should be fine.
- [Postgresql](https://www.postgresql.org/) is available on their website [https://www.postgresql.org/](https://www.postgresql.org/).
- Install [Bower](https://bower.io/) to manage front-end dependencies.

> Run `npm install -g bower`.

- Install [Sequelize-CLI](https://github.com/sequelize/cli) tool to help manage database migrations. 
> Run `npm install -g sequelize-cli`.

- Install [Jake](https://github.com/jakejs/jake) JavaScript build tool, similar to Make or Rake for Ruby. Used to create the Database for development.
> Run `npm install -g jake`.

## Local development.

1. Clone this repository locally by running

> `git clone https://github.com/azemoh/bc-19-maintenance-tracker.git`

2. Navigate into the project folder `cd bc-19-maintenance-tracker`.

3. Install required nodejs packages by running
> `npm install`

4. Install Front-end libraries with __bower__
> `bower install`

5. Rename the `.env-sample` file in the root directory to `.env` and provide the appropriate access keys and tokens.

6. Create the Database by running: (Ensure __Postgres__ is running)
> `npm run db-init`

7. Execute database migrations by running:
> `npm run db-migrate`

8. Finally run the app.
> `npm start`

## Testing
Mocha is used to run the test and Chai is used to make assertions.
to run the test, execute for the terminal.

> `npm test`

```bash
    #role
      ✓ assign default user role (71ms)
    .create
      ✓ creates user and hashes password (67ms)
    #firstName
      ✓ returns correct first name
    .validPassword
      ✓ validate user password (118ms)


  18 passing (3s)
```
