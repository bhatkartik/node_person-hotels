const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('/',async (req,res)=>{
    try{

    const data = req.body  //Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data)

    //Save the new person to the database
    const response = await newPerson.save();
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
        const data = await Person.find();

        console.log('data fetched');
        res.status(200).json(data);
        
    } catch (error) {

        console.log(err);
        res.status(500).json({error:'Internal Server Erros'});
    }
   })


   router.get('/:workType', async(req,res)=>{
    try {
        const workType = req.params.workType;

        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);

        }
        else{
            res.status(404).json({error:'Invalid work type'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Erros'});
    }
   })


   router.put('/:id', async (req, res)=>{
    try{
    const personId = req.params.id; // Extract the id from the URL Parameter
    const updatedPersonData = req.body; // Updated data for the Person

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
    })

    if(!response){
        return res.status(404).json({error:'Person not found'});
    }
    else{
    console.log('data updated');
    res.send(200).json(response);
    }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})

    }
   })

   module.exports = router;