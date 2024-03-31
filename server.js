const express = require('express')

const app = express()
const db = require('./db')
require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.json())


const MenuItem = require('./models/MenuItems')

app.get('/', (req,res) => {
     res.send("Welcome to my Hotel... how can i server u?")
})

//lets import person routers here in server
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)
//
//lets import menu routes here in server
const menuRoutes = require('./routes/menuRoutes')
app.use('/menu', menuRoutes)


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
     console.log("server is listing at port no : http://localhost:4000/")
})
