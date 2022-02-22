var express = require('express');
var dbConfig = require('./db.config');
var Sequelize = require('sequelize');
const app = express();

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

//define a table
let InsuranceTable = sequelize.define('insurancesequelize',{
    policyNumber : {
        primaryKey:true,
       type :  Sequelize.INTEGER
    },

    holderName : Sequelize.STRING,
    policyAmount: Sequelize.INTEGER,
    maturityAmount : Sequelize.INTEGER,
    nominee : Sequelize.STRING 

},
{
    timestamps:false,
    freezeTableName: true
});

// create table using sync
/*
InsuranceTable.sync({force:true}).then( ()=>{
    console.log("Table is created..");
}).catch( (err)=>{
    console.log(err);
});
*/



app.get('/', (req,res)=>{
    console.log("insurance table..");
    res.send("hello these are insurance details")
});



// get all Policies
app.get('/getAllPolicies', (req,res)=>{
         InsuranceTable.findAll({raw:true}).then( (data)=>{
             console.log("All Insurance Details..");
             res.status(200).send(data);
         }).catch( (err)=>{
             console.log(err);
             res.status(400).send(err);
         })
});


//get policies by ID
app.get('/getPolicyById/:policyNumber' ,(req,res)=>{
    var id = req.params.policyNumber;
    InsuranceTable.findByPk(id ,{raw:true}).then( (data)=>{
        console.log("Getting data by PolicyNumber");
        res.status(200).send(data);
    }).catch( (err)=>{
        console.error("Error from db is: "+err);
        res.status(400).send(err);
    })
});

// Create new record
app.use(express.json());
app.post('/newRecord' ,(req,res)=>{
    var pno = req.body.policyNumber;
    var pname = req.body.holderName;
    var pamt = req.body.policyAmount;
    var mamt = req.body.maturityAmount;
    var nom = req.body.nominee;

    var insObj= InsuranceTable.build(
        {
        policyNumber: pno,
        holderName : pname,
        policyAmount : pamt,
        maturityAmount : mamt,
        nominee : nom
        });
    insObj.save().then( ()=>{
        msg = "New Record is created successfully";
        res.status(200).send(msg);
    }).catch( (err)=>{
        console.error("Error from db is: "+err);
        res.status(400).send(err);
    })
});


//Update a policy
app.put('/updatePolicy', (req,res)=>{
    var pno = req.body.policyNumber;
    var pname = req.body.holderName;
    var pamt = req.body.policyAmount;
    var mamt = req.body.maturityAmount;
    var nom = req.body.nominee;

    InsuranceTable.update({ holderName:pname , policyAmount:pamt , maturityAmount:mamt , nominee:nom},
        {where:{policyNumber:pno}} ).then( (data)=>{
            msg ="Record updated Successfully..";
            res.status(200).send(msg);
        }).catch( (err)=>{
            console.error("Error from db is: "+err);
            res.status(400).send(err);
        })
});


//delete a record
app.delete('/deletepolicyById/:policyNumber', (req,res)=>{
    var id = req.params.policyNumber;
    InsuranceTable.destroy({where: {policyNumber:id}}).then( (data)=>{
        console.log(data);
        msg = "Record Deleted Successfully..";
        res.status(200).send(msg);
    }).catch( (err)=>{
        console.error("Error from db is: "+err);
        res.status(400).send(err);
    })
});


app.listen(3000, ()=>{
    console.log("Server is listening at http://localhost:3000");
});


