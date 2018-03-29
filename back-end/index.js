const Hapi = require('hapi');
const chalk = require('chalk');
const mysql = require('mysql');
const fs = require('fs');
const config = require('./config');
const dbConfig = require('./dbConfig');

const server = new Hapi.Server();
server.connection(config);

const normalizedPath = require('path').join(__dirname, 'routes');

fs.readdirSync(normalizedPath).forEach(function(file) {
  const route = require(`./routes/${file}`);
  server.route(route);
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(chalk.cyan(`Server running at: ${server.info.uri}`));
});
