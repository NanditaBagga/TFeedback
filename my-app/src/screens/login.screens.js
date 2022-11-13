import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../css/login.css"
import axios from 'axios'

export const LoginScreen = () => {

    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [type,setType]=useState("Student")
    const [key,setKey]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const [ redirect,setRedirect]=useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        if(name===""||password===""||type==="")
        {
            alert("Fill information first")
            return
        }
        if(type!=="Student"&&key==="")
        {
            alert("Security key not filled")
            return
        }
        axios.get(`http://localhost:5000/login?name=${name}&password=${password}&type=${type}&key=${key}`).then(response=>{
            if(response.data==="No")
            {
                alert("Wrong credentials")
                setIsLoading(false)
                return
            }
            else{
                localStorage.setItem("loginStatus",true)
                localStorage.setItem("login",JSON.stringify(response.data))
                setRedirect(true)
                setIsLoading(false)
                return
            }
        }).catch(e=>{
            console.log(e)
            setIsLoading(false)
        })
    }

    const handleReset = () => {
        setName("")
        setPassword("")
        setType("")
        setKey("")
    }

    return(
        <>
        <div className='login-container'>
            <div className='my-container'>
                <h3 className='title'>TFeedback</h3>
                <h3 className='title'>Login</h3>
                <form onSubmit={handleSubmit} onReset={handleReset} >
                    <div style={{marginLeft:"20%", marginRight:"20%"}}>
                        <h4 className='form-text'>Name</h4>
                        <input value={name} onChange={(text)=>setName(text.target.value)} className='form-input' type={"text"} placeholder='Fill user name' />
                        <h4 className='form-text'>Password</h4>
                        <input value={password} onChange={(text)=>setPassword(text.target.value)} className='form-input' type={"password"} placeholder='Fill password' />
                        <h4 for="cars" className='form-text'>Type</h4>
                        <select value={type} name="cars" id="cars" className='form-input' onChange={(text)=>setType(text.target.value)}>
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Admin">Admin</option>
                        </select>
                        {type==="Faculty"||type==="Admin"?
                        (
                            <>
                                <h4 className='form-text'>Security Key</h4>
                                <input value={key} onChange={(text)=>setKey(text.target.value)} className='form-input' type={"password"} placeholder='Fill secuity key' />
                            </>
                        ):
                        (<></>)
                        }
                        <br />
                        {isLoading?
                        (
                            <h5 style={{textAlign:"center"}}>Loading...</h5>
                        ):
                        (
                            redirect?
                            (
                                <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
                                    <h4 style={{textAlign:"center"}}>Success!!</h4>
                                    <Link to='/home'>
                                        <button type={"button"} className='form-btn'>Ok</button>
                                    </Link>
                                </div>
                            ):
                            (
                                <>
                                    <input type={"reset"} className='form-btn' />
                                    <input type={"submit"} className='form-btn' />
                                </>
                            )
                        )
                        }
                    </div>
                </form>
                <div style={{marginTop:"10%"}}>
                    <h5 className='register'>New on TFeedback?</h5>
                    <Link to={'/register'}>
                        <h5 className='register'>Register here</h5>
                    </Link>
                </div>
            </div>        
        </div>
      </>
    )
}