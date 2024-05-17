const express = require('express');
const app = express();

const db = require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body(data gets save)

const Person = require('./models/person');
const Menu = require('./models/menu');
const MenuItem = require('./models/menu');



app.post('/person',async (req,res)=>{
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

app.get('/person',async(req,res) =>{
    try {
        const data = await Person.find();

        console.log('data fetched');
        res.status(200).json(data);
        
    } catch (error) {

        console.log(err);
        res.status(500).json({error:'Internal Server Erros'});
    }
   })


   app.post('/menu',async (req,res)=>{
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

app.get('/menu',async(req,res) =>{
  try {
        const data = await MenuItem.find();

        console.log('data fetched');
        res.status(200).json(data);
        
    } catch (error) {

        console.log(error);
        res.status(500).json({error:'Internal Server Erros'});
    }
   })


   app.get('/person/:workType', async(req,res)=>{
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

   //Import the router file
   const personRoutes = require('./routes/personRoutes');
   const menuItemRoutes = require('./routes/menuItemRouter');

   //Use the routers
   app.use('/person',personRoutes);
   app.use('/menu',menuItemRoutes); 

app.listen(PORT,()=>
console.log('server is running'))
