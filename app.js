const express = require('express');
const app =express();
const port = 3000;
const middleware = require('./middleware')

const server = app.listen(port,()=>console.log("Server listening on port " + port));


app.set("view engine","pug");
app.set("views","views");

//Routes
const loginRoute= require('./routes/loginRoutes')
app.use("/login",loginRoute);

app.get("/",middleware.requireLogin,(req,res,next)=>{

    var payload = { 
        pageTitle: "Welcome friends"
    }
    
    res.status(200).render("home",payload);
    //see here we are changing this from "send" to "render"
    // rendering the home pug file and passing payload object to change data dynamically
});
//handle get request from the server by default link

