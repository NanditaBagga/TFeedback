import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import "../css/home.css";
import axios from 'axios';
import { Card } from "../components/courseCard.component"
import { UserContext } from '../services/user.context';

export const Home = () => {

  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState(null)
  const [courses,setCourses]=useState([])
  const [addCourse,setAddCourse]=useState(false)
  const [courseName,setCourseName]=useState(null)
  const { user } = useContext(UserContext)

  useEffect(()=>{
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
      createdAt:new Date(),
      messages:{}
    }
    axios.post('http://localhost:5000/home/add/course', courseRef).then(response=>{
      console.log(response.data)
      setCourseName(null)
      setAddCourse(false)
      window.location.reload(false)
    })
    .catch(e=>{
      setCourseName(null)
      setAddCourse(false)
      console.log(e)
    })
    
  }

  return (
    <>
    <body>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
    </body>
    
    <div className="App">
      <nav class="navbar navbar-expand-lg sticky-top"  style={{backgroundColor: "#e3f2fd"}}>
        <div class="container-fluid">
          <h3 className="navbar-brand">TFeedback</h3>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <i class="material-icons icon-styling pe-2">account_circle</i>
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
                <div class="card bg-secondary">
                  <div class="card-body d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title text-white">Number of feedbacks recieved per topic</h5>
                    </div>
                    <div>
                        <p class="card-text ps-4 text-white">12</p>
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
        
        <div className ="card-container">
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
                  <Card item={item} />
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
