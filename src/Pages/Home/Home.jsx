import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"
import { Admin } from "../Admin/Admin"
import { Notification } from "./Notification"
import { Posts } from "./Posts"
import './Home.css'
import { Login } from "../../Component/Login/Login"
import { Alert } from "../../Component/Alert"
import { Gallery } from "./Gallery"
import { ImageZoomed } from "../../Component/ImageZoomed"
import { Projects } from "./Project"
import { Settings } from "../../Component/Settings/Settings"
import { Load } from "./Load"

export const Home = () =>{
    const { userClass, login, alert, alertMessage, imageZoom, setUrl, settings, show, setShow, dbLocation } = useContext(AppContext)
    const [ postCurrent, setPostCurrent] = useState('blue')
    const [ notificationCurrent, setNotificationCurrent] = useState('')
    const [ gallery, setGallery] = useState('')
    const [ projects, setProjects] = useState('')


    return (
        <>
        <div className="home parent">

            {
                login == false && <Login /> 
            }
            {
                imageZoom == true && <ImageZoomed /> 
            }
        {
                settings ?
                <Settings /> :
                <>
                {
                   ( userClass == 'user'  || userClass == 'guest' )
                    && 
                       <div className="user">
                            <div className="buttons fixed">
                                <button className={postCurrent} onClick={() => {setShow('posts')
                                    setPostCurrent('blue')
                                    setNotificationCurrent('')
                                    setGallery('')
                                    setProjects('')
                                    setUrl('posts')
                                }}>
    
                                    <i className='fa fa-home'></i>
                                    <span>Posts</span>
                                </button>
    
                                    <button className={notificationCurrent} onClick={() => {setShow('notifications')
                                    setPostCurrent('')
                                    setNotificationCurrent('blue')
                                    setGallery('')
                                    setProjects('')
                                    setUrl('notifications')
                                }}>
    
                                    <i className="fa fa-bell"></i>
    
                                    <span>Updates</span>
                                </button>
    
                                <button className={gallery} onClick={() => {setShow('gallery')
                                    setPostCurrent('')
                                    setNotificationCurrent('')
                                    setGallery('blue')
                                    setProjects('')
                                }}>
    
                                    <i className="fa fa-image"></i>
                                    <span>Gallery</span>
                                </button>
    
                                <button className={projects} onClick={() => {setShow('projects')
                                    setPostCurrent('')
                                    setNotificationCurrent('')
                                    setGallery('')
                                    setProjects('blue')
                                    setUrl('projects')
                                }}>
    
                                    <i className="fa fa-file"></i>
                                    <span>Projects</span>
                                </button>
                            </div>
                            {
                            show == 'posts' ? 
                                <div>
                                <Posts />
                                </div>
                            : show == 'gallery' ?
                                <Gallery /> :
                            show == 'projects' ?
                                <Projects /> :
                            show == 'notifications' &&
                                <Notification />
                            }
                            {
                                alert && <Alert alertMessage={alertMessage}/>
                            }
                       
                        </div>
                    
                     }
                <div className="home">
                    {
                        userClass == 'admin' && 
                        <Admin />
                        
                    }
                </div>
                
                </>
            }
        </div>
            
        </>
    )
}