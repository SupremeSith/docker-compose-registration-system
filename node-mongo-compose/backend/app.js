// Core imports
const express = require('express');
const restful = require('node-restful');
const mongoose = restful.mongoose;
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();


// Database connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/mydb', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));


// Middlewares
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure CORS 
server.use(cors());

// Test route
server.get('/', (req, res) => res.send('Welcome to the Client Management API!'));


const Client = restful.model('Client', {
    name: { type: String, required: true },
    telephone: { type: Number, required: true }, // Added Telephone (assuming number type for simplicity)
    status: { type: String, required: true }      // Added Status
});
// ---------------------

Client.methods(['get', 'post', 'put', 'delete']);


// endpoint
Client.register(server, '/clients');


// Server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));