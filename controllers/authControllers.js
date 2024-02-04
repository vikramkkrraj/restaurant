import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, email, password, address, phone, answer } = req.body;

    // validation
    if (!username || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }
    // check user existance
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Alread Registered Please login..",
      });
    }

    // // hashing password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });

    return res.status(201).send({
      success: true,
      Message: "Successfully Regiseterd...!",
      user,
    });
  } catch (error) {
    console.log("registered failed", error);
    return res.status(500).send({
      success: false,
      msg: "Error in Register API",
      error,
    });
  }
};

// Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(403).send({
        success: false,
        message: "email and password required",
      });
    }

    // check user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User is Not found ");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
              success: false,
              message: "Password is wrong",
            });
    }

    // token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // to prevent password visible in user
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log("Login failed", error);
    return res.status(500).send({
      success: false,
      msg: "Error in Login API",
      error,
    });
  }
};
