import { Order } from "../models/orderModel.js";

export const checkUserAdminAndUpdateOrderStatus = async(req,res) => {
        try {
            const foodID = req.params.id
            if(!foodID){
                return res.status(404).send({
                    success : false,
                    msg : "Please provide the valid order id"
                })
            }
            const { status } = req. body;
            if(!status) {
                return res.status(403).send({
                    msg : "Please Enter the Status",
                })
            }
            const order = await Order.findByIdAndUpdate(
                foodID,
                {status},
                {new : true}
            );

            res.status(200).send({
                success : true,
                msg : `Order statu is updated to ${status}`
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success : false,
                msg : "Error in update food order status api"
            })
        }
}