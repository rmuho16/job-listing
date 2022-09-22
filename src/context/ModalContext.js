import {createContext, useState} from "react";

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => {
        setShow(true)
    }
    return (
        <ModalContext.Provider value={{
            show,
            setShow,
            handleShow,
            handleClose
        }}>
            {children}
        </ModalContext.Provider>
    )
}