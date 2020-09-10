const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
    "mongodb://localhost:27017/TaskManager", 
    { useNewUrlParser : true})
        .then(()=>{
            console.log("DB connection works!")
}).catch((err)=>{
    console.log("DB connection did not work");
    console.log(err)
});

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = {
    mongoose
}

