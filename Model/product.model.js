const { default: mongoose } = require('mongoose');
const mongoos= require('mongoose');

const Productschema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter a name"],
        },
        quantity:{
            type:  Number,
            required: true,
            default: 0,
        },
        price:{ 
            type: Number,
            required: true,
            default: 0,
        },    
    },

    {
        Timestamps: true,
    }
    
);

const Product =  mongoose.model("Product", Productschema);
module.exports = Product; 
