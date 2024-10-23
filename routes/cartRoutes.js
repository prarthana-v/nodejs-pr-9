const express = require('express');
const { addcart, viewcart, deletecart, updatecart } = require('../controllers/cartcontroller');

const routes = express.Router();

routes.post('/addcart',addcart)
routes.get('/viewcart',viewcart)
routes.delete('/deletecart',deletecart)
routes.put('/updatecart',updatecart)


module.exports = routes


