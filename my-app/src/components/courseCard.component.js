import React from 'react'
import img from "../assets/svg/pattern1.svg"
import { Link } from 'react-router-dom'

export const Card = ({ item }) =>{
    return(
        <div class="card mt-2" style={{width: "50%"}} key={item.title}>
            <img src={img} class="card-img-top" alt={item.title} />
            <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <Link to={`/home/course/${item._id}`}>
                    <h5 class="btn btn-secondary">Open</h5>
                </Link>
            </div>
        </div>
    )
}
