const express = require('express');
const app = express();
const DB_CONNECT = require('./config/db');

require('dotenv').config();
DB_CONNECT();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/contact', require('./routes/contact'));

app.listen(process.env.PORT);
