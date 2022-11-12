import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "../css/viewuser.css";
import { Link } from 'react-router-dom';

export const ViewScreen = () => {

    const { status }=useParams()
    const [users,setUsers]=useState([])
    const [ isLoading,setIsLoading ]=useState(false)

    useEffect(()=>{
        setIsLoading(true)
        if(status!=="Course")
        {
            axios.get(`http://localhost:5000/home/view/${status}`).then(res=>{
                setUsers(res.data)
                setIsLoading(false)
            })
            .catch(e=>{
                console.log(e)
                alert("Problem getting data")
                setIsLoading(false)
            });
        }
        else if(status==="Course"){
            axios.get('http://localhost:5000/home/')
                .then(response => {
                    setUsers(response.data)
                    setIsLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    alert("Some error occured")
                    setIsLoading(false)
                })
        }
    },[status])

    const render = () => {
        return(
            <>
                <div className='row-container'>
                    <div className='col1'>
                        <h3 className='view-text-head'>Name</h3>
                    </div>    
                    <div className='col2'>
                        <h3 className='view-text-head'>E Mail</h3>
                    </div>  
                    <div className='col3'>
                        <h3 className='view-text-head'>Mobile Number</h3>
                    </div>  
                </div>
                {isLoading?
                (
                    <div>
                        <h5 style={{textAlign:"center",marginTop:"5%"}}>Loading...</h5>
                    </div>
                ):
                (
                    users.map((item)=>{
                        return(
                            <div className='row-container'>
                                <div className='col1'>
                                    <h3 className='view-text'>{item.name}</h3>
                                </div>    
                                <div className='col2'>
                                    <h3 className='view-text'>{item.email}</h3>
                                </div>  
                                <div className='col3'>
                                    <h3 className='view-text'>{item.mobile}</h3>
                                </div>  
                            </div>
                        )
                    })
                )}
            </>
        )
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
                

                <h2 style={{textAlign:"center",marginTop:"2%",marginBottom:"3%"}}>List of {status}</h2>
                {status!=="Course"?
                (
                    render()
                ):
                (
                    isLoading?
                    (
                        <div>
                            <h5 style={{textAlign:"center",marginTop:"5%"}}>Loading...</h5>
                        </div>
                    ):
                    (

                        users.map((item)=>{
                        return(
                            <div className='row-container'>
                                <div className='col5'>
                                    <h3 className='view-text'>{item.title}</h3>
                                </div>    
                                <div className='col6'>
                                <Link to={`/home/course/${item._id}`}>
                                    <h5 class="btn btn-secondary">Open</h5>
                                </Link>
                                </div>
                            </div>
                        )
                        })
                    )
                )
                }
            </div>
        </>
    )
}