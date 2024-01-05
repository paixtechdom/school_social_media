import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useContext } from "react"
import { AppContext } from "../../App"




export const Comments = ({postId, postTitle, userName, type}) =>{
    const { setAlert, setAlertMessage, showComments, setShowComments, commentType, dbLocation, comments, getComments } = useContext(AppContext)



const schema = yup.object().shape({
    comment: yup.string().required('Comment cannot be empty'),
    })

const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm({
    resolver: yupResolver(schema)
})

const addComment = async (data) =>{
        setValue('postId', postId)
        setValue('postTitle', postTitle)
        setValue('userName', userName)
        setValue('commentType', commentType)
        const response = await axios.post(`${dbLocation}/Comments.php/save`, data).then(function(response){
   
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
                
            }, 2000);
            reset({
                comment : ''
            })
            setAlertMessage('Comment Added Successfully')
            getComments()
        })
}
if(showComments == postId){

    
        return(
            <div className="commentParent">
                <form action="">
                <h5>Comments</h5>
                    <textarea  cols="30" rows="10"  className="bg-blue commentInput" type="text" placeholder="Enter your thoughts"  {...register('comment')}></textarea>
                    <p className="error">{errors.comment?.message}</p>
                    
    
                    <button onClick={handleSubmit(addComment)} className='action commentAction'> 
                        Add Comment
                    </button>
                    
                </form>
                
                {
    
                    comments.map((comment, key) => (
                        comment.postId == postId && comment.commentType == type &&
                        // DISPLAY 'NO COMMENT', time for pictured post is 000000
                            <div className="comment" key={key}>
                                <p> <i>{comment.userName}</i>&nbsp;&nbsp;&nbsp; {comment.createdAt}</p>
                                <p>{comment.comment}</p>
                            </div>
    
                        
                    ))
                }
                
    
                
            </div>
        )
}

}

