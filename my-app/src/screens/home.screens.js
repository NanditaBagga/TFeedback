import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import "../css/home.css";
import axios from 'axios';
import { Card } from "../components/courseCard.component"
import { UserContext } from '../services/user.context';

var coursesArray=[]
//var coursesArrayLength=null

export const Home = () => {

  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState(null)
  const [courses,setCourses]=useState([])
  const [addCourse,setAddCourse]=useState(false)
  const [courseName,setCourseName]=useState(null)
  const { user,setUser } = useContext(UserContext)
  const [faculty,setFaculty]=useState([])
  //const [coursesArray,setCoursesArray]=useState([])
  const [coursesArrayLength,setCoursesArrayLength]=useState(null)

    useEffect(()=>{
      async function getUser()
      {
        const status=localStorage.getItem("loginStatus")
        if(status)
        {
          setUser(JSON.parse(localStorage.getItem("login")))
        }
      }
    getUser()
  },[])

  useEffect(()=>{
    setIsLoading(true)
    axios.get('http://localhost:5000/home/')
      .then(response => {
        setCourses(response.data)
        coursesArray=[]
        for(let i=0;i<response.data.length;i++)
        {
          coursesArray.push({title:response.data[i].title,length:response.data[i].messages.length})
        }
        setCoursesArrayLength(0)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setError("Some error occured")
        setIsLoading(false)
      })
  },[])

  useEffect(()=>{
    axios.get(`http://localhost:5000/home/view/Faculty`).then(res=>{
          setFaculty(res.data)
        })
      .catch(e=>{
          console.log(e)
          alert("Problem getting data")
      });
  },[])

  const handleCourseSubmit = (event) => {
    event.preventDefault()
    if(!courseName)
    {
      alert("Fill name of course first")
      return
    }
    let courseRef={
      title: courseName,
      photo:"Some photo",
      createdAt:new Date()
    }
    axios.post('http://localhost:5000/home/add/course', courseRef).then(response=>{
      setCourseName(null)
      setAddCourse(false)
      setIsLoading(true)
      axios.get('http://localhost:5000/home/')
        .then(response => {
          setCourses(response.data)
          setIsLoading(false)
        })
        .catch(error => {
          console.log(error)
          setError("Some error occured")
          setIsLoading(false)
        })
    })
    .catch(e=>{
      setCourseName(null)
      setAddCourse(false)
      console.log(e)
    })
    
  }

  const handleDropdown = () => {
    let x=document.getElementById("header-dropdown-options")
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  const handleLogOut = () => {
    setUser(null)
    localStorage.setItem("loginStatus",false)
    localStorage.setItem("loginStatus",null)
  }

  const handleNext = () => {
    if(coursesArrayLength==courses.length-1)
    {
      setCoursesArrayLength(0)
    }
    else{
      setCoursesArrayLength(coursesArrayLength+1)
    }
  }
  if(!user)
  {
    return(
      <div>
        <h5 style={{textAlign:"center"}}>Loading...</h5>
      </div>
    )
  }
  if(!coursesArray.length)
  {
    return(
      <div>
        <h5 style={{textAlign:"center"}}>Loading...</h5>
      </div>
    )
  }
  if(coursesArrayLength===null)
  {
    return(
      <div>
        <h5 style={{textAlign:"center"}}>Loading...</h5>
      </div>
    )
  }
  
  return (
    <>
    <body>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous"></link>
    </body>
    
    <div className="App">
      <nav class="navbar navbar-expand-lg sticky-top"  style={{backgroundColor: "#e3f2fd"}}>
        <div class="container-fluid">
          <h3 className="navbar-brand">TFeedback</h3>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div style={{display:'flex',flexDirection:"column"}}>
        <button type='button' onClick={handleDropdown} style={{backgroundColor:"#e3f2fd", border:"none"}} ><i class="material-icons icon-styling pe-2">account_circle</i></button>
        <div id="header-dropdown-options" style={{display:"none"}}>
            <h5 className='dropdown-text'>{user.name}</h5>
            <Link to={`/home/profile/${user._id}`}>
              <button className='dropdown-btn' type='button'>My Profile</button>
            </Link>
            <Link to='/'>
              <button className='dropdown-btn' onClick={handleLogOut} type='button'>Log Out</button>
            </Link>
          </div>
          </div>
        
      </nav>

    <div class = "container mt-4">
        <div class="row">
            <div class="col-md-6">
              <div class="card bg-warning">
                <div class="card-body d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title text-white">Total Number of Feedback Topics</h5>
                    </div>
                    <div>
                        <p class="card-text ps-4 text-white">{courses.length}</p>   
                    </div>         
                </div>
              </div>
            </div>
            <div class="col-md-6">
                <div class="card bg-secondary" >
                  <div class="card-body d-flex flex-row justify-content-between align-items-center" >
                    <div>
                        <h5 class="card-title text-white">Number of feedbacks recieved per topic</h5>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                      <p style={{fontSize:"large"}} class="card-text ps-4 text-white">{coursesArray[coursesArrayLength].title}</p>
                      <p style={{fontSize:"large"}} class="card-text ps-4 text-white">{coursesArray[coursesArrayLength].length}</p>
                       <button onClick={handleNext} style={{border:"none",backgroundColor:"#6C757D"}}>
                          <i style={{transform:"rotate(180deg)",color:"white",fontSize:"large"}} class="material-icons icon-styling pe-2">arrow_back_ios</i>
                          </button>
                    </div>                    
                  </div>
                </div>
            </div>
        </div>

        <hr />

        <div class = "d-flex flex-row justify-content-between">
            <div>
                <h3>Feedback Section Wise</h3>
            </div>       
        </div>
        
        <div className ="my-card-container">
          {isLoading?
          (
            <h3 style={{textAlign:"center"}}>Loading...</h3>
          ):
          (
            error?
              (
                <h4 style={{textAlign:"center"}}>{error}</h4>
              ):
              (
                courses.map((item)=>{
                return(
                  <Card item={item} type={user.type} faculty={faculty} setCourses={setCourses} />
                )
                }) 
              )
          )
          }      
        </div>

        <hr />
        
        {user.type==="Student"?
        (
          <></>
        ):
        (
          <>
          <h3 class = "mt-4">Manage StakeHolders</h3>
          {addCourse?
          (
            <>
              <div className = "d-flex flex-row justify-content-between" style={{display:"flex",alignContent:"center"}}>
                  <h3 style={{textAlign:"center"}}>Add new Course</h3>           
              </div>
              <form onSubmit={handleCourseSubmit}>
                <div class="mb-3">
                  <label for="inputName" class="form-label">Name</label>
                  <input style={{width:"50%"}} onChange={(text)=>setCourseName(text.target.value)} type="text" class="form-control" id="inputName" aria-describedby="inputName" />
                </div>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#facultyModal" onClick={()=>setAddCourse(false)}>
                    Back
                </button>
                <input style={{marginLeft:"40%"}} className="btn btn-secondary" type={"submit"} />
              </form>
            </>
          ):
          (
                <div className="d-flex flex-row justify-content-between align-items-baseline m-4">
                    <div class="card mt-2" style={{width: "24rem"}}>
                        <h5 class="card-header">Students</h5>
                        <div class="card-body d-flex flex-row justify-content-around align-items-center">                  
                          <Link to='/home/view/Student'>
                            <btn className="btn btn-secondary">View</btn>
                          </Link>
                          <Link to='/home/add/Student'>
                            <btn className="btn btn-secondary">Add</btn>
                          </Link>
                        </div>
                    </div>
                    <div class="card mt-2" style={{width: "24rem"}}>
                        <h5 class="card-header">Faculty</h5>
                        <div class="card-body d-flex flex-row justify-content-around align-items-center">  
                        <Link to='/home/view/Faculty'>              
                            <btn className="btn btn-secondary">View</btn>
                        </Link>
                        <Link to='/home/add/Faculty'>
                            <btn className="btn btn-secondary">Add</btn>
                          </Link>
                        </div>
                    </div>
                    <div class="card mt-2" style={{width: "24rem"}}>
                        <h5 class="card-header">Courses</h5>
                        <div class="card-body d-flex flex-row justify-content-around align-items-center">  
                        <Link to='/home/view/Course'>                
                            <btn class="btn btn-secondary">View</btn>
                        </Link>
                            <btn class="btn btn-secondary" onClick={()=>setAddCourse(true)}>Add</btn>
                        </div>
                    </div>            
                </div>
          )}
              
              
            </>
        )
        }
        </div>
        </div>
    </>
  );
}
