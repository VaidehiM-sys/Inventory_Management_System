const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const dbUrl = 'mongodb+srv://vaidehi:user@nodeproject-kw2mp.mongodb.net/test?retryWrites=true&w=majority';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const Product = mongoose.model('product', {
    product: {
        productid: Number,
        category: String,
        price: Number,
        name: String,
        instock: Boolean
    }
});

app.get('/product/get', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (e) {
        res.sendStatus(500);
    }
});

app.post('/product/create', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.send(savedProduct);
    } catch (e) {
        res.send(e.message);
    }
});

app.put('/product/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Product.updateOne({_id: id}, req.body);
        res.send(result);
    } catch (e) {
        res.sendStatus(500);
    }
});

app.delete('/product/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Product.deleteOne({_id: id});
        res.send({id});
    } catch (e) {
        res.sendStatus(500);
    }
});

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log('MongoDB connection', err);
});

app.listen(5000);
