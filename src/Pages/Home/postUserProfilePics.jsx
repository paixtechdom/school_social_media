import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"

export const PostUserProfilePics = ({userId}) =>{

    const [ profilePics, setProfilePics ] = useState('')
    const {  dbLocation, setImageZoom, setZoomImageTitle, addedNewPost } = useContext(AppContext)


    useEffect(() => {
        setProfilePics('')
        getUser()
    }, [addedNewPost])


    const getUser = async  () =>{
        await axios.get(`${dbLocation}/index.php/${userId}`).then(function(response){
            setProfilePics(response.data.profilePicture)
        }) 
        
    }



    return(
   

        <>
        {
            profilePics == '' ?
            <img src={`${dbLocation}/images/dp.png`}  className='icon' />
            
            :
            <img src={`${dbLocation}/images/${profilePics}`}  className='icon' alt="Profile pics" 
            onClick={() => {
                setImageZoom(true)
                setZoomImageTitle(profilePics)
            }}/>
            
        }    
        </>
        )
}