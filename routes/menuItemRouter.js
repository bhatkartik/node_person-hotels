const express = require('express');
const router = express.Router();

const MenuItem = require('../models/menu');

router.post('/',async (req,res)=>{
    try{

    const data = req.body  //Assuming the request body contains the person data

    // Create a new menuItem document using the Mongoose model
    const newMenu = new MenuItem(data);

    //Save the new Menu Item to the database
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Erros'});
    }
    
})

router.get('/',async(req,res) =>{
  try {
        const data = await MenuItem.find();

        console.log('data fetched');
        res.status(200).json(data);
        
    } catch (error) {

        console.log(error);
        res.status(500).json({error:'Internal Server Erros'});
    }
   })
   
   module.exports = router;
