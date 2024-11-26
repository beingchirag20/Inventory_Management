const express = require('express')
const Product = require('../models/Product') 
const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

//Add a new product
router.post('/add', async (req,res) => {
    const {name, price, stock, category} = req.body;
    try{
        const product = new Product({name, price, stock, category})
        await product.save();
        res.status(201).json({message: 'Product added successfully: ', product})
    }
    catch(e)
    {
        res.status(500).json({message: 'Error adding product. Details: ', e})
    }
});

//Update an existing product
router.put('/:id', async (req, res) => {
    const { id } = req.params; 
    const {price, stock} = req.body;

    try
    {
        const product = await Product.findByIdAndUpdate(id, {price, stock}, {new: true});
        if(!product)
        {
            res.status(404).json({message: 'Product not found'})
        }
        else 
        {
            res.status(200).json({message: 'Product updated successfully: ', product})
        }
    }
    catch(e)
    {
        res.status(500).json({message: 'Error updating product. Details: ', e});
    }
});

//Remove a product
router.delete('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const product = await Product.findByIdAndDelete(id);
        if(!product)
        {
            res.status(404).json({message: 'Product not found'})
        }
        else
        {
            res.status(200).json({message: 'Product deleted successfully'})
        }
    } 
    catch (e) 
    {
        res.status(500).json({message: 'Error deleting product. Details: ', e});
    }
});

module.exports = router;