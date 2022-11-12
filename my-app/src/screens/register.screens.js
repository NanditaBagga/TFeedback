import React, {useState,useContext} from 'react'
import { RegisterCheck } from '../services/registerCheck.services'
import "../css/register.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { UserContext } from '../services/user.context'

export const RegisterScreen = () => {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [type,setType]=useState("Student")
    const [mobile,setMobile]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const { user,setUser } = useContext(UserContext)
    const [ redirect,setRedirect]=useState(false)

    const handleSubmit =async (event) => {
        var flag=0
        event.preventDefault()
        const result=RegisterCheck(name,email,password,type,mobile)
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
            type:type,
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
            setUser(response.data)
            setRedirect(true)
            return
        }).catch(e=>{
            console.log(e)
            setIsLoading(false)
            alert("Some error occured")
        })
    }

    const handleReset = () => {
        setName("")
        setPassword("")
        setType("")
        setMobile("")
        setEmail("")
    }

    return(
        <>
            <div className='login-container'>
                <div className='container'>
                    <h3 className='title'>TFeedback</h3>
                    <h3 className='title'>Register</h3>
                    <form onSubmit={handleSubmit} onReset={handleReset} >
                    <div style={{marginLeft:"20%", marginRight:"20%"}}>
                        <h4 className='form-text'>Name</h4>
                        <input value={name} onChange={(text)=>setName(text.target.value)} className='form-input' type={"text"} placeholder='Fill user name' />
                        <h4 className='form-text'>E-Mail</h4>
                        <input value={email} onChange={(text)=>setEmail(text.target.value)} className='form-input' type={"text"} placeholder='Fill e mail' />
                        <h4 className='form-text'>Mobile Number</h4>
                        <input value={mobile} onChange={(text)=>setMobile(text.target.value)} className='form-input' type={"text"} placeholder='Fill mobile number' />
                        <h4 className='form-text'>Password</h4>
                        <input value={password} onChange={(text)=>setPassword(text.target.value)} className='form-input' type={"password"} placeholder='Fill password' />
                        <h4 for="cars" className='form-text'>Type</h4>
                        <select value={type} name="cars" id="cars" className='form-input' onChange={(text)=>setType(text.target.value)}>
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Admin">Admin</option>
                        </select>
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
                </div>
            </div>
        </>
    )
}