const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
    name: {type:String , required: true},
    stock: {type:Number , required: true },
    category: {type:String , required: true},
    // imgDir:{type:String , required: true, unique: true },
})
module.exports=ProductSchema