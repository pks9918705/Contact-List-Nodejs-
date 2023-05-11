const mongoose=require('mongoose')

const contactSchema=new mongoose.Schema({
     name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
        // you can put restriction to have number with 10-digits number
        // and much more 

    }
     
});

//collection name is Contact
const Contact=mongoose.model('Contact',contactSchema)

module.exports=Contact