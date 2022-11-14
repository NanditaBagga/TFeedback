import React, { useState, useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import "../css/addUser.css"
import { RegisterCheck } from '../services/registerCheck.services'
import axios from 'axios'
import { UserContext } from '../services/user.context'
import { StoreImage } from '../services/firebase.services'

export const AddUser = () => {
    const { status }=useParams()

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [mobile,setMobile]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const { user, setUser }=useContext(UserContext)
    const [bio,setBio]=useState("")
    const [designation,setDesignation]=useState("")
    const [specialization,setSpecialization]=useState("")
    const [image,setImage]=useState(null)

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

    const handleReset = (event) => {
        event.preventDefault()
        setName("")
        setPassword("")
        setMobile("")
        setEmail("")
        setBio("")
        setDesignation("")
        setSpecialization("")
    }

    const handleSubmit =async (event) => {
        var flag=0
        var URL=null
        event.preventDefault()
        const result=RegisterCheck(name,email,password,status,mobile,specialization,bio,designation)
        if(result!==true)
        {
            alert(result)
            return
        }
        if(!image)
        {
            alert("No image uploaded")
            return
        }
        const ext=image.type
        // eslint-disable-next-line eqeqeq
        if(ext!="image/jpeg"&&ext!="image/png"&&ext!="image/jpg")
        {
            alert("Only .jpg, .jpeg, .png images are supported")
            return
        }
        setIsLoading(true)
        await axios.get(`http://localhost:5000/register/${name}`).then(response=>{
            if(response.data!=="Ok")
            {
                alert(response.data)
                flag=1
                return
            }
        }).catch(e=>{
            console.log(e)
            setIsLoading(false)
        })
        if(flag===1)
        {
            setIsLoading(false)
            return
        }
        await StoreImage(image).then(url=>{
            URL=url
        }).catch(e=>{
            console.log(e)
        })
        let data={
            name:name,
            password:password,
            email:email,
            mobile:mobile,
            type:status,
            key:"",
            specialzation:specialization,
            bio:bio,
            designation:designation,
            image:URL
        }
        axios.post("http://localhost:5000/register",data).then(response=>{
            setIsLoading(false)
            alert("User added")
            setName("")
            setPassword("")
            setMobile("")
            setEmail("")
            setBio("")
            setDesignation("")
            setSpecialization("")
            setImage(null)
            return
        }).catch(e=>{
            console.log(e)
            setIsLoading(false)
            alert("Some error occured")
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

    return(
        <>
            <body>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
            </body>
    
            <div className="App">
                <nav class="navbar navbar-expand-lg sticky-top"  style={{backgroundColor: "#e3f2fd"}}>
                <div class="container-fluid">
                <a className="navbar-brand" href="/home">TFeedback</a>
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
            </div>
            <div className='Container'>
            <h2 style={{textAlign:"center",marginTop:"2%",marginBottom:"3%"}}>Add {status}</h2>
            <form onSubmit={handleSubmit} onReset={handleReset} >
                    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",marginLeft:"35%", marginRight:"35%",overflow:"auto"}}>
                        <h4 className='Text'>Name</h4>
                        <input value={name} onChange={(text)=>setName(text.target.value)} className='input' type={"text"} placeholder='Fill user name' />
                        <h4 className='Text'>E-Mail</h4>
                        <input value={email} onChange={(text)=>setEmail(text.target.value)} className='input' type={"text"} placeholder='Fill e mail' />
                        <h4 className='Text'>Mobile Number</h4>
                        <input value={mobile} onChange={(text)=>setMobile(text.target.value)} className='input' type={"text"} placeholder='Fill mobile number' />
                        <h4 className='Text'>Password</h4>
                        <input value={password} onChange={(text)=>setPassword(text.target.value)} className='input' type={"password"} placeholder='Fill password' />
                        <h4 className='Text'>Type {status}</h4>
                        <h4 className='Text'>Specialization</h4>
                        <input value={specialization} onChange={(text)=>setSpecialization(text.target.value)} className='input' type={"text"} placeholder='Fill specialization' />
                        {status==="Student"?
                        (
                            <>
                            <h4 className='Text'>Semester</h4>
                            <input value={designation} onChange={(text)=>setDesignation(text.target.value)} className='input' type={"text"} placeholder='Fill semester' />
                            </>
                        ):
                        (
                            <>
                            <h4 className='Text'>Designation</h4>
                            <input value={designation} onChange={(text)=>setDesignation(text.target.value)} className='input' type={"text"} placeholder='Fill desigantion' />
                            </>
                        )
                        }
                       
                        <h4 className='Text'>Bio</h4>
                        <input value={bio} onChange={(text)=>setBio(text.target.value)} className='input' type={"text"} placeholder='Fill bio' />
                        <h4 className='Text'>Image</h4>
                        <input onChange={(text)=>setImage(text.target.files[0])} className='input' type={"file"} />
                        <br />
                        {isLoading?
                        (
                            <h5 style={{textAlign:"center"}}>Loading...</h5>
                        ):
                        (
                            <div style={{display:"flex"}}>
                                <input type={"reset"} className='my-btn' />
                                <input type={"submit"} className='my-btn' />
                            </div>
                        )
                        }
                    </div>
                </form>
                </div>
        </>
    )
}