const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/routes');

const app = express()

//Middleware
app.use(express.json());
app.use(cors());

//Database Connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log("Error connecting MongoDb: ", err));

//Routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Inventory Management API!');
});

//Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})