var express = require('express');
var router = express.Router();
var User = require("../model/helpers/user");



router.post('/create',(req, res) => {
    let userObj =   req.body; 
    User.addAdmin(userObj,(error, data) => 
    {
      if(error){res.send(error)}
      else{if(data){res.send(data)}}
    });
  });

  router.post('/find',(req, res) => {
    let userObj =   req.body; 
    User.findUser(userObj,(error, data) => 
    {
      if(error){res.send(error)}
      else{if(data){res.send(data)}}
    });
  });


  router.get('/getall',(req,res)=>{
  User.find(function (err, results) {
    if(err){
        res.send({status:false,err})
    }
res.send({status: true, results});
  });
});
 


  
module.exports = router;