'use strict'
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Your final project front end is running on port ${port}`);
})
