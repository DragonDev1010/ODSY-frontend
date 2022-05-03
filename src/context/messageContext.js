import React, {useState} from "react"

export const MessageContext = React.createContext()

export const MessageContextProps = () => {
    const [message, setMessage] = useState('Site message')
    return {
        message,
        setMessage
    }
}