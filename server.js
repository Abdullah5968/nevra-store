const express = require('express');
const mongoose = require('mongoose'); // Humari nayi database machine
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// --- DATABASE CONNECTION ---
// Yahan apni copied line paste karein aur <db_password> ki jagah apna password likhein
const dbURI = 'mongodb+srv://abdullah:nevra123@cluster0.n5whkis.mongodb.net/?appName=Cluster0';

mongoose.connect(dbURI)
    .then(() => console.log("CONNECTED TO MONGODB CLOUD!"))
    .catch((err) => console.log("DB Connection Error:", err));

// --- PRODUCT SCHEMA (Warehouse ka Naksha) ---
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String
});

const Product = mongoose.model('Product', productSchema);

// --- API ROUTES ---

// 1. Get all products from Database
app.get('/api/products', async (req, response) => {
    const products = await Product.find();
    response.json(products);
});

// 2. Add new product to Database
app.post('/api/products', async (req, response) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    response.json({ message: "Product saved to Cloud!" });
});

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});