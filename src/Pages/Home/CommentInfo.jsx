import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"

export const CommentInfo = ({commentType, postId}) => {
    const [ noComment, setNoComment ] = useState(0)
    const {  comments } = useContext(AppContext)


    useEffect(() =>{
        const returnedCcomments = comments.filter(comment => comment.postId == postId)
        setNoComment(returnedCcomments.length)
    }, [comments])


    return(

        <>
        {
            noComment == 0 ? '' :  
            noComment == 1 ? 
            <>
                {noComment} comment
            </>

            : 
            <>
                {noComment} comments
            </>
        }
        
        </>
)
}