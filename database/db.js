import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();
mongoose.set("strictQuery", false);

const DB = process.env.MONGO_URI.replace("<JWT_SECRET>", process.env.JWT_SECRET);

const connectDB = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("Connected to MongoDB".bgBlue))
    .catch((err) => console.log(err));
};

export default connectDB;
