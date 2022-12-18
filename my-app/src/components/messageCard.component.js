/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../css/feedback.css"

export const MessageCard = ({ courseTitle, msg,name,courseID, setAllMessages }) => {
    const [sentiment, setSentiment] = useState(null);
    

    useEffect(() => {
        let body = [{ comment: msg.title }]
        const URL = "http://127.0.0.1:12345"
        fetch(URL,{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        
            },
            body:JSON.stringify(body)                
        })
        .then(response => response.json())
        .then(responseJSON => {
            const { prediction } = responseJSON;
            console.log(responseJSON);

            if (prediction == "['Positive']"){
                setSentiment('Positive');
            } else {
                setSentiment('Negative');
            }

            axios.post(`http://localhost:5000/home/course/${courseTitle}/srs/entry`, responseJSON)
            .then(res => {
                console.log(res);
            })
        })
        .catch(e => console.log(e));        
    }, [])

    if(!name)
    {
        return(
            <div>
                <h5 style={{textAlign:"center"}}>Loading...</h5>
            </div>
        )
    }

    const handleVote = () => {
        /*if(msg.upvotesBy==undefined)
        {
            axios.post(`http://localhost:5000/home/course/${courseID}/${msg._id}/${name}/upvote`).then(res=>{
                setVote(vote+1)
                window.location.reload()
            }).catch(e=>{
                alert("Some error occured")
            })
            return
        }*/
        var flag=0
        
        for(let i=0;i<msg.upvotesBy.length;i++)
        {
            if(msg.upvotesBy[i].name==name)
            {
                axios.post(`http://localhost:5000/home/course/${courseID}/${msg._id}/${name}/downvote`).then(res=>{
                    axios.get(`http://localhost:5000/home/course/${courseID}`).then(res=>{
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
                    return
                }).catch(e=>{
                    alert("Some error occured")
                    return
                })
                return
            }
        }
        
        if(flag===0)
        {
            axios.post(`http://localhost:5000/home/course/${courseID}/${msg._id}/${name}/upvote`).then(res=>{
                axios.get(`http://localhost:5000/home/course/${courseID}`).then(res=>{
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
            }).catch(e=>{
                alert("Some error occured")
            })
        }
        return

    }

    return(
        <div id = "message-reply">
        <div className={msg.userType=="Student"?"message-card":"message-card-special"}>
          <div class = "card-header d-flex flex-row justify-content-between">
              <div id = "sender-name">{msg.from}</div>              
              <div>{msg.date}</div>
              <div className = {sentiment == "Positive"?"LabelPos":"LabelNeg"}>{sentiment}</div>
              <div class = "upvote d-flex flex-row justify-content-between">
                  <div>{msg.upvotes}</div>
                  {msg.userType==="Student"?
                  (
                    <button type={"button"} style={{border:"none",backgroundColor:"white"}} onClick={handleVote}>
                        <div>
                            <i class="material-icons icon-styling">change_history</i>
                        </div>    
                    </button> 
                  ):
                  (
                    <button type={"button"} style={{border:"none",backgroundColor:"rgb(213, 199, 115)"}} onClick={handleVote}>
                        <div>
                            <i class="material-icons icon-styling">change_history</i>
                        </div>    
                    </button> 
                  )
                  }              
              </div>
          </div>
          <div className="card-body" >
            <h3 className='card-msg'>{msg.title}</h3>
          </div>
        </div>
    </div>
    )
}