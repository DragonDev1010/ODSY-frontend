import { useState } from "react"

function Activity(props) {
    const [activities, setActivities] = useState(null)
    const tokenId = props.tokenId
    fetch( process.env.REACT_APP_API_BASE_URL + 'activity/' + tokenId )
        .then(res => res.json())
        .then( data => {
            if(data.length > 0)
                setActivities(data)
        })
    return (
        <>
            
        </>
    )
}

export default Activity