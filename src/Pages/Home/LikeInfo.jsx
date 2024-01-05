import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"

export const LikeInfo = ({ postId}) => {
    const [ postLikes, setPostLikes ] = useState([])
    const { showLikeInfo, setShowLikeInfo, likes } = useContext(AppContext)


    useEffect(() =>{
        const returnedLikes = likes.filter(like => like.postId == showLikeInfo)
        setPostLikes(returnedLikes)
    }, [showLikeInfo, likes])

    if(showLikeInfo !== ''){
    return(

        <div className="likeInfo">
            <button onClick={() => setShowLikeInfo('')}>Close</button>
            <h3>Those who liked this post</h3>
        {
            postLikes.map((like, key) =>(
                < div className="info" key={key}>
                    <h4>{like.userName}</h4>
                    <i>{like.createdAt}</i>
                    
                </div>
            ))
        }
            


        </div>
    )

    }
}