const express = require('express');
const { addproduct, viewproduct, deleteproduct, updateproduct } = require('../controllers/ProductController');

const routes = express.Router();
const multer = require('multer');

const storege = multer.diskStorage({});

const fileUpload = multer({ storage: storege }).single("image");


routes.post('/addproduct',fileUpload,addproduct)
routes.get('/viewproduct',viewproduct)
routes.delete('/deleteproduct',deleteproduct)
routes.put('/updateproduct',fileUpload,updateproduct)

module.exports = routes


