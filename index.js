const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/userModel")
const port = process.env.PORT || 3000;
const url = "mongodb+srv://admin:12345@meetnow-api.kpn24se.mongodb.net/users?retryWrites=true&w=majority"


app.use(express.json())
// app.get( "/" , (req, res) => {
//     res.send( "Hello I am live")
// })

app.post('/register' , async(req, res) => {
    // console.log(req.body);
    // res.send(req.body)

    try {
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
})

app.get( "/login/:id" , async(req, res) => {
    // res.send( "Hello I am live")

    try {
        const  {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
})

app.put( "/update-user/:id" , async(req, res) => {
    // res.send( "Hello I am live")

    try {
        const  {id} = req.params
        const user = await User.findByIdAndUpdate(id , req.body)

        if(!user){
            return res.status(404).json({message: `user not found`})
        }

        const userUpdated = await User.findById(id)

        res.status(200).json(userUpdated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
})

app.delete( "/delete-user/:id" , async(req, res) => {
    // res.send( "Hello I am live")

    try {
        const  {id} = req.params
        const user = await User.findByIdAndDelete(id)

        if(!user){
            return res.status(404).json({message: `user not found`})
        }

        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
})
 
mongoose.connect(url)
.then(() => {
    console.log("Connected");

    app.listen(port, ()=> {
        console.log(port);
    })

}).catch((e) => {
    console.log(e);
})



