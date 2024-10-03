import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      require: [true, "Enter Username"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "Enter Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Enter Password"],
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }, 
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users" , userSchema);

export default User;