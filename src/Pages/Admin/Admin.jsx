import { Posts } from "../Home/Posts"
import '../Admin/Admin.css'
import { useEffect, useState, useContext } from "react"
import { Notification } from "../Home/Notification"
import { Alert } from "../../Component/Alert"
import { AppContext } from "../../App"
import { Gallery } from "../Home/Gallery"
import { Users } from "./Users"
import { Projects } from "../Home/Project"
import { Load } from "../Home/Load"


export const Admin = () =>{
    const [ projects, setProjects ] = useState('')
    const { alert, alertMessage, postDCurrent, setPostDCurrent, notiDCurrent, setNotiDCurrent, showUser, setShowUser, setShowH, showH, gallery, setGallery, setUrl } = useContext(AppContext)


    return (
        <div>
            <div className="buttons fixed">
                <button className={postDCurrent} onClick={() => {setShowH('posts')
                    setPostDCurrent('blue')
                    setNotiDCurrent('')
                    setGallery('')
                    setShowUser('')
                    setProjects('')
                    setUrl('posts')
                }}>
                    <i className='fa fa-home'></i>
                    <span>Posts</span>
                </button>

                <button className={notiDCurrent} onClick={() => {setShowH('notifications')
                    setPostDCurrent('')
                    setNotiDCurrent('blue')    
                    setGallery('')
                    setShowUser('')
                    setProjects('')
                    setUrl('notifications')
                }}>
                    <i className="fa fa-bell"></i>
                    <span>Updates</span>            
                </button>

                <button className={gallery} onClick={() => {setShowH('gallery')
                    setPostDCurrent('')
                    setNotiDCurrent('')    
                    setGallery('blue')
                    setShowUser('')    
                    setProjects('')
                    setUrl('gallery')
                }}>
                    
                    <i className="fa fa-image"></i>
                    <span>Gallery</span>
                </button>
        
                <button className={projects} onClick={() => {setShowH('projects')
                    setPostDCurrent('')
                    setNotiDCurrent('')    
                    setProjects('blue')    
                    setGallery('')
                    setShowUser('')    
                    setUrl('projects')
                }}>
                    <i className="fa fa-file"></i>
                    <span>Projects</span>
                </button>

                <button className={showUser} onClick={() => {setShowH('showUsers')
                    setPostDCurrent('')
                    setNotiDCurrent('')    
                    setGallery('')    
                    setShowUser('blue')  
                    setProjects('')  
                    setUrl('users')
                }}>
                    <i className="fa fa-users"></i>
                    <span>Users</span>
                </button>
            </div>
            {
            showH == 'posts' ? 
            <div>
            <Posts />
            </div>
            : showH == 'notifications' ? 
            <Notification /> :
            showH == 'showUsers' ?
            <Users /> :
            showH == 'projects' ?
            <Projects /> : showH== 'gallery' &&
                <Gallery />
            }
            {
                alert && <Alert alertMessage={alertMessage}/>
            }

        </div>
    )
}