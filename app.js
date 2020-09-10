const express = require("express");
const app = express();
const {mongoose} = require('./database/mongoose')

const bodyParser = require("body-parser");

//Models
const { List } = require("./database/models/list-model");
const { Task } = require("./database/models/task-model");

//Middleware
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  

/*GET API'S*/

//Get List:
app.get("/lists", (req, res) => {
   List.find({}).then((listItem)=>{
        res.send(listItem)
    }) 
});

//Get Tasks:
app.get("/lists/:listId/tasks", (req, res)=>{
    Task.find({
        listId: req.params.listId
    }).then((taskItems) => {
        res.send(taskItems)
    })
})

/* CREATE API'S */

//Create Lists
app.post("/lists", (req, res) => {
   let title = req.body.title;
   let newList = new List({
       title
   });
   newList.save().then((listDoc) => {
       res.send(listDoc);
   })
});

//Create Tasks
app.post("/lists/:listId/tasks", (req, res) => {
    //let task = req.body.title;
    let newTask = new Task({
        title: req.body.title,
        listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc)
    });
});

/* UPDATE API'S */

//Update List:
app.patch("/lists/:id", (req, res) => {
   List.findOneAndUpdate(
       { 
           _id: req.params.id 
        }, 
        {
            $set: req.body}).then(() => {
                res.send({ message : "updated successfully"});
            });
});

//Update Tasks:
app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        listId: req.params.listId
    },
    {
        $set: req.body
    }).then(() => {
        res.send({message: "updated successfully"})
    })
})

/* DELETE API'S */

//Delete List:
app.delete("/lists/:id", (req, res) => {
    List.findOneAndDelete({
        _id: req.params.id
    }).then((deletedListDoc) => {
        res.send(deletedListDoc)
    })
});

//Delete Tasks:
app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findByIdAndDelete({
        _id: req.params.taskId,
        listId: req.params.listId
    })
    .then(() => {
        res.send({message: "updated successfully"})
    })
})





app.listen(3000, () => {
    console.log("server active on port 3000");
})