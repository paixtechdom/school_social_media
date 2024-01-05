import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"



export const CommentSpan = ({postId}) =>{
    const [ commented, setCommented ] = useState('')
    const { comments, userName } = useContext(AppContext)

    useEffect(() =>{
        comments.forEach((comment) =>{
            if(postId == comment.postId && userName == comment.userName){
                setCommented('blue')
            }
        })
    }, [comments])

    


    return(
       <span id={commented}>
            Comments
       </span>
    )
}