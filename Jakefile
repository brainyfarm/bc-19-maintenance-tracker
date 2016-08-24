const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

desc('This is the default task.');
task('default', [], (params) => {
  console.log('This is the default task.');
});

desc('Setup the project');
task('setup', [], (params) => {

});

namespace('db', () => {

  desc('create a database');
  task('init', (params) => {
    const pg = require('pg');

    const client = new pg.Client();

    client.connect((err) => {
      if (err) throw err;

      client.query(`SELECT 1 from pg_database WHERE datname='${config.database}'`, (err, result) => {
          if (err) throw err;
          
          if(result.rowCount !== 0) {
            console.log(`Database: ${config.database} already exist.`);
            client.end();
          } else {
            // create database
            client.query(`CREATE DATABASE ${config.database}`, (err, result) => {
              if (err) throw err;
              
              console.log(`Database: ${config.database} created.`);
              client.end();
            });
          }
      })

    });

  });

  desc('drop a database');
  task('drop', (params) => {
    const pg = require('pg');

    const client = new pg.Client();

    client.connect((err) => {
      if (err) throw err;

      // drop database
      client.query(`DROP DATABASE ${config.database}`, (err, result) => {
        if (err) throw err;

        console.log(`Database: ${config.database} deleted.`);
        client.end();
      });

    });

  });
});
