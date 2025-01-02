// import mongoose from "mongoose";

// const connectToMongoDB = async () => {
// 	try {
// 		await mongoose.connect(process.env.MONGO_DB_URI);
// 		console.log("Connected to MongoDB");
// 	} catch (error) {
// 		console.log("Error connecting to MongoDB", error.message);
// 	}
// };

// export default connectToMongoDB;


import mongoose from "mongoose";

const connectToMongoDB = async () => {
  const mongoURI = process.env.MONGO_DB_URI;

  if (!mongoURI) {
    console.error("MONGO_DB_URI is not defined in the environment variables.");
    process.exit(1); // Exit the process if the URI is not provided
  }

  try {
    await mongoose.connect(mongoURI); // No deprecated options
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process on connection failure
  }
};

export default connectToMongoDB;

