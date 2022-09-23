import {createContext, useState} from "react"

export const LoadingContext = createContext()

export const LoadingProvider = ({children}) => {

    const [loading, setLoading] = useState(false)

    const setIsLoading = () => {
        setLoading(true)
    }

    const setIsNotLoading = () => {
        setLoading(false)
    }

    return (
        <LoadingContext.Provider value={{
            loading,
            setIsLoading,
            setIsNotLoading
        }}>
            {children}
        </LoadingContext.Provider>
    )
}