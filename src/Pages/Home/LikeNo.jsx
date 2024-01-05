import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"

export const LikeNo = ({userName, postId}) => {
    const [ postLikes, setPostLikes ] = useState([])
    const [ noLikes, setNoLikes ] = useState(0)
    const { setAlert, setAlertMessage, likes, setLikes } = useContext(AppContext)


    useEffect(() =>{
        const returnedLikes = likes.filter(like => like.postId == postId)
        setNoLikes(returnedLikes.length)
    }, [likes])


    return(

        <>
        {
            noLikes == 0 ? '' : 

            noLikes == 1 ?
            <>
            {noLikes} like
            </>
            : 
            <>
                {noLikes} likes
            </>
        }

        </>
)
}