import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{type:"String", required:"true"},
    email:{type:"String",required:"true",unique:"true"},
    phonNo:{type:"number",reuired:"true"},
    password:{type:"String",required:"true"},
})

const UserModel = mongoose.model("userinfos",UserSchema); //Collection name
export default UserModel;