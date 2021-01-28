const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;



User = require("./model/helpers/user");

UserRoute = require("./routes/user");

app.use(express.static(__dirname));
app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit:50000
}));



   
app.use(cors());
mongoose.connect('mongodb://localhost/usermanagement', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection;

app.get('/', (req, res) => {
    res.send("Start Server");
});


app.use("/user",UserRoute);


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    var origin = req.headers.origin;
    if(origin == undefined) res.sendStatus(403);
    else{
        let origins = config.me.origins;
        if(origins.indexOf(origin) > -1){
            res.header('Access-Control-Allow-Origin', origin);
            next();
        }else{
            res.sendStatus(403);
        }
    }
});

app.listen(PORT , console.log(`SERVER RUNNING ON PORT ${PORT}`))