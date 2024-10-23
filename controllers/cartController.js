const productModel = require('../models/productModel')
const cartModel = require('../models/cartModel')
const addcart = async (req, res) => {
    try {
        let id = req.query.productId
        // console.log(id);
        let product = await productModel.findById(id)
        console.log(product);
        let dup = await cartModel.findOne({ productId: id })
        if (dup) {
            return res.status(200).send({
                success: false,
                message: "Item already in cart"
            })
        }
        const carts = await cartModel.create({
            product: product.product,
            productId: id,
        })

        res.status(200).send({
            success: true,
            message: "Cart Add Successfully",
            carts

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
}
const viewcart = async (req, res) => {
    try {
        let carts = await cartModel.find({})

        res.status(200).send({
            success: true,
            message: "Cart view Successfully",
            carts

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
}
const deletecart = async (req, res) => {
    try {
        let id = req.query.id
        await cartModel.findByIdAndDelete(id)

        res.status(200).send({
            success: true,
            message: "Cart delete Successfully",

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
}
const updatecart = async (req, res) => {
    try {
        const { id, product } = req.body
        console.log(id)
        // console.log(req.body);
        await cartModel.findByIdAndUpdate(id, {
            product: product
        });
        res.status(200).send({
            success: true,
            message: "Cart update Successfully",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })

    }
}

module.exports = {
    addcart,
    viewcart,
    deletecart, updatecart
}