import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const uri = process.env.MONGODB_URL;
    console.log("Mongo URI present:", !!uri);

    mongoose.connection.on("connected", () => {
      console.log("DB connected (event)");
    });

    mongoose.connection.on("error", (err) => {
      console.log("DB error (event)", err?.message || err);
    });

    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (error) {
    console.log("DB error (catch)", error?.message || error);
  }
};

export default connectDb;


