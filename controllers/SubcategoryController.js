const subcategoryModel = require('../models/subcategoryMolel')
const addsubcategory = async(req,res) =>{
    try {
        // console.log(req.body);
        const {category,subcategory} = req.body;
        await subcategoryModel.create({
            categoryId:category,
            subcategory:subcategory
        })   
        res.status(200).send({
            success: true,
            message: "subcategory Added Successfully"

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })   
    }
}
const viewsubcategory = async(req,res) =>{
try {
    const subcategory = await subcategoryModel.find().populate('categoryId')
    res.status(200).send({
        success: true,
        message: "subcategory view Successfully",
        subcategory

    })
} catch (error) {
    res.status(500).send({
        success: false,
        message: error
    })  
}
}
const deletesubcategory = async(req,res)=>{
    try {
        const id = req.query.id;
        await subcategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "subcategory deleted Successfully"
            })
            } catch (error) {
                res.status(500).send({
                    success: false,
                    message: error
                    })
                }


}
const updatesubcategory = async (req,res) =>{
    try {
        const {id,subcategory} = req.body;
        const update = await subcategoryModel.findByIdAndUpdate(id,{
                subcategory:subcategory
            })
            res.status(200).send({
                success: true,
                message: "subcategory Updated Successfully",
                update
                })
                } catch (error) {
                    res.status(500).send({
                        success: false,
                        message: error
                        })
                    }
}
module.exports = {addsubcategory,viewsubcategory,deletesubcategory,updatesubcategory}