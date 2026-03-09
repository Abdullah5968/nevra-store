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
// --- USER SCHEMA (Naya!) ---
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// --- AUTH ROUTES ---

// 1. Signup Route
app.post('/api/signup', async (req, response) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        response.json({ message: "Account Created Successfully!" });
    } catch (err) {
        response.status(400).json({ error: "Email or Username already exists!" });
    }
});

// 2. Login Route
app.post('/api/login', async (req, response) => {
    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password });
        if (user) {
            response.json({ message: "Login Successful!", user: user.username });
        } else {
            response.status(401).json({ error: "Invalid Credentials!" });
        }
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});