import mangoose from 'mongoose';
import {DB_URI, NODE_ENV} from "../config/env.js";

if(!DB_URI){
  throw  new  Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local')
}

const connectDB = async ()=>{
 try{
 await mangoose.connect(DB_URI)
   console.log(`Connected to MongoDB in ${NODE_ENV} mode`)
 }catch(err){
   console.error('Error connecting to MongoDB: ', err.message)
   process.exit(1)
 }
}


export default connectDB;