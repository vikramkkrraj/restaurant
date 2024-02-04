import { User } from "../models/userModel.js";

export const adminAuth = async(req,res,next) => {
    try {
        const user = await User.findById(req.body.id);
        if(user.usertype !== "admin"){
            return res.status(401).send({
                success : false,
                msg : "Admin Access Only"
            })
        }else{
            next();
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in Admint authentication middleware api"
        })
    }
}