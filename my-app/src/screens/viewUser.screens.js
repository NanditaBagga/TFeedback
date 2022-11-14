import React, { useEffect,useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "../css/viewuser.css";
import { Link } from 'react-router-dom';
import { UserContext } from '../services/user.context';
import img from "../assets/images/profile-1.jpg"

export const ViewScreen = () => {

    const { status }=useParams()
    const [users,setUsers]=useState([])
    const [ isLoading,setIsLoading ]=useState(false)
    const { user,setUser }=useContext(UserContext)

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
        setIsLoading(true)
        if(status!=="Course")
        {
            axios.get(`http://localhost:5000/home/view/${status}`).then(res=>{
                setUsers(res.data)
                setIsLoading(false)
            })
            .catch(e=>{
                console.log(e)
                alert("Problem getting data")
                setIsLoading(false)
            });
        }
        else if(status==="Course"){
            axios.get('http://localhost:5000/home/')
                .then(response => {
                    setUsers(response.data)
                    setIsLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    alert("Some error occured")
                    setIsLoading(false)
                })
        }
    },[status])

    if(!user)
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

    const render = () => {
        return(
            <>
                {isLoading?
                (
                    <div>
                        <h5 style={{textAlign:"center",marginTop:"5%"}}>Loading...</h5>
                    </div>
                ):
                (
                    users.map((item)=>{
                        const key=item.name
                        return(
                            <Link to={`/home/view/${item.type}/${item._id}`} style={{textDecoration:"none",color:"black"}}>
                                <div key={key} className='user-container'>
                                    
                                        <img src={item.image} style={{height:150,width:150,marginRight:100}} alt={`${item.name}`} />
                                        <div className='details-container'>
                                        <h4 className='view-text'>{item.name}</h4>
                                        {item.type==="Student"?
                                        (
                                            <h4 className='view-text-designation'>{item.designation} sem</h4>
                                        ):
                                        (
                                            <h4 className='view-text-designation'>{item.designation}</h4>
                                        )
                                        }
                                        <h4 className='view-text-special'>{item.specialzation}</h4>
                                        </div>
                                </div>
                            </Link>
                        )
                    })
                )}
            </>
        )
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

                <h2 style={{textAlign:"center",marginTop:"2%",marginBottom:"3%"}}>List of {status}</h2>
                {status!=="Course"?
                (
                    render()
                ):
                (
                    isLoading?
                    (
                        <div>
                            <h5 style={{textAlign:"center",marginTop:"5%"}}>Loading...</h5>
                        </div>
                    ):
                    (

                        users.map((item)=>{
                        return(
                            <div className='row-container'>
                                <div className='col5'>
                                    <h3 className='view-text'>{item.title}</h3>
                                </div>    
                                <div className='col6'>
                                <Link to={`/home/course/${item._id}`}>
                                    <h5 class="btn btn-secondary">Open</h5>
                                </Link>
                                </div>
                            </div>
                        )
                        })
                    )
                )
                }
            </div>
        </>
    )
}