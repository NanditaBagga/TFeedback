import React,{ useEffect, useState, useContext, useRef} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import "../css/feedback.css"
import axios from 'axios'
import { MessageCard } from '../components/messageCard.component'
import { UserContext } from '../services/user.context'

export const Feedback = () => {

  const [title,setTitle]=useState(null)
  const [live,setLive]=useState(null)
  const [message,setMessage]=useState("")
  const [allMessages,setAllMessages]=useState([])
  const positive=useRef(0)
  const negative=useRef(0)
  const { user, setUser }=useContext(UserContext)

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

  const { id } = useParams()
  useEffect(()=>{
    axios.get(`http://localhost:5000/home/course/${id}`).then(res=>{
      if(res.data.feedbacks.length!==0)
      {
        let pos=0
        for(let i=0;i<res.data.feedbacks.length;i++)
        {
          if(res.data.feedbacks[i]==="['Positive']")
          {
            pos=pos+1
          }
        }
        positive.current=pos/res.data.feedbacks.length
        negative.current=(res.data.feedbacks.length-pos)/res.data.feedbacks.length
      }
      setTitle(res.data.title)
      setLive(res.data.isLive)
      setAllMessages(res.data.messages)
        var tempArr=res.data.messages
        function compare(a,b){
            if(a.upvotes>b.upvotes){
              return -1;
            }
            if(a.cost<b.cost){
              return 1;
            }
            return 0;
          }  
        tempArr.sort(compare);
        setAllMessages(tempArr)
    })
    .catch(e=>{
      console.log(e)
    });
  },[id])

  if(!user)
  {
    return(
      <div>
        <h5 style={{textAlign:"center"}}>Loading...</h5>
      </div>
    )
  }

  const handleMsgSubmit = (event) => {
    event.preventDefault()
    if(message==="")
    {
      alert("Type a message first")
      return
    }
    let data={
      title:message,
      from:user.name,
      userType:user.type
    }
    axios.post(`http://localhost:5000/home/course/${id}/send`, data).then(response=>{
      window.location.reload()
    }).catch(e=>{
      console.log(e)
      setMessage("")
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

  const handleLive = () => {
    let data=null
    if(live==="true")
    {
      data={
        live:"false"
      }
    }
    else{
      data={
        live:"true"
      }
    }
    axios.post(`http://localhost:5000/home/course/${id}/live`, data).then(response=>{
      window.location.reload()
    }).catch(e=>{
      console.log(e)
      setMessage("")
    })
  }

    return(
        <>
          <body>
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous" />
              <link rel = "stylesheet" type = "text/css" href="decoration.css"></link>
          </body>
          <nav class="navbar navbar-expand-lg sticky-top" style={{backgroundColor: "#e3f2fd"}}>
            <div class="container-fluid">
              <a className="navbar-brand" href="/home">TFeedback</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <h5 style={{fontWeight:"normal", marginTop:"5%"}} className="navbar-brand" aria-current="page" >{title}</h5>
                  </li>
                  {/* <li>
                  <h5 style={{fontWeight:"normal", fontSize:16, marginTop:"5%"}} className="navbar-brand" aria-current="page" >Postive: {positive.current*100}%</h5>
                  </li>
                  <li>
                  <h5 style={{fontWeight:"normal", fontSize:16, marginTop:"5%"}} className="navbar-brand" aria-current="page" >Negative: {negative.current*100}%</h5>
                  </li> */}
                  {user.type==="Student"?
                  (<></>):
                  (
                    live==="true"?
                    (
                      <h5 onClick={handleLive} style={{cursor:"pointer", fontWeight:"normal", fontSize:16, marginTop:"0.5%",position:"absolute",right:75}} className="navbar-brand" aria-current="page" >Remove from live</h5>
                    ):
                    (
                      
                      <h5 onClick={handleLive} style={{cursor:"pointer", fontWeight:"normal", fontSize:16, marginTop:"0.5%",position:"absolute",right:75}} className="navbar-brand" aria-current="page" >Make it live</h5>
                    )
                  )
                  }
                </ul>
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
              </div>
            </div>   
          </nav>

          <div class = "container mt-5" id = "messages">
          {allMessages.length?
          (
              allMessages.map(item=>{
                return(
                  <MessageCard courseTitle = {title} msg={item} name={user.name} courseID={id} setAllMessages={setAllMessages}/>
                )
              })  
          ):
          (
              <div>
                <h4 style={{textAlign:"center"}}>No messages!!</h4>
                <h4 style={{textAlign:"center"}}>Start a new conversation</h4>
                </div>
          )} 
          </div>

          <form onSubmit={handleMsgSubmit}>
            <div className='msg-container'>
              <input type="text" value={message} onChange={(text)=>setMessage(text.target.value)} class="form-control" id = "user-feedback" placeholder="Type your feedback" aria-label="user-feedback" aria-describedby="button-send" /> 
              <input type={"submit"} class="btn btn-primary" value='Send' /> 
            </div>
          </form>
        </>
    )
}