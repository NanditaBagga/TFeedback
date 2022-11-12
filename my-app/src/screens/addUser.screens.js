import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import "../css/addUser.css"
import { RegisterCheck } from '../services/registerCheck.services'
import axios from 'axios'

export const AddUser = () => {
    const { status }=useParams()

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [mobile,setMobile]=useState("")
    const [isLoading,setIsLoading]=useState(false)

    const handleReset = (event) => {
        event.preventDefault()
        setName("")
        setPassword("")
        setMobile("")
        setEmail("")
    }

    const handleSubmit =async (event) => {
        var flag=0
        event.preventDefault()
        const result=RegisterCheck(name,email,password,status,mobile)
        if(result!==true)
        {
            alert(result)
            return
        }
        setIsLoading(true)
        let data={
            name:name,
            password:password,
            email:email,
            mobile:mobile,
            type:status,
            key:""
        }
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
        axios.post("http://localhost:5000/register",data).then(response=>{
            setIsLoading(false)
            alert("User added")
            setName("")
            setPassword("")
            setMobile("")
            setEmail("")
            return
        }).catch(e=>{
            console.log(e)
            setIsLoading(false)
            alert("Some error occured")
        })
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
                <h3 className="navbar-brand">TFeedback</h3>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                </div>
                <i class="material-icons icon-styling pe-2">account_circle</i>
                </nav>
            </div>
            <div className='container'>
            <h2 style={{textAlign:"center",marginTop:"2%",marginBottom:"3%"}}>Add {status}</h2>
            <form onSubmit={handleSubmit} onReset={handleReset} >
                    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",marginLeft:"35%", marginRight:"35%",overflow:"auto"}}>
                        <h4 className='text'>Name</h4>
                        <input value={name} onChange={(text)=>setName(text.target.value)} className='input' type={"text"} placeholder='Fill user name' />
                        <h4 className='text'>E-Mail</h4>
                        <input value={email} onChange={(text)=>setEmail(text.target.value)} className='input' type={"text"} placeholder='Fill e mail' />
                        <h4 className='text'>Mobile Number</h4>
                        <input value={mobile} onChange={(text)=>setMobile(text.target.value)} className='input' type={"text"} placeholder='Fill mobile number' />
                        <h4 className='text'>Password</h4>
                        <input value={password} onChange={(text)=>setPassword(text.target.value)} className='input' type={"password"} placeholder='Fill password' />
                        <h4 className='text'>Type {status}</h4>
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