import { Restaurant } from "../models/restaurantModel.js";

export const createRestaurant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      food,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    const restaurant = new Restaurant({
        title,
        imageUrl,
        food,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
    })
    // validation
    if(!title || !coords){
        return res.status(403).send({
            success : false,
            msg : "Title and Address Field is required..!"
        })
    }
    await restaurant.save();
    res.status(201).send({
        success : true,
        message : "Restaurant is Created Successfully..!"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Error in Create Restaurant Api",
    });
  }
};


export const getAllRestarurant = async(req,res) => {
    try {
        const restaurants = await Restaurant.find({});
        if(!restaurants.length) {
            return res.status(404).send({
                success : false,
                msg : "Restaurant Not found..!",
            })
        }
        res.status(200).send({
            success: true,
            restaurants
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in Get All Restaurants Api",
            error,
        })
    }
}

export const getRestaurantById = async(req,res) => {
    try {
        const restaurantId = req.params.id;
        if(!restaurantId) {
            return res.status(404).send({
                success : false,
                msg : "Please Provide the Id of the Restaurant",
            })
        }
        const restaurant = await Restaurant.findById(restaurantId);
        res.status(200).send({
            success : true,
            restaurant
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success : false,
            msg : "Error in getting restaurant by id api",
            error
        })
    }
}

export const deleteRestaurantById = async(req,res) => {
    try {
        const restaurantID = req.params.id;
        if(!restaurantID) {
            return res.status(404).send({
                success : false,
                msg : "No Restaurant found Or Please Provide the Restaurant ID",
            })
        }
         await Restaurant.findByIdAndDelete(restaurantID);
        res.status(200).send({
            success : true,
            msg :  `Restaurant Deleted SuccessFully`,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in Delete Restaurant Api",
            error,
        })
    }
}