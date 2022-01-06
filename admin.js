const mongoose=require('mongoose')

const schema=mongoose.Schema

const adminDetails= new schema({
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})

const admin=mongoose.model('admin',adminDetails)

module.exports=admin