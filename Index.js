require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const Product = require("./Model/product.model");

const authRoutes = require("./routes");
const app = express()

// Passport
require("./passport")(passport);

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "YZ",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/routes", authRoutes);

// Middleware to Protect Routes
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized. Please log in." });
};

// Routes
app.get("/", (req, res) => res.send("Hello from Node API with Authentication"));


// Get All Products 
app.get("/api/products", async(req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Product by ID 
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create Product 
app.post("/api/products", isAuthenticated, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Product 
app.put("/api/products/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Product 
app.delete("/api/products/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI ||"mongodb+srv://jahnvichourey28:Jahnvi28@cluster001.ss8d4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster001")
  .then(() => {
    console.log("Connected to database");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log("Connection failed", err));
