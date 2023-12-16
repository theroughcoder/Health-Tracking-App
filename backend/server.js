
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");
const path = require("path");
const db = require("./config/mongoose");

const routes = require("./routes");
var cors = require('cors');


app.use(express.json())
// parsing encoded data 
app.use(express.urlencoded());

// cross origin resource sharing
let allowed = [  'http://localhost:3000', 'https://todo-ebon-phi.vercel.app' ];
function options(req, res){
    let temp;
    let origin = req.header('origin');
    if(allowed.indexOf(origin) > -1){
        temp ={
            origin: true,
            optionSuccessStatus: 200
        } 
    }else{
         temp={
            origin :"stupid"
         }   
    }
    res(null, temp)
}

app.use(cors(options))

// for using static files 
app.use( express.static("assets")); 


// routes
app.use("/", routes); 

// server listener 
app.listen(port, () => {
  console.log(`Health app is listening on port ${port}`)
})