import mongoose from 'mongoose';
import mangoose from "mongoose";

const subscriptionSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'Subscription name is required'],
    trim:true,
    minLength:2,
    maxLength:100
  },
  price:{
    type:Number,
    required:[true, 'Subscription price is required'],
    min:[0, 'Price must be greater than or equal to 0'],
    max:[1000,'Price must be less than or equal to 1000'],
  },
  currency:{
    type:String,
    enum:['USD','EUR','GBP'],
    default:'USD'
  },
  frequency:{
    type:String,
    enum:['monthly','yearly'],
  },
  category:{
    type:String,
    enum:['sports', 'news', 'entertainment', 'business', 'technology', 'health', 'science', 'other'],
    required:true
  },
  paymentMethod:{
    type:String,
    enum:['credit_card','paypal','bank_transfer'],
    required:true,
    trim:true
  },
  status:{
    type:String,
    enum:['active','canceled', 'expired'],
    default:'active'
  },
  startDate:{
    type:Date,
    required:[true, 'Start date is required'],
    validate:{
     validator:(value)=>value<=new Date(),
     message:'Start date must be in the past'
    }
  },
  renewalDate:{
    required:[true, 'Renewal date is required'],
    validate:{
      validator:function (value){
        return value>this.startDate
      },
      message:'Renewal date must be in the future'

    }
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    index:true,
  }


}, {timestamps:true})

subscriptionSchema.pre('save',function(next){
  if(!this.renewalDate){
    const renewalPeriods={
      daily:1,
      weekly:7,
      monthly:30,
      yearly:365
    }
    this.renewalDate=new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency])
  }
  if(this.renewalDate<new Date()){
    this.status='expired'
  }
  next()
})

const SubscriptionModel=mangoose.model('Subscription', subscriptionSchema);

export default SubscriptionModel