const express = require('express')
const router = express.Router();

const MenuItem = require('./../models/MenuItems');
const Person = require('../models/Person');

//menu data ko database me add krte hain uske liye post method use kr le bhai
router.post('/', async (req,res)=>{
     try {
          const data = req.body;
          const newmenuitem = new MenuItem(data);

          const response = await newmenuitem.save();
          console.log('menu data is saved on databse...')
          res.status(200).json(response)
     } 
     catch (error) {
          console.log(error)
          res.status(500).json({error: "Internal server error"})
     }
})

//menu data ko database se nikalte hain aur front end pe show krten hain chalo hmmm
router.get('/', async (req,res)=> {
     try {
          const data = await MenuItem.find()
          console.log('menu data is fetched successfully......')
          res.status(200).json(data);
     } catch (error) {
          console.log('error in fetching..')
          res.status(500).json({error: "Internal server error agya bhai.. kuch kro"})
     }
})

router.get('/:tasteType', async (req,res)=> {
     try {
          const tastType = req.params.tasteType
          const data = await MenuItem.find({taste: tastType})
          console.log('menu data is fetched successfully......')
          res.status(200).json(data);
     } catch (error) {
          console.log('error in fetching..')
          res.status(500).json({error: "Internal server error agya bhai.. kuch kro"})
     }
})

//commentadded
//second comment added
module.exports = router