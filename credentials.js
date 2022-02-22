var express = require('express');
var dbConfig = require('./db.config');
var Sequelize = require('sequelize');
var cors = require('cors');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
 const path = require('path');
const PUBLISHABLE_KEY = "pk_test_51K4p9kSEH1RnTHFJisu6qcY7Vdq5xnK1Ii5Tdowsqvom7dzNCxWTURaozNKZUxvTD0AMpPPYNox1dAsYzTg9N1Rj00e3ivRGGE"
const SECRET_KEY ="sk_test_51K4p9kSEH1RnTHFJuoopY9fu21CzHu3z2jpDQ8lKEASyMmm5kl8ZmwVFfqlmHVzXUCGbkFQYyyHABPsbaRPiEpIZ00a7KQzbgt"
const stripe = require('stripe')(SECRET_KEY)
const app = express();
app.use(cors());
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(bodyParser.json())
 app.set("view engine","ejs");

//db connection
const sequelize = new Sequelize(dbConfig.DB , dbConfig.USER, dbConfig.password,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    }
});

//authenticate db connection 
sequelize.authenticate().then( ()=>{
    console.log("DB is connected..");
}).catch( (err)=>{
    console.log(err);
});

app.use(express.json());

//Nodemailer transporter
var transporter = nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
            user: 'vakkalamadhuri@gmail.com',
            pass:'Madhuri@1217'
        }
    }
);

//define table

