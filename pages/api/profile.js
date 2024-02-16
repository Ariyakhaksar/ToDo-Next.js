import User from "models/Users";
import { getServerSession } from "next-auth";
import connectDB from "utils/connectDB";
import { authOptions } from "./auth/[...nextauth]";
import { verifyPassword } from "utils/auth";

export default async function handler(req , res){

    try {
        await connectDB();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "failed", message: "Error in connecting to DB" });
    }

    const session = await getServerSession(req , res , authOptions)
    if (!session) return res.status(401).json({ status: "failed", message: "You are not logged in!" });


    const user = await User.findOne({ email: session.user.email });
    if (!user) return res.status(404).json({ status: "failed", message: "User doesn't exsit!" })
      

    if(req.method === "POST"){
        const {name , family , password} = req.body;
        
        const isValid = await verifyPassword(password , user.password)
        if (!isValid) return res.status(422).json({ status: "failed", message: "Password is incorrect!" })
        
        user.name = name;
        user.family = family;
        user.save();
        return res.status(201).json({ status: "success", data: {name , family , email : session.user.email }})
    }else if(req.method === "GET"){
        res.status(200).json({status : "success" , data : {Name : user.name  , Family : user.family , Email : user.email}})
    }



}