const mongoose=require("mongoose")
const homeSchema=new mongoose.Schema(
{
    car_make: { type: String },
    car_model: { type: String},
    model_year: { type: String },
    color: { type: String },
   
   
},
{
    timestamps:true,
    versionKey:false,
}

)
module.exports=mongoose.model("home",homeSchema)

