import mongoose from "mongoose";
import { stringify } from "querystring";

const userSchema= new mongoose.Schema({
    name: {type:String, require: true},
    email: {type:String, require: true},
    password: {type:String, require: true},
    id: {type:String},
})

var User= mongoose.model('User',userSchema);

export default User;