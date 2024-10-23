const express = require('express')

const routes = express.Router();
const {veryfyToken} = require('../middleware/Auth')

routes.use('/',require('./authRoutes'))
routes.use('/category',veryfyToken,require('./categoryRoutes'))
routes.use('/subcategory',veryfyToken,require('./subcategoryRoutes'))
routes.use('/product',veryfyToken,require('./productRoutes'))
routes.use('/cart',veryfyToken,require('./cartRoutes'))

routes.use('/forgot',veryfyToken,require('./forgotRoutes'))


module.exports = routes;