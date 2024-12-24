import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { GridFSBucket } from "mongodb";
import UserModel from "./Models/UserModel.js";
import MangerModel from "./Models/MangerModel.js";
import PlantModel from "./Models/PlantsModels.js"; // Import the Plant Model
import plantRoutes from "./plantRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const con = "mongodb+srv://admin:csse4103@postitcluster.e34uj.mongodb.net/plantdb?retryWrites=true&w=majority";
mongoose.connect(con, { useNewUrlParser: true, useUnifiedTopology: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage });
  
const gfs = new mongoose.Schema({
  filename: String,
  chunkSize: Number,
  uploadDate: Date,
  length: Number,
  md5: String,
  contentType: String
});

const imageModel = mongoose.model('image', gfs, 'photos.files');

const uploadImage = async (file) => {
  try {
    const imageId = await imageModel.create({
      filename: file.originalname,
      chunkSize: 1024 * 1024,
      uploadDate: new Date(),
      length: file.size,
      md5: file.md5,
      contentType: file.mimetype
    });
    return imageId._id;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/files', express.static('uploads'));


// Routes
app.use("/api/plants", plantRoutes); // Use the plant routes 
// Server setup
app.listen(3001, () => console.log("Server running on port 3001"));


// User Routes
app.post("/registerUser", async (req, res) => {
  try {
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      phonNo: req.body.phonNo,
      password: req.body.password,
    });
    await user.save();
    res.send({ user: user, msg: "User Data Saved Successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(500).send({ msg: "Couldn't find the user" });
    } else if (user.password !== password) {
      res.status(500).json({ msg: "Password is incorrect" });
    } else {
      res.send({ user: user, msg: "Authentication is successful" });
    }
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.post("/logout", (req, res) => {
  res.status(200).json({ msg: "Logout Successfully :)" });
});

// Manager Routes
app.post("/registerM", async (req, res) => {
  try {
    const manager = new MangerModel({
      name: req.body.name,
      email: req.body.email,
      phonNo: req.body.phonNo,
      password: req.body.password,
    });
    await manager.save();
    res.send({ manager: manager, msg: "Manager Data Saved Successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/loginM", async (req, res) => {
  try {
    const { email, password } = req.body;
    const manager = await MangerModel.findOne({ email: email });
    if (!manager) {
      res.status(500).send({ msg: "Couldn't find the manager" });
    } else if (manager.password !== password) {
      res.status(500).json({ msg: "Password is incorrect" });
    } else {
      res.send({ manager: manager, msg: "Authentication is successful" });
    }
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.post("/logoutM", (req, res) => {
  res.status(200).json({ msg: "Logout Successfully :)" });
});

app.post("/addPlant", upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Create a new plant entry with the GridFS file ID
    const plant = new PlantModel({
      name,
      price,
      image: req.file.filename, // Save the filename or ID in GridFS
    });

    await plant.save();
    res.status(201).json({ msg: "Plant added successfully", plant });
  } catch (error) {
    console.error("Error adding plant:", error);
    res.status(500).json({ msg: "Error adding plant", error });
  }
});


app.get("/plants", async (req, res) => {
  try {
    const plants = await PlantModel.find();
    const plantsWithImageUrl = plants.map((plant) => ({
      ...plant.toObject(),
      imageUrl: `http://localhost:3001/files/${plant.image}`, // Create an accessible URL
    }));
    res.status(200).json({ data: plantsWithImageUrl });
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ msg: "Error fetching plants", error });
  }
});





// Add to Cart
app.post("/addToCart", async (req, res) => {
  try {
    const { userId, plantId, quantity } = req.body;

    // Find the plant by ID
const plant = await PlantModel.findById(plantId);

if (!plant) {
  return res.status(404).json({ msg: "Plant not found" });
}

// Simulate adding to a user's cart (You can create a CartModel if needed)
const cartItem = {
  plantId: plant._id,
  name: plant.name,
  price: plant.price,
  image: plant.image,
  quantity,
};

// Simulated Cart Storage (Replace with database logic if required)
// For example: Save cart items in a User's Cart collection
res.status(200).json({ cartItem, msg: "Plant added to cart successfully!" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Error adding to cart" });
  }
});

app.get("/files/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "photos.file", // Ensure this matches your GridFS bucket name
    });

    const downloadStream = bucket.openDownloadStreamByName(filename);

    downloadStream.on("error", () => res.status(404).json({ msg: "File not found" }));
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).json({ msg: "Error retrieving file", error });
  }
});
const getImage = async () => {
  try {
    const response = await axios.get("http://localhost:3001/plants");
    console.log(response.data.data); // Debug response
    setPlants(response.data.data);
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
};

app.get("/plants/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const plant = await PlantModel.findById(id); // Replace with your ORM/database logic
    if (plant) {
      res.status(200).json(plant);
    } else {
      res.status(404).json({ message: "Plant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching plant", error });
  }
});
app.put("/plants/:id", async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const plant = await PlantModel.findByIdAndUpdate(
      req.params.id,
      { name, price, image },
      { new: true }
    );
    res.status(200).json({ msg: "Plant updated successfully", plant });
  } catch (error) {
    console.error("Error updating plant:", error);
    res.status(500).json({ msg: "Error updating plant", error });
  }
});
// Add to Cart
app.post("/addToCart", async (req, res) => {
  try {
    const { userId, plantId, quantity } = req.body;
    // Find the plant by ID
const plant = await PlantModel.findById(plantId);
if (!plant) {
  return res.status(404).json({ msg: "Plant not found" });
}

// Simulate adding to a user's cart (You can create a CartModel if needed)
const cartItem = {
  plantId: plant._id,
  name: plant.name,
  price: plant.price,
  image: plant.image,
  quantity,
};
// Simulated Cart Storage (Replace with database logic if required)
// For example: Save cart items in a User's Cart collection
res.status(200).json({ cartItem, msg: "Plant added to cart successfully!" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Error adding to cart" });
  }
});
app.get("/files/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "photos", // Ensure this matches your GridFS bucket name
    });
    const downloadStream = bucket.openDownloadStreamByName(filename);
    downloadStream.on("error", () => res.status(404).json({ msg: "File not found" }));
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).json({ msg: "Error retrieving file", error });
  }

});


