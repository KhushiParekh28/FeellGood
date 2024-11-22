const mongoose = require("mongoose");

mongoose.connect( "mongodb://localhost:27017/Logintutorial")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Define the schema
const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the model
const collection = mongoose.model("Collection1", LogInSchema);

// Export the collection
module.exports = collection;
