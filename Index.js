const express = require('express')
const mongoose = require('mongoose');
// to import the json module
const Product = require('./Model/product.model.js');
const app = express()

// to access json
app.use(express.json());


app.get('/',(req, res)=>{
    res.send('hello from node API updated ');
});


// to get all the elements in json format
app.get('/api/products', async(req,res)=>{
    try{
        const product= await Product.find(req.body);
        res.status(200).json(product);
    }
    catch(error){  
        res.status(500).json({message:error.message});
    } 
});

// to get specific product based on id
app.get('/api/products/:id', async(req,res)=>{
    try{
        const {id}= req.params;
        const product= await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error){  
        res.status(500).json({message:error.message});
    } 
});
// to add elemnts from json to api server
app.post('/api/products', async(req,res)=>{
    try{
        const product= await Product.create(req.body);
        res.status(200).json(product);
    }
    catch(error){  
        res.status(500).json({message:error.message});
    } 
});


//Update a product put/patch both can be used
//get product by id->change and Update
app.put('/api/products/:id', async(req,res)=>{
    try{
        const {id}= req.params;
        const product= await Product.findByIdAndUpdate(id, req.body);
        
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        const updatedProduct= await Product.findById(id);
        res.status(200).json(product);

    }
    catch(error){  
        res.status(500).json({message:error.message});
    } 
});


//Delete a Product
app.delete('/api/products/:id', async(req,res)=>{
    try{//request id from pramas(webpage)
        const {id}= req.params;
        const product= await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({message : "Product deleted"});
    }
    catch(error){  
        res.status(500).json({message:error.message});
    } 
});
// to connect js to database(mongoose) 
mongoose.connect("mongodb+srv://jahnvichourey28:Jahnvi28@cluster001.ss8d4.mongodb.net/NodeCrudapi?retryWrites=true&w=majority&appName=Cluster001")
.then(()=>{
    console.log("connected to database");
    app.listen(5000,()=>{
        console.log('server is running on port 5000');
    });
})
.catch(()=> {
   console.log ('Connection failed')
});