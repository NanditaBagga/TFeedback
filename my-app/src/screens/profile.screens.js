import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../services/user.context'
import { Link } from 'react-router-dom'
import "../css/profile.css"
import axios from 'axios'
import { CheckMobile, CheckPassword } from '../services/updateCheck.services'

export const ProfileScreen = () => {

    const { user,setUser }=useContext(UserContext)
    const [ password,setPassword ]=useState("")
    const [ mobile,setMobile ]=useState("")
    const [updatePass,setUpdatePass]=useState(false)
    const [updateMobile,setUpdateMobile]=useState(false)

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

    if(!user)
    {
        return(
            <div>
                <h5 style={{textAlign:"center"}}>Loading...</h5>
            </div>
        )
    }

    const handleUpdate = (key) => {
        if(key==="password")
        {
            if(password===user.password||password==="")
            {
                setUpdatePass(false)
                return
            } 
            const res=CheckPassword(password)
            if(res!==true)
            {
                alert(res)
                return
            }
            let data={
                id:user._id,
                key:key,
                value:password
            }
            axios.post('http://localhost:5000/home/profile/update',data)
            .then(response => {
                setUser({...user,"password":password})
                setPassword("")
                setUpdatePass(false)
            })
            .catch(error => {
                console.log(error)
                alert("Some error occured")
            })
        }
        else if(key==="mobile")
        {
            if(mobile===user.mobile||mobile===""){
                setUpdateMobile(false)
                return
            } 
            const res=CheckMobile(mobile)
            if(res!==true)
            {
                alert(res)
                return
            }
            let data={
                id:user._id,
                key:key,
                value:mobile
            }
            console.log("Geye")
            axios.post('http://localhost:5000/home/profile/update',data)
            .then(response => {
                setUser({...user,"mobile":mobile})
                setMobile("")
                setUpdateMobile(false)
            })
            .catch(error => {
                console.log(error)
                alert("Some error occured")
            })
        }
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
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous"></link>
        </body>
    
    <div className="App">
        <nav class="navbar navbar-expand-lg sticky-top"  style={{backgroundColor: "#e3f2fd"}}>
            <div class="my-container-fluid">
            <a href="/home" className="navbar-brand">TFeedback</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            </div>
            <div style={{display:'flex',flexDirection:"column", marginLeft:"90%"}}>
                <button type='button' onClick={handleDropdown} style={{backgroundColor:"#e3f2fd", border:"none"}} >
                    <i class="material-icons icon-styling pe-2">account_circle</i>
                </button>
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

         <h2 style={{textAlign:"center",marginTop:"2%",marginBottom:"3%"}}>My Profile</h2>
         <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
        <div className='my-container'>
            <div style={{display:"flex",flexDirection:"row"}}>
                <div className='col1'>
                    <h4 className='my-text'>Name</h4>
                </div>
              <div className='col1'>
                    <h4 className='my-text'>{user.name}</h4>
                </div>
                <div className='col2'>
                    <h5 style={{cursor:"not-allowed"}} class="btn btn-secondary">Change</h5>
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"row"}}>
                 <div className='col1'>
                    <h4 className='my-text'>E Mail</h4>
                </div>
                <div className='col1'>
                    <h4 className='my-text'>{user.email}</h4>
                </div>
                <div className='col2'>
                    <h5 style={{cursor:"not-allowed"}} class="btn btn-secondary">Change</h5>
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"row"}}>
                <div className='col1'>
                    <h4 className='my-text'>Mobile Number</h4>
                </div>
                {updateMobile?
                (
                    <>
                        <div className='col1'>
                            <input onChange={(text)=>setMobile(text.target.value)} type={"text"} value={mobile} className='my-text' />
                        </div>
                        <div className='col2'>
                        <h5 class="btn btn-secondary" onClick={()=>handleUpdate("mobile")}>Done</h5>
                        </div>
                    </>
                ):
                (
                    <>
                        <div className='col1'>
                            <h4 className='my-text'>{user.mobile}</h4>
                        </div>
                        <div className='col2'>
                            <h5 class="btn btn-secondary" onClick={()=>setUpdateMobile(true)}>Change</h5>
                        </div>
                    </>
                )
                }
                
            </div>
            <div style={{display:"flex",flexDirection:"row"}}>
                <div className='col1'>
                    <h4 className='my-text'>Password</h4>
                </div>
                {updatePass?
                (
                    <>
                        <div className='col1'>
                            <input onChange={(text)=>setPassword(text.target.value)} type={"text"} value={password} className='my-text' />
                        </div>
                        <div className='col2'>
                            <h5 onClick={()=>handleUpdate("password")} class="btn btn-secondary">Done</h5>
                        </div>  
                    </>
                ):
                (
                    <>
                        <div className='col1'>
                            <h4 className='my-text'>*****{user.password.substring(5)}</h4>
                        </div>
                        <div className='col2'>
                            <h5 onClick={()=>setUpdatePass(true)} class="btn btn-secondary">Change</h5>
                        </div>  
                    </>
                )

                }
                
            </div>
            <div style={{display:"flex",flexDirection:"row"}}>
            <div className='col1'>
                    <h4 className='my-text'>Type</h4>
                </div>
                <div className='col1'>
                    <h4 className='my-text'>{user.type}</h4>
                </div>
                <div className='col2'>
                    <h5 style={{cursor:"not-allowed"}} class="btn btn-secondary">Change</h5>
                </div>
        </div>
        </div>
    </div>
    </div>

        </>
    )
}