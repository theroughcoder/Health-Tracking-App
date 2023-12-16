// schema
const mongoose = require( "mongoose");

const {ObjectId} = mongoose.Schema.Types;

const healthSchema = mongoose.Schema(
  {
    sleep: {
      type: Number,
      required: [true, "Sleep is required"],
      text: true,
    },
    steps: {
      type: Number,
      required: [true, "Steps are required"],
      text: true,
    },
    drink: {
      type: Number,
      required: [true, "drink is required"],
      text: true,
    },
    exercise: {
      type: Number,
      required: [true, "exercise is required"],
      text: true,
    },
    score: {
      type: Number,
      required: [true, "Score is required"],
      text: true,
    },

    userId: {
      type: ObjectId,
      required: [true, "UserID is required"],
    
    },
  
  
  },
  {
    timestamps: true,
  }
);
//creating model or collection
const Health = mongoose.model("Health", healthSchema);

module.exports = Health;
