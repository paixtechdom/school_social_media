import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { AppContext } from "../../App"
import { Comments } from "./Comments"
import { Like } from "./Like"
import { AddNotification } from "../../Component/AddNotification"
import { LikeNo } from "./LikeNo"
import { CommentInfo } from "./CommentInfo"



export const Notification = () =>{

    const { userClass, setImageZoom, setZoomImageTitle, setShowComments, userName, setCommentType, setShowLikeInfo , setAlert, setAlertMessage, notifications , dbLocation, getNotification, setPostType, showComments, setShowH, setLoad } = useContext(AppContext)

    useEffect(()=>{
        setPostType('notification')
    }, [])


    const deleteNotification = async (id, image) =>{
        if(image.length > 0){
            await axios.post(`${dbLocation}/notification.php/${id}/${image}`)
        }else{
            await axios.post(`${dbLocation}/notification.php/${id}`)
        }
        setAlert(true)
        setShowH('')
        setLoad('Deleting')
        setTimeout(() => {
            setAlert(false)
            setShowH('notifications')
            setLoad('false')
        }, 2000);
            getNotification()
            setAlertMessage('Notification Deleted')
       
        

    }

    return(
        <div>

           <div className="poNoParent">
            <h2>School Update</h2>
            {
                userClass == 'admin' &&
                <AddNotification />

            }
           {
                notifications?.map((notification, key) =>(
                    <div className="postParent" key={key}>
                        <div className="poNo">
                           
                            <i>{
                            notification.createdAt
                            }</i>
                           <h3>{notification.notificationTitle}</h3>
                            <p>{notification.notificationContent}</p>
                            <img src={`${dbLocation}/images/${notification.image}`} alt="" className="image" 
                            onClick={() => {
                                setImageZoom(true)
                                setZoomImageTitle(notification.image)
                            }}
                            />
                            <div className="LikeNo">
                                <p onClick={() => {setShowLikeInfo(notification.id)
                                 }}>
                                <LikeNo likeType={'like'}  postId={notification.id} postType={'notification'}/> 
                                </p>
                                <p>
                                <CommentInfo commentType={'notification'} postId={notification.id}/>
                                </p>

                            </div>   
                            <div className="poNoButtons">

                            <Like likeType={'like'} userName={userName} postId={notification.id} postType={'notification'}/>


                            <button className="commentButton" onClick={()=> { 
                                setShowComments(showComments == notification.id ? '' : notification.id) 
                                setCommentType('notification')
                                }}>
                                    <i className="fa fa-comments"></i>
                            <span>Comments</span></button>
                            {
                             userClass == 'admin' &&
                             <button className="commentButton delete" onClick={() => deleteNotification(notification.id, notification.image)}>
                              <i className="fa fa-remove"></i>
                                <span>Delete</span>
                             </button>
                         }
                            </div>
                        </div>
                        
                        <Comments postId={notification.id} userName={userName} postTitle={notification.notificationTitle} type={'notification'}/>
                        
                    </div>

                ))
            }
            </div>
        </div>
    )
}