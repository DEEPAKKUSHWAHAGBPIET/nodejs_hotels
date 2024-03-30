const express = require('express')
const router = express.Router()
const Person = require('./../models/Person')

//creating post method to save the data to database comming from frontend 
router.post('/', async (req, res)=>{
     try {

          const data = req.body // assuming the request body contains the person data
     
          //create a new person document using the mongoose model
          const newPerson = new Person(data);

          //save the newPerson data to database
          const response = await newPerson.save() // if it return error then it will be thrown to catch block
          console.log('data saved');
          res.status(200).json(response);
     }
     catch (error) {
          console.log(error);
          res.status(500).json({error: 'Internal Server Error'})
     }
})

//chalo ab database se data nikalte hain bhai fir to uske liye get method use krenge
router.get('/', async (req,res)=>{
     try {
          const data = await Person.find()
          console.log('data fetched from database successfully...');
          res.status(200).json(data);
     } catch (error) {
          console.log(error);
          res.status(500).json({error: 'Internal Server Error'})
     }
})

//worktype of person ke hisab se data fetch krte hain ok let see i.e keval chef or keval mangar
router.get('/:workType', async(req,res) => {
     try {
          const workType = req.params.workType
          if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
               const response = await Person.find({work: workType})
               console.log('response fetched from database...')
               res.status(200).json(response)
          }
          else{
               res.status(404).json({error: 'Invalid work type'})
          }
     } catch (error) {
          console.log(error);
          res.status(500).json({error: 'Internal Server Error'})
     }
})

// to update the record in database
router.put('/:id', async (req, res) => {
     try {
          const personId = req.params.id;
          const updatedPersonData = req.body

          const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
               new: true, // Return the updated document
               runValidators: true, // run Mongoose validatio
          })

          if(!response){
               return res.status(404).json({error: 'person not found'})
          }

          console.log('data successfully updated');
          res.status(200).json(response)
          
     } catch (error) {
          console.log(error);
          res.status(500).json({error: "Internal server error"})
     }
})

//to delete teh record from database
router.delete('/:id', async (req, res) => {
     try {
          const personId = req.params.id;

          const response = await Person.findByIdAndDelete(personId)

          if(!response){
               return res.status(404).json({error: 'person not found'})
          }

          console.log('data successfully deleted....');
          res.status(200).json(response)
          
     } catch (error) {
          console.log(error);
          res.status(500).json({error: "Internal server error"})
     }
})

module.exports = router

