import mongoose from "mongoose";
import bcrypt from "bcrypt";
import getInstance from "../../config/dbConn";

const userSchema = new getInstance().Schema(
  {
    name: {
      type: "String",
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: "String",
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    methods: {
      async isValidPassword(password) {
        try {
          return await bcrypt.compare(password, this.password);
        } catch (error) {
          throw new Error("Password comparison failed");
        }
      },
    },
  },
);

userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

export default getInstance().model("User", userSchema);
