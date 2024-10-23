const ProductModel = require('../models/productModel');
const subcategory = require('../models/subcategoryMolel');
const cloudinary = require('cloudinary').v2;

const addproduct = async (req, res) => {
    try {
        const { category, subcategory, product, price, description } = req.body;
        // console.log(req.file.path);
        console.log(req.body);

        const imageUpload = await cloudinary.uploader.upload(req.file.path);
        // console.log(imageUpload);

        if (!category || !subcategory || !product || !price || !description) {
            return res.status(400).send({
                success: false,
                message: "All fields (category, name, price, description) are required."
            });
        }

        await ProductModel.create({
            categoryId: category,
            subcategoryId: subcategory,
            product: product,
            price: price,
            description: description,
            image: imageUpload.secure_url,
            public_id: imageUpload.public_id

        })
        res.status(200).send({
            success: true,
            message: "product Added Successfully"

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
}
const viewproduct = async (req, res) => {
    try {
        const products = await ProductModel.find({}).populate('categoryId').populate('subcategoryId');
        res.status(200).send({
            success: true,
            message: "product fetch Successfully",
            products

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
}

const deleteproduct = async (req, res) => {
    try {
        let id = req.query.id;
        // console.log(id);
        let old = await ProductModel.findById(id);

        await cloudinary.uploader.destroy(old.public_id);

        await ProductModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "product Delete Successfully"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
}
const updateproduct = async (req, res) => {
    try {
        let editid = req.body.id;
        const { category,subcategory, product, price, description } = req.body;
        if (req.file) {
            let old = await ProductModel.findById(editid);
            await cloudinary.uploader.destroy(old.public_id);

            let image = await cloudinary.uploader.upload(req.file.path)

            await ProductModel.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                product: product,
                price: price,
                description: description,
                image: image.secure_url,
                public_id: image.public_id
            })
            return res.status(200).send({
                success: true,
                message: "Product successfully update",
            })
        } else {
            let old = await ProductModel.findById(editid);
            await ProductModel.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                product: product,
                price: price,
                description: description,
                image: old.image,
                public_id: old.public_id
            })
            return res.status(200).send({
                success: true,
                message: "Product successfully update",
            })
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}

module.exports = {
    addproduct, viewproduct, deleteproduct, updateproduct
}