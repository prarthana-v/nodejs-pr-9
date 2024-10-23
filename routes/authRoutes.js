const express = require('express');
const { register, login } = require('../controllers/AuthController');

const routes = express.Router();
const {veryfyToken} = require('../middleware/Auth') 

routes.post('/register',register);
routes.post('/login',veryfyToken,login);

module.exports = routes


