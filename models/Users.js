import { Schema , model , models } from "mongoose";

const userSchema = new Schema({
    name : {
        type:String,
    },
    family : {
        type:String,
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    todos:[{title:String , status : String}],
    createAt:{
        type:Date,
        default: () => Date.now(),
        immutbale:true
    }
})

const User = models.User || model("User" , userSchema);

export default User