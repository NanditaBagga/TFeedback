/* eslint-disable eqeqeq */
import React from 'react'
import axios from "axios"

export const MessageCard = ({ msg,name,courseID, setAllMessages }) => {

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