const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.get('/', function(req, res) {
    try{

        res.status(200).json({success: true,message: 'Success'});
    }catch(error){
        res.status(500).json({ success: false, message: "Persons not fetched" });
    }
});
router.get("/:worktype", async( req, res) =>{
    try{
        const worktype = req.params.worktype;
        console.log(worktype);
        if(worktype ==='chef'||worktype ==='manager'|| worktype ==='waiter'){
            const persons = await Person.find({work:worktype});
            // console.log("persons===>",persons)
            res.status(200).json({success: true, message: "Persons fetched successfully", persons: persons});
        }
    }catch(e){
res.status(404).json({success:false, message:"Invalid worktype", error:e});
    }

})
router.post("/create-new-person", async(req, res) => {
    try{
    const data = req.body;
    const newPersions = new Person(data);
    const emailId = await Person.find({ email: data.email });
    if(emailId.length > 0){
        return res.status(400).json({ success: false, message: "Email already exists" });
    }
    const resp =  await newPersions.save() 
        res.status(200).json({success: true, message: "Persions saved successfully", resp})
    }catch(error){
        res.status(500).json({ success: false, message: "person not creatd" });
    }
})

router.put("/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const person = await Person.findByIdAndUpdate(id, data, { new: true });
        if(!person){
            return res.status(404).json({ success: false, message: "Person not found" });
        }
        res.status(200).json({success: true, message: "Person updated successfully", person});
    }catch(error){
        res.status(500).json({ success: false, message: "person not updated" });
    }
});

router.delete("/:id", async(req, res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({ success: false, message: "Person not found" });
        }
        res.status(200).json({ success: true, message: "Person deleted successfully", response});
    }catch(error){
res.status(404).json({ success: false, message:"Error while deleting", error: error.message });
    }
})

module.exports = router;