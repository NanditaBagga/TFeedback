const express=require("express")
const mongoose =require("mongoose")
const cors=require("cors")
const app=express()
const Home=require("./routes/home")
const LoginAndRegister=require("./routes/loginAndRegister")

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.get("/",(req,res)=>{
    res.send("Port 3000")
})

app.use('/', LoginAndRegister);
app.use('/home', Home);

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
