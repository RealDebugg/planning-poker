import { useEffect, useState } from 'react'
import { getCookie } from "cookies-next";

export function useUser() {
    const [user, setUser] = useState({
        name: ''
    })

    const [isUserDataFetched, setIsUserDataFetched] = useState(false)

    useEffect(() => {
        setUser((prevUser) => ({
            ...prevUser,
            name: getCookie("username") ?? ""
        }))
        setIsUserDataFetched(true)
    }, [])

    return { user, isUserDataFetched }
}

export default useUser