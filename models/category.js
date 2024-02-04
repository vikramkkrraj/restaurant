import mongoose, { Schema } from "mongoose";

// category schema
const categorySchema = new Schema({
  title: {
    type: String,
    required: [true, "Category litle is required...!"],
  },
  imageUrl: {
    type: String,
    default:
      "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
  },
}, {timestamps : true });

export const Category = mongoose.model("Category", categorySchema);
