import React,  { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { UserContext } from '../services/user.context'
import axios from 'axios'
import "../css/srs.css"
import { FeedbackCheck } from '../services/feedbackCheck.services'

export const SRS = () => {

    const { title } = useParams()
    const { user, setUser }=useContext(UserContext)
    const [q1,setQ1]=useState("")
    const [q2,setQ2]=useState("")
    const [q3,setQ3]=useState("")
    const [q4,setQ4]=useState("")
    const [q5,setQ5]=useState("")
    const [comments,setComments]=useState("")
    const [isLoading,setIsLoading]=useState(false)

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

      const handleReset = (event) => {
        event.preventDefault()
        setQ1("")
        setQ2("")
        setQ3("")
        setQ4("")
        setQ5("")
        setComments("")
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        setIsLoading(true)
        const res=FeedbackCheck(q1,q2,q3,q4,q5,comments)
        if(res!==true)
        {
            alert(res)
            setIsLoading(false)
            return
        }
        const data={
            q1:q1,
            q2:q2,
            q3:q3,
            q4:q4,
            q5:q5,
            comment:comments,
            name:user.name
        }
        await axios.post(`http://localhost:5000/home/course/${title}/srs`,data).then(res=>{
            alert("Feedback sent")
            setQ1("")
            setQ2("")
            setQ3("")
            setQ4("")
            setQ5("")
            setComments("")
            setIsLoading(false)
        }).catch(e=>{
            setIsLoading(false)
            alert("Some error occured")
        })
        setIsLoading(false)
    }

    return(
        <>
            <body>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous"></link>
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

                <h2 style={{textAlign:"center",marginTop:"2%"}}>Fill SRS for {title}</h2>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div className='SRS-form-container'>
                        <h4 className='Text'>Question 1</h4>
                        <input onChange={(text)=>setQ1(text.target.value)} value={q1} className='input' type={"text"} placeholder='Fill question 1' />
                        <h4 className='Text'>Question 2</h4>
                        <input onChange={(text)=>setQ2(text.target.value)} value={q2} className='input' type={"text"} placeholder='Fill question 2' />
                        <h4 className='Text'>Question 3</h4>
                        <input onChange={(text)=>setQ3(text.target.value)} value={q3} className='input' type={"text"} placeholder='Fill question 3' />
                        <h4 className='Text'>Question 4</h4>
                        <input onChange={(text)=>setQ4(text.target.value)} value={q4} className='input' type={"text"} placeholder='Fill question 4' />
                        <h4 className='Text'>Question 5</h4>
                        <input onChange={(text)=>setQ5(text.target.value)} value={q5} className='input' type={"text"} placeholder='Fill question 5' />
                        <h4 className='Text'>Any comments?</h4>
                        <textarea onChange={(text)=>setComments(text.target.value)} value={comments} type={"text"} placeholder='Your Comments' className='input' rows="4" cols="50" />
                        <br />
                        {isLoading?
                        (
                            <h5 style={{textAlign:"center"}}>Request Processing...</h5>
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