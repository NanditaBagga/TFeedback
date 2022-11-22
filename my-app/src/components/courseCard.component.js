import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import img1 from "../assets/svg/1.svg"
import img2 from "../assets/svg/2.svg"
import img3 from "../assets/svg/3.svg"
import img4 from "../assets/svg/4.svg"
import img5 from "../assets/svg/5.svg"

export const Card = ({ item,type,faculty, setCourses }) =>{

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
        axios.get('http://localhost:5000/home/')
        .then(response => {
          setCourses(response.data)
        })
        .catch(error => {
          console.log(error)
          alert("Some error occured")
        })
        })
        .catch(e=>{
        console.log(e)
        })
    }

    const images=[
        img1,img2,img3,img4,img5
    ]
    var imgInd=Math.floor(Math.random()*5)
    const img=images[imgInd]
    return(
        <div class="card mt-2" style={{width: "50%"}} key={item.title}>
            <img src={img4} class="card-img-top" alt={item.title} />
            <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <Link to={`/home/course/${item._id}`}>
                    <h5 class="btn btn-secondary">Open</h5>
                </Link>
                {type==="Admin"?
                (
                    <>
                    <label style={{right:10,position:"absolute"}}>{item.SubAdmin}</label>
                    <br />
                    <select id="faculty-select" class="btn btn-secondary" onChange={(text)=>setAdmin(text.target.value)} style={{marginBottom:10}} >
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
                    <Link to={`/home/course/${item.title}/srs`}>
                    <button type={"button"} style={{position:"absolute",right:"5%"}} class="btn btn-secondary">SRS</button>
                    </Link>
                )
                }
                
            </div>
        </div>
    )
}
