This project was bootstrapped with

## Table of Contents

- [Setup](#setup)
- [Config Files](#config-files)

## Setup

This application is made up of two separate Node applications:

* `front-end` was created using [create-react-app](https://github.com/facebookincubator/create-react-app) and controls the UI of the application.
* `back-end` is an API to query data from the SQL database and is used by the front end to fetch data relating to users, courses, the TA draft survey, and more.

In order to use the application, run the following command in both the `front-end` and `back-end` directories:

```sh
$ npm start
```

## Config Files
The `front-end` currently runs at http://localhost:3000/ since this is the default port from a create-react-app application and the `back-end` currently runs at http://localhost:8080/. The `back-end` can be configured to change this port by editing the specified port in `config.js`, and the SQL database can be reconfigured by modifying `dbConfig.js`.

Both applications run such that editing and saving a file during runtime will cause the application to restart, so neither Node application will need to be restarted for changes during development
