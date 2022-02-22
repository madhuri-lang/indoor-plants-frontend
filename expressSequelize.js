var express = require('express');
var Sequelize = require('sequelize');
var dbConfig = require("./db.config");
var cors = require('cors');
const app = express();
app.use(cors());
//connect to db 

const sequelize = new Sequelize(dbConfig.DB , dbConfig.USER, dbConfig.password,{
    host : dbConfig.HOST ,
    dialect : dbConfig.dialect,
    pool:{
        max : dbConfig.pool.max,
        min : dbConfig.pool.min,
        acquire : dbConfig.pool.acquire,
        idle : dbConfig.pool.idle
    }
});

sequelize.authenticate().then( ()=>{
    console.log("connect to db successfully");
}).catch( (err)=>{
    console.error(err);
});

// define table

let EmployeeTable = sequelize.define('employeesequelize' , {
    emp_id:{
      primaryKey : true,
      type : Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    dept:Sequelize.STRING,
    designation:Sequelize.STRING
},{
    timestamps : false,
    freezeTableName : true
});

//create table
/*
EmployeeTable.sync({force:true}).then( ()=>{
    console.log("Table created successfully...");
}).catch( (err)=>{
    console.error(err);
});
*/


//app get method
app.get('/' ,(req,res)=>{
    console.log("At get of http://localhost:3000");
    res.send("Helloooo....");
});

// app get all employees method
app.get('/getAllEmployees' , (req,res)=>{
    EmployeeTable.findAll({raw:true}).then( (data)=>{
        console.log(data);
        res.status(200).send(data);
    }).catch( (err)=>{
        console.error("Error from db is: "+err);
        res.status(400).send(err);
    })
});


//retrieve data by primarykey - id:

app.get('/getEmployeeById/:id',(req,res)=>{
    var id = req.params.id;
    console.log("Given ID is: "+id);

    EmployeeTable.findByPk(id , {raw:true}).then( (data)=>{
        console.log(data);
        res.status(200).send(data);
    }).catch( (err)=>{
        console.error("Error from db is: "+err);
        res.status(400).send(err);
    })
});


//Insert a record into the table Employeesequelize
app.use(express.json());
app.post('/insertEmployee' ,(req,res)=>{
    var emp_id = req.body.emp_id;
    var name = req.body.name;
    var dept = req.body.dept;
    var designation = req.body.designation;
  

    var empObj = EmployeeTable.build(
        {
            emp_id:emp_id,
            name:name,
            dept:dept,
            designation:designation
        });
    empObj.save().then( (data)=>{
        var strMsg = "Record inserted successfully...";
        res.status(201).send(strMsg);
    }).catch( (err)=>{
        console.error("Error from db is: "+err);
        res.status(400).send(err);
    })
});

//Update the record
app.put('/updateEmployee', (req,res)=>{
    var emp_id = req.body.emp_id;
    var name = req.body.name;
    var dept = req.body.dept;
    var designation = req.body.designation;

    EmployeeTable.update( 
        {name:name , dept:dept, designation:designation},
        {where : {emp_id:emp_id}}
    ).then( (data)=>{
        console.log(data);
        var strMsg = "Record Updated Successfully...";
        res.status(201).send(strMsg);
    }).catch( (err)=>{
        console.error("Error from db is: "+err);
        res.status(400).send(err);
    })
});

//Delete the record by ID
app.delete('/deleteEmployeeById/:id', (req,res)=>{
    var id = req.params.id;
    console.log("Given id is: "+id);

    EmployeeTable.destroy ({where : {emp_id:id}}).then( (data)=>{
        console.log(data);
        var strMsg = "Record Deleted Successfully..";
        res.status(200).send(strMsg);
    }).catch( (err)=>{
        console.error("Error from db is: "+err);
        res.status(400).send(err);
    })
});



app.listen(3000, ()=>{
    console.log("Server listening at http://localhost:3000");
});