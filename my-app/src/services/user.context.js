import React, {createContext,useState} from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {

    const [user,setUser]=useState(null)

    /*useEffect(()=>{
        if(!isMounted.current)
        {
            console.log("Mounted first time")
            isMounted.current=true
        }
        else{
            console.log("Updated one")
            const status=localStorage.getItem("loginStatus")
            if(status===true)
            {   
                if(user===null)
                {
                    setUser(JSON.parse(localStorage.getItem("login")))
                }
            }
        }
    },[user])*/

    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}