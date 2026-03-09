const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

const productSchema = new mongoose.Schema({ name: String, price: String, image: String });
const Product = mongoose.model('Product', productSchema);

const userSchema = new mongoose.Schema({ username: String, email: String, password: { type: String, required: true } });
const User = mongoose.model('User', userSchema);

// Auto-populate 50 products if empty
const seedDB = async () => {
    const count = await Product.countDocuments();
    if (count === 0) {
        let samples = [];
        for (let i = 1; i <= 50; i++) {
            samples.push({
                name: `Nevra Edition Vol. ${i}`,
                price: `Rs. ${2000 + (i * 100)}`,
                image: `https://picsum.photos/seed/${i + 50}/500/700`
            });
        }
        await Product.insertMany(samples);
    }
};
seedDB();

// Routes
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/api/products', async (req, res) => {
    const p = new Product(req.body);
    await p.save();
    res.json(p);
});

app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
});

app.post('/api/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ msg: "Success" });
    } catch (e) { res.status(400).json({ error: "Error" }); }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (user) res.json({ user: user.username });
    else res.status(401).json({ error: "Failed" });
});

module.exports = app;