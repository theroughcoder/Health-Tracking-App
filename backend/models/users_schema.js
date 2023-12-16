// schema
const mongoose = require( "mongoose");

const {ObjectId} = mongoose.Schema;

const userSchema = mongoose.Schema(
  {

    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    }
   
  },
  {
    timestamps: true,
  }
);
//creating model or collection
const User = mongoose.model("User", userSchema);

module.exports = User;
