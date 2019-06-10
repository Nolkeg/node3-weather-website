const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express()

const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath =path.join(__dirname,"../public");

//define path for hbs view
const viewsPath = path.join(__dirname, "../templates/views");

//define path for hbs partirals
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location for express
app.set("view engine","hbs");

app.set("views", viewsPath); //update customize view path;

hbs.registerPartials(partialPath); 

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("",(req,res)=>{
    res.render("index",{
        title: "Weather",
        name: "Klong"
    })
})


app.get("/about",(req,res)=>{
    res.render("about",{
        title: "About Me",
        name: "Klong"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        helpText : "Blah Blah",
        title: "Help Page",
        name: "Klong"
    })
})

app.get("/weather", (req,res)=>{
    if(!req.query.adress)
    {
        return res.send({
            error: "You must provide an adress."
        })
    }

    geocode(req.query.adress, (error,{location,latitude,longtitude}={})=> {

        if(error)
        {
            return res.send({
                error: error
            });
        }
    
        forecast(latitude,longtitude, (error,fData)=>{
    
            if(error)
            {
                return res.send({
                    error: error
                });
            }
            
            res.send({
                adress : req.query.adress,
                location : location,
                forecast : fData
            })
        })
    })
})

app.get("/products",(req,res)=>{
    if(!req.query.adress)
    {
        return res.send({
            error: "you must provide an adress"
        })
    }
    res.send({
        adress: []
    })
    
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title : "Error404",
        name : "klong",
        errorText : "Help page not found"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title : "Error 404",
        name : "Klong",
        errorText : "Page not found"

    })
})



app.listen(port, ()=>{
    console.log("Server is up on port " + port);
})