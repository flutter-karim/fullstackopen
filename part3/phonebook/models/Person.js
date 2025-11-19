import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    number: {
      type: String,
      required: [true, "Number is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.model("Person", personSchema, "persons");

export default Person;
