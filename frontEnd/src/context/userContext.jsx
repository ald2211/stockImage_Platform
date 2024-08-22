import { createContext, useContext, useState } from "react"


const userContext=createContext()
export const useUserContext=()=>{
    return useContext(userContext)
}

export const UserContextProvider=({children})=>{

    const [currentUser,setCurrentUser]=useState(null)

    return (
        <userContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </userContext.Provider>
    )
}