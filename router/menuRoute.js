const express = require('express');
const router = express.Router();
const MenuItems = require('../models/menuItem');

router.get('/', function(req, res) {
    res.status(200).json({success: true,message: 'Success'});
});
    
router.post("/create-menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = await MenuItems(data);
    const menuresp = await newMenu.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Menu saved successfully",
        data: menuresp,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "person not fetched" });
  }
});

router.get("/:taste", async(req, res) =>{
  try {
    const teste = req.params.taste;
    // console.log(teste);
    if(teste ==='spicy' ||teste ==='sweet' || teste ==='sour'){
        const testeResp = await MenuItems.find({taste:teste});
  
    res
      .status(200)
      .json({
        success: true,
        message: "Menu fetched successfully",
        data: testeResp,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: error });
  }
});

module.exports= router;