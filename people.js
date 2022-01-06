const mongoose=require('mongoose')

const Schema=mongoose.Schema

const personDetails=new Schema({
    name:{
        type: String,
        required:true
    },
    address:{
        type:String,
        required:false
    },
    phone:{
        type:Number,
        required:true
    },
    service:{
        type:String,
        required:true
    }
})

const person=mongoose.model('person',personDetails)

module.exports=person