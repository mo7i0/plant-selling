import mongoose from "mongoose";

const MangerSchema = mongoose.Schema({
    name:{type:"String", required:"true"},
    email:{type:"String",required:"true",unique:"true"},
    phonNo:{type:"number",reuired:"true"},
    password:{type:"String",required:"true"},
})

const MangerModel = mongoose.model("mangerinfos",MangerSchema); //Collection name
export default MangerModel;