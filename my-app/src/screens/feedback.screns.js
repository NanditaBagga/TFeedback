import React,{ useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import "../css/feedback.css"
import axios from 'axios'
import { MessageCard } from '../components/messageCard.component'

export const Feedback = () => {

  const [title,setTitle]=useState(null)
  const [message,setMessage]=useState("")
  const [allMessages,setAllMessages]=useState([])

  const { id } = useParams()
  useEffect(()=>{
    axios.get(`http://localhost:5000/home/course/${id}`).then(res=>{
      setTitle(res.data.title)
      setAllMessages(res.data.messages)
    })
    .catch(e=>{
      console.log(e)
    });
  },[id])

  const handleMsgSubmit = (event) => {
    event.preventDefault()
    if(message==="")
    {
      alert("Type a message first")
      return
    }
    let data={
      title:message
    }
    axios.post(`http://localhost:5000/home/course/${id}/send`, data).then(response=>{
      console.log(response.data)
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      const time=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
      today = mm + '/' + dd + '/' + yyyy + " "+ time;
      setAllMessages([...allMessages,{title:message,date:today}])
      setMessage("")
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
                </ul>
                <i class="material-icons icon-styling">account_circle</i>
              </div>
            </div>   
          </nav>

          <div class = "container mt-5" id = "messages">
          {allMessages.length?
          (
              allMessages.map(item=>{
                return(
                  <MessageCard msg={item}/>
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