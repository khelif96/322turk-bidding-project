var User = require('../app/models/userSchema');

exports.addFunds = (req, res) =>{
   if(req.body.amount === undefined){
      res.status(404).json({error: "amount isn't specified"});
   }
   else{
      User.findOne({api_token: req.body.api_token},function(err, userDoc){
         if(!userDoc || err){
            res.status(401).json({error: "Invalid api_token"});
         }
         else{
            if(parseInt(req.body.amount) > 0){
               userDoc.funds = userDoc.funds + parseInt(req.body.amount);
               userDoc.save(function(err){
                  if(err){
                     res.status(500).json({error: "Error adding funds"});
                  }
               });
               res.status(201).json({message: "Successfully added funds"});
            }
            else{
               res.status(400).json({error: "Invalid amount"});
            }
         }
      });
   }
}
