module.exports = function(app){

    // ----------> GET Routes <--------------- //
   app.get('/',function(req,res){
      req.session.loggedin = false;
      res.render('index')
   })

   app.get('/adminhome', (req,res) =>{
      res.render('adminhome')
   });

   app.get('/adminfamily', (req,res) =>{
    var mongoUtil = require( '../../public/assets/scripts/mongodb.js' );
    var conn = mongoUtil.getDb();
    conn.collection('Posts').find({}).toArray(function(err,result){
       if(result.length > 0){
         res.render('adminfamily',{Comments:result});
       }else{
        res.render('adminfamily',{Comments:null});
       }
    })
    
 });

   app.get('/login',function(req,res){
     res.render('login')
   })

   app.get('/signup',function(req,res){
    res.render('signup')
   })

   app.get('/changePass',(req,res) =>{
     if(req.session.loggedin){
       res.render('changepass',{User:req.session.username});
     }else{
       res.render('login');
     }
    
   });

   app.get('/family', function(req, res){
    var mongoUtil = require( '../../public/assets/scripts/mongodb.js' );
    var conn = mongoUtil.getDb();
    conn.collection('Posts').find({}).toArray(function(err,result){
       if(result.length > 0){
         res.render('family',{Comments:result});
       }else{
        res.render('family',{Comments:null});
       }
    })
   })

   app.get('/home', function(req, res){
    res.render('index')
  })

  app.get('/adventure', function(req, res){
    res.render('adventure')
  })

  app.get('/romantic', function(req, res){
    res.render('romantic')
  })

   // -----------> POST Routes <------------- //

   app.post('/login',function(req,res){
     var mongoUtil = require( '../../public/assets/scripts/mongodb.js' );
     var conn = mongoUtil.getDb();
     console.log(req.body)
     conn.collection('Users').findOne({'Username':req.body.Username,'Password':req.body.Password},function(err,result){
         console.log(result)
         if(result){
            req.session.loggedin= true;
            req.session.username = req.body.Username;
            req.session.password = req.body.Password;
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

   app.post('/postComment',function(req,res){
      if(!req.session.loggedin){
          res.send('false');
      }else{
          var mongoUtil = require( '../../public/assets/scripts/mongodb.js' );
          var conn = mongoUtil.getDb();

          console.log(req.body)
          console.log(req.session.username)
          var comment = {
            Username:req.session.username,
            Description : req.body.Description,
            Date : req.body.Date
          }
          conn.collection('Posts').insertOne(comment);
          res.send("Your comment is successfully posted !");
      }

    //conn.collection('Users').insertOne(req.body);
   })

   app.post('/changePass',(req,res) =>{
      var mongoUtil = require( '../../public/assets/scripts/mongodb.js' );
      var conn = mongoUtil.getDb();
      console.log(req.body);
      conn.collection('Users').updateOne({'Username':req.body.Username},{$set:{'Password':req.body.NewPassWord}});
      res.send("Your password has successfully changed");
   });

   app.post('/deletePost',(req,res) =>{
      var mongoUtil = require( '../../public/assets/scripts/mongodb.js' );
      var conn = mongoUtil.getDb();
      var ObjectId = require('mongodb').ObjectID;
      console.log(req.body);
      conn.collection('Posts').deleteOne({'_id':ObjectId(req.body.ID)});
      res.send("Comment successfully removed");
   });
}