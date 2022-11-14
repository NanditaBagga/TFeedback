import React, {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { UserContext } from '../services/user.context'
import "../css/viewDetails.css"
import img from "../assets/images/background.jpg"
import userImg from "../assets/images/profile-1.jpg"

export const UserDetails = () => {

    const { user,setUser }=useContext(UserContext)
    const { type,id }=useParams()
    const [userDetail,setUserDetail]=useState(null)

    useEffect(()=>{
        async function getUser()
        {
          const status=localStorage.getItem("loginStatus")
          console.log(status)
          if(status)
          {
            setUser(JSON.parse(localStorage.getItem("login")))
          }
        }
      getUser()
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:5000/home/view/${type}/${id}`).then(res=>{
            console.log(res.data[0])
            setUserDetail(res.data[0])
        })
        .catch(e=>{
            console.log(e)
            alert("Problem getting data")
        });
    },[type,id])

    if(!user)
    {
        return(
            <div>
                <h5 style={{textAlign:"center"}}>Loading...</h5>
            </div>
        )
    }
    if(!userDetail)
    {
        return(
            <div>
                <h5 style={{textAlign:"center"}}>Loading...</h5>
            </div>
        )
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

    return(
        <>
            <body>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
            </body>
    
            <div className="App">
                <nav class="navbar navbar-expand-lg sticky-top"  style={{backgroundColor: "#e3f2fd"}}>
                    <div class="container-fluid">
                    <a href='/home' className="navbar-brand">TFeedback</a>
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

        <div class = "container">
            <img src={img} id = "background-img" alt="Missing source" />
        <div>
            <img src={userDetail.image} id = "profile-pic" alt={userDetail.name}/>
        </div>
        <div id = "faculty-info">
            <div id = "faculty-name">
                <h4>{userDetail.name}</h4>
            </div>
            <div id = "faculty-email">
                <a href={`mailto:${userDetail.email}`} style={{textDecoration:"none",color:"black"}}>
                    <i class="material-icons icon-styling pe-2">mail</i>
                </a>
            </div>  
            
                <div id = "faculty-phone">
                <button type={"button"} onClick={()=>alert(userDetail.mobile)} style={{border:"none",backgroundColor:"white"}} >
                    <i class="material-icons icon-styling pe-2">call</i>
                    </button>
                </div>
            
        </div>
        <div class = "container-fluid faculty-details">
            
            {userDetail.type==="Student"?
            (
                <>
                <h5>Semester</h5>
                <p>{userDetail.designation} sem</p>
                </>
            ):
            (
                <>
                <h5>Designation</h5>
                <p>{userDetail.designation}</p>
                </>
            )
            }
            <h5>Specialization</h5>
            <p>{userDetail.specialzation}</p>
            <h5>Bio</h5>
            <p>{userDetail.bio}</p>
        </div>
        
    </div>
            </div>
        </>
    )
}