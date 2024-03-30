const mongoose = require('mongoose')

//define the person schema

const personSchema = new mongoose.Schema({
     name:{
          type: String,
          required: true
     },
     age:{
         type: Number,
     },
     work: {
          type: String,
          enum: ['chef', 'waiter', 'manager'],
          require: true
     },
     mobile:{
          type: String,
          required: true
     },
     email:{
          type: String,
          required: true,
          unique: true
     },
     address:{
          type: String,
          required: true
     },
     salary:{
          type: String,
          required: true
     }
});

//create a person model

const Person = mongoose.model('Person', personSchema)
module.exports = Person;
