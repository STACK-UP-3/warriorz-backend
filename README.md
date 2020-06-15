# Warriorz Barefoot Nomad (Backend)

[![Protected by Hound](https://img.shields.io/badge/Protected_by-Hound-a873d1.svg)](https://houndci.com)
[![Build Status](https://travis-ci.com/STACK-UP-3/warriorz-backend.svg?branch=develop)](https://travis-ci.com/STACK-UP-3/warriorz-backend)
[![Coverage Status](https://coveralls.io/repos/github/STACK-UP-3/warriorz-backend/badge.svg?branch=develop)](https://coveralls.io/github/STACK-UP-3/warriorz-backend?branch=develop)

## Vision

Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

## Technologies used

 `Node Express` : the core back end technology  
 `Heroku`: Used to host our app online
 `Es6+` Following ES6 syntax. and AirBnB styling guide  
 `PostgreSQL` Is used as our database management tool  
 `Swagger` Used for API documentation.  
 `Pivotal Tracker` A project management tool used to manage the app.  
 `Npm` Used as the package manager for the app. A fast, reliable, and secure dependency management system.  

## UI Design

The mockups for the app design can be viewed [here](https://www.figma.com/proto/8loservHDJJ6sicKAimq37/Barefoot-Nomad?node-id=342%3A285&scaling=min-zoom)

## Frontend

The frontend Repo can be viewed [here](https://github.com/STACK-UP-3/warriors-frontend)

## REST API Docs

The Api documentation is done using swagger. click [here](https://warriorz-staging.herokuapp.com/api-docs) to View Barefoot Nomad API Documentation

## Tests setup and execution

The project use MOCHA and CHAI for testing.  
All tests are located in `./server/tests/**.test.js`  
To run tests run:

* Unix/Linux: `npm test`
* Windows: `npm run win:test`

## Installation and usage instructions with Node

* Clone the repository using: `https://github.com/STACK-UP-3/warriorz-backend.git`  
* Copy the file ***.env.example*** then rename it to ***.env*** input the right credentials.  
* Run `npm install` To install the project dependencies
* Run `npm run migration`(unix/linux) and `npm run win:devtable` to initialize the application tables.
* Run `npm run start:dev`(unix/linux) and `npm run win:start:dev`(windows) To start the application in ***development environment***  
* Run `npm start` for unix/linux only To start the application in ***production environment***
* Run `npm test`(unix/linux) and `npm run win:test` to run test  

## Features

* User can sign up
* User can log in
* User can login with facebook and google
* User can reset password
* User can edit their profile
* User can create requests
* admin can approve requests
* User can get travel information
* User can get notifications
* Travel admins can create accomodation facilities
* Pre screened suppliers/hosts should be able to create/add their accommodation facilities
* Users can book an accommodation facility
* Users should be able to provide feedback on accommodation(comment)
* Users should be able to chat on Barefoot Nomad.

## Contributors

### Technical Team Lead

> [DUSHIMIMANA Bernard](https://github.com/bdushimi)

### Warriorz Team
>
> [MUGOROZI Francois](https://github.com/Francois-MUGOROZI)
>
>[URIMUBENSHI Daniel](https://github.com/benshidanny11)
>
>[KABUNDEGE Christophe](https://github.com/kabundege)
>
>[MWUMVANEZA Arnold](https://github.com/fordarnold)
>
>[IRADUKUNDA Allelua Fiacre](https://github.com/irfiacre)
