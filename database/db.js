import mongoose from "mongoose";
// import colors from 'colors';

export const connectDB = async() =>{
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB is Connected`.bgYellow.black);
    } catch (error) {
        console.log('MongoDB Connected Failed !!', error);
        process.exit(1);
    }
}