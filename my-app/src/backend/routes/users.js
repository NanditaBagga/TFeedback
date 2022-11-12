const userRouter=require("express").Router()
let Users=require("../models/user")

userRouter.route('/login').get((req, res) => {
    const { name,password,type,key } =req.query
    Users.findOne({name:name,password:password,type:type}).then(response=>{
        if(response===null)
        {
            res.json("No")
        }
        else{
            console.log(response)
            res.json(response)
        }
    }).catch(e=>{
        console.log(e)
        res.status(400).json('Error: ' + e)
    })
});

userRouter.route('/register/:name').get((req,res)=>{
    const {name}=req.params
    Users.findOne({name:name}).then(response=>{
        if(response===null)
        {
            res.json("User already exists")
        }
        else{
            res.json("Ok")
        }
    }).catch(e=>{
        console.log(e)
        res.status(400).json('Error: ' + e)
    })
})

userRouter.route('/register').post((req, res) => {
    const {name,password,email,mobile,type}=req.body;
    const newUser = new Users({name,password,email,mobile,type});
    newUser.save()
    .then((response) =>
        res.json(response)     
    )
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = userRouter;