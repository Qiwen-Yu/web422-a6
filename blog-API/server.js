/*********************************************************************************
* WEB422 – Assignment 5
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students.
* 
* Name: ___Qiwen Yu____ Student ID: __120505177___ Date: _2020/12/10__
* Heroku Link: _______ 
********************************************************************************/

const mongoDBConnectionString = "mongodb+srv://QIWEN-DBUser:yww1509089133621@cluster0.uf1i8.mongodb.net/blog?retryWrites=true&w=majority";

const HTTP_PORT = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require('body-parser');

const cors = require("cors");
const dataService = require("./modules/data-service.js");

const data = dataService(mongoDBConnectionString);
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/api/posts", (req,res)=>{
    data.addNewPost(req.body).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    });
});

// IMPORTANT NOTE: ?tag=#funny wll not function, but ?tag=funny will
app.get("/api/posts", (req,res) => {
    data.getAllPosts(req.query.page, req.query.perPage, req.query.category, req.query.tag).then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    })
});

app.get("/api/categories", (req,res)=>{
    data.getCategories().then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    })
});

app.get("/api/tags", (req,res)=>{
    data.getTags().then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    })
});

app.get("/api/posts/:id",(req,res)=>{
    data.getPostById(req.params.id).then(data=>{
        res.json(data);
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    });
});

app.put("/api/posts/:id", (req,res)=>{
    data.updatePostById(req.body,req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    });
});

app.delete("/api/posts/:id", (req,res)=>{
    data.deletePostById(req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    });
});



data.connect().then(()=>{
    app.listen(HTTP_PORT, ()=>{console.log("API listening on: " + HTTP_PORT)});
})
.catch((err)=>{
    console.log("Cannot start the server: " + err);
    process.exit();
});
