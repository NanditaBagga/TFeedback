const router=require("express").Router()
let Courses=require("../models/courses")
let Users=require("../models/user")
let mongoose=require('mongoose')

router.route('/').get((req, res) => {
    Courses.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/course/:id').get((req,res)=>{
    Courses.findById(req.params.id).then(response=>{
        res.json(response)  
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add/course').post((req,res)=>{
    const { title, photo, createdAt } = req.body
    const sub=""
    const newCourse = new Courses({title, photo, createdAt,SubAdmin:sub});

  newCourse.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/course/:id/send').post((req,res)=>{
    const ID=req.params.id
    const msg=req.body.title
    const from=req.body.from
    const userType=req.body.userType
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    const time=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    today = mm + '/' + dd + '/' + yyyy + " "+ time;
    Courses.updateOne({_id:ID},{$push:{messages:{title:msg,from:from,userType:userType,date:today,upvotes:0,upvotesBy:[]}}}).then(response=>{
        res.json('Message added!')
    })
    .catch(e=>{
        res.status(400).json('Error: ' + e)
    })
})

router.route('/view/:status').get((req,res)=>{
    const status=req.params.status
    Users.find({type:status}).then(response=>{
        res.json(response)
    })
    .catch(e=>{
        res.status(400).json('Error: ' + e)
    })
})

router.route('/profile/update').post((req,res)=>{
    const { id,key,value }=req.body
    if(key==="mobile")
    {
        Users.updateOne({_id:id},{$set:{"mobile":value}}).then(response=>{
            res.json(response)
        })
        .catch(e=>{
            res.status(400).json('Error: ' + e)
        })
    }
    else{
        Users.updateOne({_id:id},{$set:{"password":value}}).then(response=>{
            res.json(response)
        })
        .catch(e=>{
            res.status(400).json('Error: ' + e)
        })
    }
})

router.route("/course/:cid/:mid/:name/upvote").post((req,res)=>{
    const { cid,mid,name } = req.params
    var id = mongoose.Types.ObjectId(mid);
    var did=null
    Courses.findById({_id:cid,messages:{$elemMatch:{_id:mid}}}).then(response=>{
        var msg=null
        for(let i=0;i<response.messages.length;i++)
        {
            if(id.equals(response.messages[i]._id))
            {
                msg=response.messages[i]
                msg.upvotes=msg.upvotes+1
                msg.upvotesBy.push({name:name})
                did=response._id
            }
        }
        let data={
            title:msg.title,
            from:msg.from,
            userType:msg.userType,
            date:msg.date,
            upvotes:msg.upvotes,
            upvotesBy:msg.upvotesBy
        }
        Courses.findOneAndUpdate({_id:did,messages:{$elemMatch:{_id:mid,date:msg.date}}},
            {$set:{
                    "messages.$":data
            }}
        ).then(resp=>{
            res.json("Done")
        }).catch(e=>{
            console.log(e)
            res.json("Error occured")
            alert("Some error occured")
        })

    }).catch(e=>{
        console.log(e)
        res.json("Error occured")
        alert("Some error occured")
    })
})

router.route("/course/:cid/:mid/:name/downvote").post((req,res)=>{
    const { cid,mid,name } = req.params
    Courses.findById({_id:cid,messages:{$elemMatch:{_id:mid}}}).then(response=>{
        var msg=null
        var did=null
        var id = mongoose.Types.ObjectId(mid);
        for(let i=0;i<response.messages.length;i++)
        {
            if(id.equals(response.messages[i]._id))
            {
                msg=response.messages[i]
                msg.upvotes=msg.upvotes-1
                did=response._id
            }
        }
        
        for(let i=0;i<msg.upvotesBy.length;i++)
        {
            if(msg.upvotesBy[i].name==name)
            {
                msg.upvotesBy.splice(i,1)
                break
            }
        }
        let data={
            title:msg.title,
            from:msg.from,
            userType:msg.userType,
            date:msg.date,
            upvotes:msg.upvotes,
            upvotesBy:msg.upvotesBy
        }
        Courses.findOneAndUpdate({_id:did,messages:{$elemMatch:{_id:mid,date:msg.date}}},
            {$set:{
                    "messages.$":data
            }}
        ).then(resp=>{
            res.json("Done")
        }).catch(e=>{
            console.log(e)
            res.json("Error occured")
            alert("Some error occured")
        })

    }).catch(e=>{
        console.log(e)
        res.json("Error occured")
        alert("Some error occured")
    })
})

router.route("/course/SubAdmin").post((req,res)=>{
    const SubAdmin=req.body.SubAdmin
    const id=req.body.id
    Courses.updateOne({_id:id},{$set:{SubAdmin:SubAdmin}}).then(response=>{
        console.log(response)
        res.json("Done")
    }).catch(e=>{
        res.json("Error occured")
    })
})


module.exports = router;