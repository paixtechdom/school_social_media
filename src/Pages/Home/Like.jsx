import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useContext } from "react"
import { AppContext } from "../../App"




export const Like = ({postId, postType, userName, likeType}) =>{
    const [ id, setId ] = useState(0)
    const [ liked, setLiked ] = useState('')
    const [ appearance, setAppearance ] = useState(0)
    const { setAlert, setAlertMessage, likes, dbLocation, getLikes } = useContext(AppContext)

    useEffect(() =>{
        setAppearance(0)
        likes.forEach((like) =>{
            if(postId == like.postId && userName == like.userName){
                setAppearance(appearance + 1)
                setId(like.id)
                setLiked('blue')
            }
        })
        
    }, [likes])

        
const schema = yup.object().shape({
})

const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm({
resolver: yupResolver(schema)
})


const addLike = async (data) =>{
    
    if(appearance > 0){
        await axios.post(`${dbLocation}/like.php/${id}`)
        setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 2000);  
            setAlertMessage('Unliked post')
            getLikes()
            setLiked('')
            
        }
        
        
    if(appearance == 0){
        setValue('postId', postId)
        setValue('postType', postType)
        setValue('userName', userName)
        setValue('likeType', likeType)
        await axios.post(`${dbLocation}/like.php/`, data).then(function(response){
            setAlert(true)
            setTimeout(() => {
                setAlert(false)    
            }, 2000)
            setAlertMessage('Liked Post')   
            getLikes()         
        })
    }

}


    
        return(
            <div className="">
               
               <button className="commentButton" id={liked}  
               onClick={
                    handleSubmit(addLike)}
                    ><i className="fa fa-thumbs-o-up"></i>
                        {/* 👍 */}
                <span>Like</span></button>
                
            </div>
        )


}

