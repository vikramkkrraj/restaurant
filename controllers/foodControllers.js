import { Food } from "../models/foodModel.js";

export const createFood = async(req,res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code, 
            isAvailabe,
            restaurant,
            rating ,
        } = req.body;

        if(!title || !description || !price || !restaurant){
            return res.status(403).send({success:false,msg : "Please Provide Required fields"});
        }
        const food = new Food({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code, 
            isAvailabe,
            restaurant,
            rating ,
        })
        await food.save();
        res.status(201).send({
            success : true,
            msg : "Food is created Successfully",
            food
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in Creating Food Api",
            error
        })   
    }
}

export const getAllFood = async(req,res) => {
    try {
        const food = await Food.find({});
        if(!food){
            return res.status(404).send({
                success : false,
                msg : "Food not Found",
            })
        }
        res.status(200).send({
            success : true,
            totalFood : food.length,
            food,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in get all food Api",
            error,
        })
    }
}

// get food by food id
export const getFoodById =async(req,res) => {
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(403).send({
                success : false,
                msg : "Please Provide the Food ID",
            })
        }
        const food = await Food.findById(foodId);
        if(!food){
            return res.status(404).send({
                success : false,
                msg : "Food not Found with this id"
            })
        }
        res.status(200).send({
            success :true,
            food,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in get single food Api",
            error,
        })
    }
}

// get food by restaurant id
export const getFoodByRestaurantID = async(req,res) => {
    try {
        const restaurantID = req.params.id;
        if(!restaurantID){
            return res.status(403).send({
                success:false,
                msg : "please provide the restaurant id",
            })
        }
        const food = await Food.find({ restaurant : restaurantID });
        if(!food) {
            return res.status(404).send({
                success : false,
                msg : "Food not found in giving restaurant"
            })
        }

        res.status(200).send({
            success : true,
            msg : "Food based on restaurant",
            food
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in get single food by restaurantId Api",
            error,
        })
    }
} 

export const updateFoodById = async(req,res)=> {
    try {
        const foodID = req.params.id;
        if(!foodID) {
            return res.status(403).send({
                success : false,
                msg : "kindly provide the food id"
            })
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code, 
            isAvailabe,
            restaurant,
            rating,
        } = req.body;
        const updatedFood = await Food.findByIdAndUpdate(foodID,
            {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code, 
            isAvailabe,
            restaurant,
            rating,
            })
        res.status(200).send({
            success : true,
            msg : "Food Item is updated",
            updatedFood,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in Update food Api",
        })
    }
}


// delete food by id
export const deleteFoodById = async(req, res) => {
    try {
        const foodID = req.params.id;
        if(!foodID){
            return res.statsu(403).send({
                success : false,
                msg : "Kindly Provide the Food ID"
            })
        }
        const food = await Food.findById(foodID);
        if(!food){
            return res.status(404).send({
                success : false,
                msg : "Food Item is not availabe"
            })
        }
        await Food.findByIdAndDelete(foodID);
        res.status(200).send({
           success : true,
           msg : "Food Item is deleted Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in Delete Food Api"
        })
    }
}