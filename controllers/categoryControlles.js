import { Category } from "../models/category.js";

export const createCategoryController = async(req,res) => {
   try {
    const { title , imageUrl} = req.body;
    // validation
    if(!title) {
        return res.status(400).send({
            success : false,
            msg : "Kindly Proved the title field",
        })
    }
    const category = new Category({ title , imageUrl});
    await category.save();

    res.status(201).send({
        success : true,
        msg : "New Category Created Successfully",
        category
    })
   } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in creating category api",
            error
        })
   }
}


export const getAllCategories = async(req,res) => {
    try {
        const categories = await Category.find({});
        if(!categories.length){
            return res.status(404).send({
                success : false,
                msg : "Not categories availabe",
            })
        }
        res.status(200).send({
            success : true,
            msg : "Here it is",
            categories,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in Getting category api",
            error
        })
    }
}

export const updateCategory = async(req,res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl} = req.body;
        const category = await Category.findByIdAndUpdate(id,{title, imageUrl});
        if(!category) {
            return res.status(404).send({
                success : false,
                msg : "category not found",
            })
        }
        res.status(200).send({
            success: true,
            msg : "Category updated successfully",
            category,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in Update category api",
            error
        })
    }
}


export const deleteCategory = async(req,res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success : true,
            message : "Category is Deleted Successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in delete Category Api",
            error
        })
    }
}