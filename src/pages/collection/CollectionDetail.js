import { useParams } from "react-router-dom"
function CollectionDetail() {
    const pathParams = useParams()
    const collectId = pathParams.collectId
    return (
        <>
            collect <h1>{collectId}</h1>
        </>
    )
}

export default CollectionDetail