module.exports=
{
    HOST : "localhost",
    USER : "postgres",
    password: "Madhuri@1217",
    DB: "mtxdb",
    dialect: "postgres",
    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle: 10000
    }
};