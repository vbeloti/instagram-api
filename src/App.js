const express = require('express');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
require('./config/database');

// const app = express();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

class App {
  constructor() {
    this.app = express();
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.middlweares();
    this.socket();
    this.routes();
  }

  socket() {
    this.app.use((req, res, next) => {
      req.io = this.io;

      return next();
    });
  }

  middlweares() {
    this.app.use(cors());
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
    );
  }

  routes() {
    this.app.use(routes);
  }
}

// app.use((req, res, next) => {
//   req.io = io;

//   return next();
// });

// app.use(cors());

// app.use(
//   '/files',
//   express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
// );

// app.use(routes);

// server.listen(3333, () => {
//   console.log('Rodando!!!');
// });

module.exports = new App().server;
