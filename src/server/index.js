const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes');
const db = require('./dbdata.js');


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('dist'));
db.initDB();

app.get('/api/getalltranscation', routes.getAllTransactions);
app.get('/api/getunprocessedtranscation', routes.getUnprocessedTransaction);
app.post('/api/updatetransaction', routes.updatetransaction);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