app.put("/updatePlant/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const updatedPlant = await PlantModel.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );
    if (!updatedPlant) {
      return res.status(404).json({ msg: "Plant not found" });
    }
    res.status(200).json({ msg: "Plant updated successfully", updatedPlant });
  } catch (error) {
    console.error("Error updating plant:", error);
    res.status(500).json({ error: "Error updating plant" });

  }

});

app.delete("/deletePlant/:id", async (req, res) => {

  try {
    const { id } = req.params;
    const deletedPlant = await PlantModel.findByIdAndDelete(id);
    if (!deletedPlant) {
      return res.status(404).json({ msg: "Plant not found" });
    }
    res.status(200).json({ msg: "Plant deleted successfully" });
  } catch (error) {
    console.error("Error deleting plant:", error);
    res.status(500).json({ error: "Error deleting plant" });

  }

});

app.delete("/plants/:id", async (req, res) => {
  try {

    await PlantModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Plant deleted successfully" });
  } catch (error) {
    console.error("Error deleting plant:", error);
    res.status(500).json({ msg: "Error deleting plant", error });

  }

});
app.get("/plants/:id", async (req, res) => {
  try {
    const plant = await PlantModel.findById(req.params.id);
    if (plant) {
      res.status(200).json(plant);
    } else {
      res.status(404).json({ msg: "Plant not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error fetching plant", error });
  }
});
app.put("/plants/:id", async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const updatedPlant = await PlantModel.findByIdAndUpdate(
      req.params.id,
      { name, price, image },
      { new: true }
    );
    if (updatedPlant) {
      res.status(200).json({ msg: "Plant updated successfully", updatedPlant });
    } else {
      res.status(404).json({ msg: "Plant not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error updating plant", error });
  }
});
