import React, { useState } from 'react'
import img from "../assets/svg/pattern1.svg"
import { Link } from 'react-router-dom'
import axios from 'axios'

export const Card = ({ item,type,faculty }) =>{

    const [admin,setAdmin]=useState("")

    if(!type&&!faculty)
    {
        return(
            <div>
                <h5 style={{textAlign:"center"}}>Loading...</h5>
            </div>
        )
    }

    const handleCreateAdmin = (event) => {
        event.preventDefault()
        let data={
            SubAdmin:admin,
            id:item._id
        }
        axios.post('http://localhost:5000/home/course/SubAdmin', data).then(response=>{
        console.log(response.data)
        alert("Done")
        })
        .catch(e=>{
        console.log(e)
        })
    }

    return(
        <div class="card mt-2" style={{width: "50%"}} key={item.title}>
            <img src={img} class="card-img-top" alt={item.title} />
            <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <Link to={`/home/course/${item._id}`}>
                    <h5 class="btn btn-secondary">Open</h5>
                </Link>
                {type==="Admin"?
                (
                    <>
                    <select class="btn btn-secondary" onChange={(text)=>setAdmin(text.target.value)} style={{marginLeft:"10%",marginBottom:10}} >
                        {faculty.map((item)=>{
                            const key=item.name
                            return(
                                <option  key={key} value={item.name}>{item.name}</option>
                            )
                        })}
                    </select>
                    <button onClick={(event)=>handleCreateAdmin(event)} type={"button"} style={{position:"absolute",right:"5%"}} class="btn btn-secondary">Done</button>
                    </>
                ):
                (
                    <></>
                )

                }
                
            </div>
        </div>
    )
}
