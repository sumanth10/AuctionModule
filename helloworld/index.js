'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT;


// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/health', (req, res) => {
  res.status(200).json({ 'status': 'UP' });
});

app.listen(PORT, () => {
    console.info(`server started on port ${PORT}`); 
  });
