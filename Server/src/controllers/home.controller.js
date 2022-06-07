const express = require("express")
const Home=require("../models/home.model")
const router=express.Router()


router.get("", async (req, res) => {
    try {
        const page=req.query.page||1;
        const pagesize=req.query.pagesize||10
        const skip=(page-1)*pagesize
         const filter1=req.query.filter
         const filtervalue=req.query.filtervalue
        
         const sort1=req.query.sort
         const sortvalue=req.query.sortvalue
       

       let home = await Home.find({[filter1]:filtervalue})
       .skip(skip).limit(pagesize).sort({[sort1]:sortvalue})
       .lean().exec();
       let countpage =Math.ceil((await Home.find({[filter1]:filtervalue}).countDocuments()) /pagesize)
       
      return res.status(200).send({ home: home,totalpage:countpage }) ; // []
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

 

  module.exports=router;