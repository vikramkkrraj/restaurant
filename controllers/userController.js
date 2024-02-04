import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';

export const getUser = async (req, res) => {

  try {
        //  res.status(200).send("user data");
        // console.log(req.body.id);

        // find User 
        const user = await User.findById({ _id : req.body.id });
        if(!user) {
            return res.status(404).send({
                success : false,
                msg : "User not found"
            })
        }

        // hide passsword 
        user.password = undefined ;
        // response
        res.status(200).send({
            success: true,
            user,
        })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Get User API",
      error,
    });
  }
};



// Update controller
export const updateUser = async (req,res) => {
        try {
            const { id, username, address, phone, } = req.body;

            const user = await User.findById({_id : id});
            if(!user) return res.status(404).send({
                success: false,
                msg : "User Not Found..!",
            })
            user.username = username ;
            user.address = address;
            user.phone = phone,

            // save into db
            await user.save();

            res.status(200).send({
                success : true,
                msg : "User Updated Successfully..!",
                user,
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                msg : "Error in update api",
                error,
            })
        }
}


export const resetPasswor = async(req,res) => {
    try {
        const {answer, email , newPassword } = req.body;
        if(!answer || !email || !newPassword){
            return res.status(500).send({
                success : false,
                msg : "Please Provide All Field"
            })
        }

        const user = await User.findOne({ email , answer });
        if(!user) return res.status(404).send({success : false, msg :"User not Found..!"});


        // hash the newPassword
        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

        user.password = hashedNewPassword;
        user.answer = answer;

        // save
        await user.save();
        res.status(200).send({
            success : true,
            msg : "Password Updated successfully...!",
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in reset password api"
        })
    }
}

export const updatePassword = async(req,res) => {
    try {
        const { id, password, newPassword } = req.body;
        if( !password || !newPassword){
            return res.status(401).send({
                success: false,
                message : "Please Provide all field"
            })
        }
        const user = await User.findById({ _id : id});
        if(!user) return res.status(404).send({success : false, msg : "User not Found"});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(403).send({success : false , msg : "Old Passowrd doest not match"});
    
        // hash
        const hashedNewPassword = bcrypt.hashSync(newPassword , 10);
        user.password = hashedNewPassword;

        user.save();
        res.status(200).send({
            success : true,
            msg : "Password Updated Successfully..!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            msg : "Error in updatePassword Api",
        })
    }   
}

// Delete Account
export const deleteUserAccount = async(req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success : true,
            message : "User Account is Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error in delete user Account Api",
        })
    }
}


// logout will be handled from frontend using sesssion cokies storage.

