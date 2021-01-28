const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    user_name:{
        type: String,
        required: true,       
    },
    user_number:{
        type: Number,
        default: null,
        required: true, 
    },
    user_address:{
        type: String,
        default: null,
        required: true, 
    }
})

    
const User = module.exports = mongoose.model('user', userSchema);


module.exports.addAdmin = (userObj,callback) => {

    User.count({user_number: userObj.user_number}, function (error, count)
    {
        if(count>0){callback({status:false,data:"Already Exist"})}
        else{
            User.create(userObj, (error, user) => {
                if(error){ callback({status:false,data:error})}
                    else{
                        if(user){
                try 
                    {
                        user.save(function (error , data) { 
                            if(error){callback({status:false,data:error})}
                            else{
                                if(data){callback({status:true,data:data})}
                            }
                            })
                    } 
                catch(e) {errorHandler(e)}}}
            })
            }
    });
}


module.exports.findUser = (findObj,callback) =>{
    User.findOne(findObj,function(err,doc){
       if(err || !doc)
       {
           callback({status:false,data:err})
       }
       else{
           if(doc)
           {
            callback({status:true,data:doc})
           }
       }
    })
}