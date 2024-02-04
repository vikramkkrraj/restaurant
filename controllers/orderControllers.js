import { Order } from "../models/orderModel.js";

export const placeOrder = async(req,res) => {
    try {
        const { cart } = req.body;
        if(!cart){
            return res.status(403).send({
                success : false,
                msg : "please cart food or payment method",
            })
        }
        let total = 0 ;
        total = cart.map((i) => { total += i.price });

        const order = await Order({
            foods : cart,
            payment : total,
            buyer : req.body.id    // from auth middleware
        })

        await order.save();
        res.status(201).send({
            success : true,
            msg : "Order Placed Successfully",
            order,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in placing order api"
        })
    }
}