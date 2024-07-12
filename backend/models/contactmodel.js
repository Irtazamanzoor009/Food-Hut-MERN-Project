const mongoose = require("mongoose");

const { Schema } = mongoose;

const ContactSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    number:{type:String, required:true},
    subject:{type:String},
    message:{type:String, required:true}
});

module.exports = mongoose.model("contact", ContactSchema);
