const router=require("express").Router()
let Courses=require("../models/courses")

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
    const { title, photo, createdAt, messages } = req.body
    const newCourse = new Courses({title, photo, createdAt, messages});

  newCourse.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/course/:id/send').post((req,res)=>{
    const ID=req.params.id
    const msg=req.body.title
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    const time=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    today = mm + '/' + dd + '/' + yyyy + " "+ time;
    Courses.updateOne({_id:ID},{$push:{messages:{title:msg,date:today}}}).then(response=>{
        res.json('Message added!')
    })
    .catch(e=>{
        res.status(400).json('Error: ' + e)
    })
})

module.exports = router;