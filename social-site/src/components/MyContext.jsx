import {createContext, useState} from 'react';

export const CustomContext = createContext()
export const MyContext=(props) =>{

    const [user, setUser] = useState({id:''})

    // const [count,setCount] = useState(0)

    const value = {
        user,
        setUser
    }
    return <CustomContext.Provider value={value}>{props.children}</CustomContext.Provider>
}
// export default {MyContext,CustomContext}