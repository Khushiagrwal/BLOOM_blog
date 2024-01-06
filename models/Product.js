const mongoose =require('mongoose');
const Review = require('./Review');

const CanteenSchema =new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    image:{
        type:String,
        trim:true,
        required:true,
        timestamps:true 
    },
    content:{
        type:String,
        required:true
    },
    // reviews:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'Review'
    //     }
    // ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register' 
    } 
    
})

const Product=mongoose.model('Product',CanteenSchema);
module.exports=Product;

