module.exports = function(app){

    // ----------> GET Routes <--------------- //
   app.get('/',function(req,res){
       res.render('index')
   })

   app.get('/login',function(req,res){
     res.render('login')
   })

   app.get('/signup',function(req,res){
    res.render('signup')
   })

   // -----------> POST Routes <------------- //

   app.post('/login',function(req,res){
     var mongoUtil = require( '../../public/assets/scripts/mongodb.js' );
     var conn = mongoUtil.getDb();
     console.log(req.body)
     conn.collection('Users').findOne({'Username':req.body.Username,'Password':req.body.Password},function(err,result){
         console.log(result)
         if(result){
             switch(result.Type){
                 case "Admin":res.send("Admin");break;
                 case "Client":res.send("Client");break;
                 default:break;
             }
         }else{
             res.send("Invalid Credentials");
         }
     })
   })

   app.post('/signup',function(req,res){
    var mongoUtil = require( '../../public/assets/scripts/mongodb.js' );
    var conn = mongoUtil.getDb();
    console.log(req.body)
    conn.collection('Users').findOne({"FullName":req.body.FullName},function(err,result){
        if(result){
          res.send("User already exist!");
        }else{
          conn.collection('Users').insertOne(req.body);
          res.send("Successful! You can now login!")
        }
    })
    //conn.collection('Users').insertOne(req.body);
   })
}