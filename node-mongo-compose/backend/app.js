const express = require('express');
const restful = require('node-restful');
const mongoose = restful.mongoose;
const server = express();

// database
mongoose.Promise = global.Promise; // Use native promises
mongoose.connect('mongodb://db/mydb'); // "db" = nome do serviço no docker-compose

// rroute teste
server.get('/', (req, res, next) => res.send('hello everybody!"'));

// port
server.listen(3000, () => console.log('Backend rodando na porta 3000'));
