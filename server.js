const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());


// Use the ItemsAPI router for all /items routes
const itemsAPIRouter = require('./Items/ItemsAPI');
app.use('/items', itemsAPIRouter);

// Use the PaymentOptionAPI router for all /payment-options routes
const paymentOptionAPIRouter = require('./PaymentOption/PaymentOptionAPI');
app.use('/payment-options', paymentOptionAPIRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
