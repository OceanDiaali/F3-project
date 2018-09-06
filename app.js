import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// get all orders
app.get('/api/v1/orders', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'successfully got all the orders',
    orders: db
  })
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

// post order with :POST
app.post('/api/v1/orders', (req, res) => {
  if(!req.body.name) {
    return res.status(400).send({
      success: 'false',
      message: 'name is required'
    });
  } else if(!req.body.quantity) {
    return res.status(400).send({
      success: 'false',
      message: 'quantity is required'
    });
  }
 const order = {
   id: db.length + 1,
   name: req.body.name,
   quantity: req.body.quantity
 }
 db.push(order);
 return res.status(201).send({
   success: 'true',
   message: 'order added successfully',
   order
 })
});

// get a single order with :GET
app.get('/api/v1/orders/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((order) => {
    if(order.id === id) {
      return res.status(200).send({
        success: 'true',
        message: `successfully retrieved order number ${id}`,
        order: order
      });
    }
  });
  return res.status(404).send({
    success: 'false',
    message: `order with the name ${name} is unavailable`
  });
});

// update with :PUT
app.put('/api/v1/orders/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let orderFound;
  let itemIndex;
  db.map((order, index) => {
    if (order.id === id) {
      orderFound = order;
      itemIndex = index;
    }
  });

  if (!orderFound) {
    return res.status(404).send({
      success: 'false',
      message: 'order not found',
    });
  }

  if (!req.body.name) {
    return res.status(400).send({
      success: 'false',
      message: 'name is required',
    });
  } else if (!req.body.quantity) {
    return res.status(400).send({
      success: 'false',
      message: 'quantity is required',
    });
  }

  const updatedOrder = {
    id: orderFound.id,
    name: req.body.name || orderFound.name,
    quantity: req.body.quantity || todoFound.quantity,
  };

  db.splice(itemIndex, 1, updatedOrder);

  return res.status(201).send({
    success: 'true',
    message: 'order added successfully',
    updatedOrder,
  });
});
