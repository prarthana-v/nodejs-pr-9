const express = require('express');
const { addsubcategory, viewsubcategory, updatesubcategory, deletesubcategory } = require('../controllers/SubcategoryController');

const routes = express.Router();

routes.post('/addsubcategory',addsubcategory)
routes.get('/viewsubcategory',viewsubcategory)
routes.delete('/deletesubcategory',deletesubcategory)
routes.put('/updatesubcategory',updatesubcategory)


module.exports = routes


