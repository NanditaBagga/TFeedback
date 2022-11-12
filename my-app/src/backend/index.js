const express=require("express")
const mongoose =require("mongoose")
const cors=require("cors")
const app=express()
const Courses=require("./routes/courses")
const Users=require("./routes/users")

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Port 3000")
})

app.use('/', Users);
app.use('/home', Courses);

mongoose.connect("mongodb+srv://test-admin1:test1@cluster0.jokbckk.mongodb.net/?retryWrites=true&w=majority",(err,coll)=>{
    if(err){
        console.error("Database not connected");
        process.exit(1);
    }
    console.log("Database connected successfully");
}); 

app.listen(5000,()=>{
    console.log("Server running on http://localhost:5000");
});