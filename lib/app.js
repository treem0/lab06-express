const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/recipes', require('./routes/recipe'));
app.use('/api/v1/events', require('./routes/event'));

module.exports = app;