let UserTable = sequelize.define('usercredential', {
    id: 
    {     autoIncrement: true,
        type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    phone : Sequelize.STRING,
    email : 
    {
        primaryKey:true,
        type: Sequelize.STRING 
    },
    password: Sequelize.STRING,
},{
    timestamps:false,
    freezeTableName:true
});
//table creation 
/*
UserTable.sync({force:true}).then( ()=>{
    console.log(" User Credentials Table is created..");
}).catch( (err)=>{
    console.log(err);
});
*/

//user register
app.post('/register' ,(req,res)=>{
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var pwd = req.body.password;
    bcrypt.hash(pwd , 10, (err,hash)=>{
        if(err) res.status(500).send(err);
        else{
            var userObj = UserTable.build({
                name:name,
                phone:phone,
                email:email,
                password:hash
             });
             userObj.save().then( (data)=>{
                 console.log("User registered Successfully..");
                 var msg = "Registration Successful..";
                 res.status(200).send(msg);
         
                 var mailOptions={
                     from:'vakkalamadhuri@gmail.com',
                     to: userObj.email,
                     subject:'Welcome Msg from Growgreen Website',
                     html:'<html><body><h4 style="color:green">Welcome to Growgreen. Thankyou for registering with us as a Valuable Customer! </h4> <br><img src="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-combo-packs-plants-set-of-3-outdoor-flowering-plants-for-beautiful-garden-16969318301836_578x578.jpg?v=1634228699" alt="" height="250px;"><br><p style="color:red">Please check our new offers.</p><br><a href="#">Login Here!</a></body></html>'
                 };
                 console.log(mailOptions.to);
                 transporter.sendMail(mailOptions, function(error, info){
                     if (error) {
                       console.log(error);
                     } else {
                       console.log('Email sent: ' + info.response);
                     }
                   });
         
             }).catch( (err)=>{
                 console.log(err);
                 res.status(400).send(err);
             })
        }
       })

 
});

//user Login
app.post('/login', (req,res)=>{
    var email = req.body.email;
    var pwd = req.body.password;
    
    strtoReturn = "You are not a valid user";
    UserTable.findAll( {where: {
    email:email},raw:true}).then( (data)=>{
bcrypt.compare(pwd , data[0].password.toString()).then( (bResult)=>{
    if(bResult)
    {
        strtoReturn="valid user";
        res.status(200).send(strtoReturn); 
    }
    else
    {
        res.send(strtoReturn); 
    }
}).catch( (err)=>{

    res.send("email not found");
       
   })
    //     if(data[0].password.toString() ==pwd)
    //     {
    //     strtoReturn="valid user";
    //     res.status(200).send(strtoReturn);
    //     }
    //     else {  
    //      res.send(strtoReturn); 
    //     }
    }).catch( (err)=>{

     res.send("email not found");
        
    })
});

//ForgotPassword
app.post('/forgotpassword', (req,res)=>{
    var email = req.body.email;
    UserTable.findAll( {where: {
    email:email},raw:true}).then( (data)=>
    {
        res.status(200).send(data);
        var mailOptions={
            from:'vakkalamadhuri@gmail.com',
            to: email,
            subject:'Forgot Password mail from Growgreen Website',
            html:'<a href="http://localhost:4200/resetpassword">Reset Password</a>'
        };
        console.log(mailOptions.to);
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

    }).catch( (err)=>{
        console.log(err);
        res.status(400).send(err);
    })
});

//resetPassword
app.put('/resetpassword', (req,res)=>{
    var email = req.body.email;
    var password= req.body.password;

    UserTable.update({ password:password},
        {where:{email:email}} ).then( (data)=>{
            msg ="Record updated Successfully..";
            res.status(200).send(data);
        }).catch( (err)=>{
            console.error("Error from db is: "+err);
            res.status(400).send(err);
        })
});


// get all Users 
app.get('/getAllUsers', (req,res)=>{
    UserTable.findAll({raw:true}).then( (data)=>{
        console.log("All users are displayed!");
        res.status(200).send(data);
    }).catch( (err)=>{
        console.error(err);
        res.status(400).send(err);
    })
});

//get User by Id
app.get('/getUserById/:id' , (req,res)=>{
    var id = req.params.id;
    UserTable.findAll({where:{id:id} , raw:true}).then( (data)=>{
        console.log("User is displayed by ID");
        res.status(200).send(data);
    }).catch( (err)=>{
        console.error(err);
        res.status(400).send(err);
    })
});

//get User by Name
app.get('/getUserByName/:name' , (req,res)=>{
    var name = req.params.name;
    UserTable.findAll({where:{name:name} , raw:true} ).then( (data)=>{
        console.log("User is displayed by Name");
        res.status(200).send(data);
    }).catch( (err)=>{
        console.error(err);
        res.status(400).send(err);
    })
})


// Plants table 
let plants = sequelize.define('plants',
{
    cost: Sequelize.INTEGER,
    cardtitle : Sequelize.STRING,
    url: Sequelize.STRING,
    category:Sequelize.STRING,
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    quantity:Sequelize.INTEGER
},
{
    timestamps:false,
    freezeTableName:true
});
/*
plants.sync({force:true}).then( ()=>{
    console.log("Plants table created..");
}).catch( (err)=>{
    console.log(err);
})
*/


//get All Products on UI
app.get('/getPlants', (req,res)=>{
    plants.findAll({raw:true}).then( (data)=>{
        console.log("All Plants are displayed!");
        res.status(200).send(data);
    }).catch( (err)=>{
        console.error(err);
        res.status(400).send(err);
    })
})


//Cart Table
let Cart = sequelize.define('cart',
{
    cost: Sequelize.INTEGER,
    cardtitle : Sequelize.STRING,
    url: Sequelize.STRING,
    category:Sequelize.STRING,
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    quantity:Sequelize.INTEGER,
    totalprice:Sequelize.INTEGER,
    useremail:Sequelize.STRING
},
{
    timestamps:false,
    freezeTableName:true
});
/*
Cart.sync({force:true}).then( ()=>{
    console.log("cart table created..");
}).catch( (err)=>{
    console.log(err);
})
*/

//add item to cart
app.post('/cart' ,(req,res)=>{
    console.log( "cost is :"+req.body.cost);
    var cost = req.body.cost;
    var cardtitle = req.body.cardtitle;
    var url = req.body.url;
    var category = req.body.category;
    var id = req.body.id;
    var quantity = req.body.quantity;
    var totalprice = req.body.cost;
    var useremail = req.body.useremail;
    

    var userObj = Cart.build({
       cost:cost,
       cardtitle:cardtitle,
       url:url,
       category:category,
       id:id,
       quantity:quantity,
       totalprice:totalprice,
       useremail:useremail

    });
    userObj.save().then( (data)=>{
        msg="Cart item entered Successfully..";
        
        res.status(200).send(msg);

    }).catch( (err)=>{
        console.log(err);
        res.status(400).send(err);
    })
});

// get All Cart Products 
app.get('/getProducts/:email', (req,res)=>{
    var email= req.params.email;
console.log("email is :" + email);
    Cart.findAll({where:{useremail:email} ,  raw:true}).then( (data)=>{
        console.log("All Cart Products are displayed!");
        res.status(200).send(data);
    }).catch( (err)=>{
        console.error(err);
        res.status(400).send(err);
    })
})

// delete a product from cart using ID
  app.delete('/removeProduct/:id' ,(req,res)=>{
      var id = req.params.id;
      Cart.destroy({where:{id:id} , raw:true}).then(
          (data)=>{
              console.log(data);
              msg="cart item deleted";
               res.status(200).send(msg);
          }
          
      ).catch((err)=>{
        console.log(err);
    })
  });

  //delete whole cart
  app.delete('/emptyCart/:email' , (req,res)=>{
    var email= req.params.email;
      Cart.destroy({where:{useremail:email} , raw:true}).then( 
          (data)=>{
              msg="cart Emptied";
              res.status(200).send(msg);
          }
      ).catch((err)=>{
        console.log(err);
    })
  });

  // Decrement the quantity of cart item
app.put('/decQuantity', (req,res)=>{
    console.log("DecQuantity is working!");
  Cart.update(
      {
        quantity : req.body.quantity - 1,
        totalprice: req.body.cost * (req.body.quantity - 1)

      },{where:{id : req.body.id}}
  ).then( (data)=>{
      console.log("Data decremented successfully");
      msg="Data decremented successfully"
      res.status(200).send();
  })  .catch( (error)=>{
    console.log(error);
    res.status(400).send(error);
  })

});

//Increment the quantity of cart Item
app.put('/incQuantity', (req,res)=>{
    Cart.update(
        {
          quantity : req.body.quantity + 1,
          totalprice: req.body.cost * (req.body.quantity + 1)
  
        },{where:{id : req.body.id}}
    ).then( (data)=>{
        console.log("Data Incremented successfully");
        msg="Data Incremented successfully"
        res.status(200).send(msg);
    })  .catch( (error)=>{
      console.log(error);
      res.status(400).send(error);
    })
  
  });


  let Orders = sequelize.define('order',
  {
      orderId:{
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey:true
      },
      cost: Sequelize.INTEGER,
      cardtitle : Sequelize.STRING,
      category:Sequelize.STRING,
      id:Sequelize.INTEGER,
      quantity:Sequelize.INTEGER,
      useremail:Sequelize.STRING,
      orderdate:Sequelize.DATEONLY                    
  },
  {
      timestamps:false,
      freezeTableName:true
  });
/* 
  Orders.sync({force:true}).then( ()=>{
      console.log("Orders table created..");
  }).catch( (err)=>{
      console.log(err);
  })
*/

app.delete('/deleteAllItems/:email', (req,res)=>{
    var email= req.params.email;
    console.log("backend for orders is working");
    Cart.findAll({where:{useremail:email} ,  raw:true}).then(
        (data)=>{
            console.log(data);
            for(var i=0;i<data.length;i++){
              var orderObj = Orders.build({
                  orderId:Math.floor(100000 + Math.random() * 900000),
                cost: data[i].cost,
                cardtitle : data[i].cardtitle,
                category : data[i].category,
                id:data[i].id,
                quantity:data[i].quantity,
                useremail : data[i].useremail,
                orderdate:new Date()
        });
       orderObj.save().then( (data)=>{
            msg="Order item entered Successfully..";
            
            //res.status(200).send(data);
        }).then( ()=>{
            console.log("inserted successfully!");
          })
          .catch( (error)=>{
            console.log(error);
          });
          
        }

          Cart.destroy({where:{useremail:email} ,  raw:true})
          .then( (data)=>{
            console.log("Number of items deleted are : "+data);
            res.send(data);
          })
          .catch( (error)=>{
            console.log(error);
            res.status(400).send(error);
          });
        }).catch( (error)=>{
            console.log(error);
          });
        
})
  
app.get('/order/:email', (req,res)=>{
    var email= req.params.email;
   Orders.findAll({where:{useremail:email } ,raw:true}).then(
       (data)=>{
           
           res.status(200).send(data);
       }).catch( (err)=>{
        console.error(err);
        res.status(400).send(err);
    })

})
  


/*
//STRIPE PAYMENT GATEWAY
app.get('/doPayment' ,(req,res)=>{
    res.render('Home',
    {
        key:PUBLISHABLE_KEY
    }),
    msg="Payment is working"
    res.send(msg);
})
app.post('/payment',(req,res)=>{
    stripe.customers.create({
        email:req.body.stripeEmail,
        source: req.body.stripeToken,
        name:'Madhuri Vakkala',
        address:{
            line1:'Mulapet',
            postal_code:'524003',
            city:'Nellore',
            state:'AndhraPradesh',
            country:'India'
        }
    }).then( (customer)=>{
        return stripe.charges.create({
            amount:1349,
            description:'Indoor Plants',
            currency:"INR",
            customer:customer.id
        })
    }).then( (charge)=>{
        console.log(charge);
        res.send("Success")
    }).catch( (err)=>{
        res.send(err)
    })

})

app.post("/stripe", (req, res, next) => {
    console.log("stripe started!");
    stripe.customer.create({
        amount: req.body.amount *100,
        email:req.body.email,
        description: 'One time setup fee',
        currency: 'INR',
        source: req.body.token.id
    }).then( (customer)=>{
        console.log(customer);
        res.send("Success")
    }).catch( (err) => {
        if(err){
            next(err);
        }
        // res.json({success: true, status: "Payments Successful"})
    })
    res.status(200).send("Payment Sucessfull")
    // console.log(req.body);
})
*/

app.post('/stripe'),(req,res)=>{
        console.log(req.body);
       
        stripe.charges.create({
            amount:req.body.price*100,
            currency:'INR',
            description:"One Time Payment",
            source : req.body.result.token.id,
        },
        (err)=>{
            if(err){
                console.log(err);
            }
            res.status(200).send("Payment Sucessfull")
        })
    }



app.listen(3000, ()=>{
    console.log("Server is listening at http://localhost:3000");
});