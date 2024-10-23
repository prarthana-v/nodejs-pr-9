const express = require('express');
const { addcategory, viewcategory, deletecategory,updatecategory } = require('../controllers/CategoryController');

const routes = express.Router();

routes.post('/addcategory',addcategory)
routes.get('/viewcategory',viewcategory)
routes.delete('/deletecategory',deletecategory)
routes.put('/updatecategory',updatecategory)


module.exports = routes


