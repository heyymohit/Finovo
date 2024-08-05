const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

// Use CORS middleware
app.use(cors({
    origin: 'https://finovo-lac.vercel.app', // Allow only your Vercel frontend
    // origin: '*' // Alternatively, allow requests from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to handle cookies or other credentials
}));

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');

const app = express();

app.use(express.json()); //Middleware -> request body parser

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));    //dev gives the methods
}

app.use('/api/v1/transactions', transactions);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));    //

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));  //__dirname -> current dir, go to client -> build -> index.html
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));


