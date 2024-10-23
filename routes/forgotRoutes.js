const express = require('express');
const { postEmail, postOtp, postNewPass, } = require('../controllers/forgotController');

const routes = express.Router();

routes.post('/postEmail',postEmail)
routes.post('/postOtp',postOtp)
routes.post('/postNewPass',postNewPass)



module.exports = routes


