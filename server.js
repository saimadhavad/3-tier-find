const mongoose = require("mongoose");
const express =  require("express");
const cors =  require("cors");

const app = express();
app.use(cors());
app.listen(1629,()=>{
    console.log("Listening to port 1629..")
});

app.get("/countriesList", async (request,response) =>{
    let countriesList = await Employee.find().distinct("country");
    response.json(countriesList);
});
app.get("/departmentsList", async (request,response) =>{
    let departmentsList = await Employee.find().distinct("department");
    response.json(departmentsList);
});
app.get("/gendersList", async (request,response) =>{
    let gendersList = await Employee.find().distinct("gender");
    response.json(gendersList);
});


app.get("/employees", async (request,response)=>{

    console.log(request.query);
    let employeesData = await Employee.find().and([
         {country: request.query.country},
         {department: request.query.department},
         {gender: request.query.gender}
        ]);
    // .distinct("department");
    // .sort("age department country");
    // .select("firstName lastName -_id");
    // .and([{country:"Russia"},
    //   {gender:"Male"},
    //   {age:{$gte:20,$lte:40}}
    // ]);
    // .countDocuments();
    // .skip(200);
    // .limit(100);
    response.json(employeesData);
});
app.get("/employees/:country/:department/:gender", async (request,response)=>{

    console.log(request.params);
    let employeesData = await Employee.find().and([
         {country: request.params.country},
         {department: request.params.department},
         {gender: request.params.gender}
        ]).sort(request.query.order == "desc" ? "-id" : "id").limit(parseInt(request.query.limit));
    response.json(employeesData);
});


let employeesSchema = new mongoose.Schema({
    id:Number,  
    firstName:String,
    lastName:String,
    email:String,
    gender:String,
    age:Number,
    department:String,
    country:String,
    profilePic:String
});

let Employee =  new mongoose.model("employees",employeesSchema,"employees");

// let getDataFromDB = async () =>{
//     let employeesDataArray = await Employee.find();
//     console.log(employeesDataArray);
// }

let connectToMDB = async () => {
    try {
       await mongoose.connect("mongodb+srv://saimadhava:sai1611@saicluster2409.4vnn2.mongodb.net/BRNSIDB?retryWrites=true&w=majority&appName=saicluster2409");
        console.log("SUCCESSFULLY connected to mongoDB.");
        // getDataFromDB();
    } catch (error) {
        console.log("UNABLE to connect to mongoDB");
    }
};
connectToMDB();