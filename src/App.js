import React, {lazy, Suspense} from 'react'
import './App.css';
import { Login } from './Component/Login/Login';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Navbar } from './Component/Navbar';
import { Home } from './Pages/Home/Home';
import { createContext, useState, useContext, useEffect, useId } from 'react';
import Cookie from 'js-cookie'
import axios from 'axios';

import { Settings } from './Component/Settings/Settings';
import { Loading } from './Component/Loading';
import { LikeInfo } from './Pages/Home/LikeInfo';
import { Load } from './Pages/Home/Load';
// const Settings = React.lazy(()=> import ('./Component/Settings/Settings'))

export const AppContext = createContext()

const Layout = () =>{
  const [ userName, setUserName ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ userClass, setUserClass ] = useState('')
  const [ userLevel, setUserLevel ] = useState('')
  const [ userDepartment, setUserDepartment ] = useState('')
  const [ userId, setUserId ] = useState(null)
  const [ profilePicture, setProfilePicture ] = useState('')
  const [ alert, setAlert ] = useState(false)
  const [ alertMessage, setAlertMessage ] = useState('')
  const [ imageZoom, setImageZoom ] = useState(false)
  const [ zoomImageTitle, setZoomImageTitle ] = useState('')
  const [ postDCurrent, setPostDCurrent] = useState('blue')
  const [ notiDCurrent, setNotiDCurrent] = useState('')
  const [ showUser, setShowUser] = useState('')
  const [ showH, setShowH ] = useState('posts')
  const [ show, setShow ] = useState('posts')
  const [ gallery, setGallery] = useState('')
  const [ showComments, setShowComments ] = useState('')
  const [ commentType, setCommentType ] = useState('')
  const [ postType, setPostType ] = useState('')
  const [ add, setAdd ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ posts, setPosts ] = useState([])
  const [ notifications, setNotifications ] = useState([])
  const [ users, setUsers ] = useState([])
  const [ projects, setProjects ] = useState([])
  const [ comments, setComments ] = useState([])
  const [ likes, setLikes ] = useState([])
  const [ url, setUrl ] = useState('posts')
  const [ showLikeInfo, setShowLikeInfo ] = useState('')
  const [ load, setLoad ] = useState('false')
  const [ settings, setSettings ] = useState(false)
  const [ addedNewPost, setAddedNewPost ] = useState(false)
  const [ dbLocation, setDbLocaation ] = useState('https://eduaidsocialmedia.000webhostapp.com/api-eduaid')
  // const [ dbLocation, setDbLocaation ] = useState('http://localhost:80/api-eduaid')


// Quizapp, Quiz_app123

  
  const checkUser = Cookie.get('userDetails')
  const [ login, setLogin ] = useState(checkUser === undefined ? false : true)
  
  useEffect(() =>{

    //       *********USE LINKS FOR THE POST, NOTIFICATION ETC
    if(url == 'posts'){
      if(posts.length == 0){
        getPosts()
      }
      <br />
    }
    if(url == 'notifications'){
      if(notifications.length == 0){
        getNotification()
      }
    }
    if(url == 'users'){
      if(users.length == 0){
        getUsers()
      }
    }
    if(url == 'projects'){
      if(projects.length == 0){
        getProjects()
      }
    }
    if(comments.length == 0){
      getComments()
    }
    if(likes.length == 0){
      getLikes()
    }
  }, [url])

  useEffect(() =>{
    setInterval(() => {
      getPosts()
      getComments()
      getLikes()
      getNotification()
    }, 60000);
  }, [])

  const getComments = () =>{
        
    axios.get(`${dbLocation}/Comments.php/`).then(function(response){
        setComments(response.data)
    })
}

  const getPosts = () =>{
    setLoading(true)
    try{
      axios.get(`${dbLocation}/post.php/post/`).then(function(response){
          setPosts(response.data)
          setLoading(false)
        })
      }catch{
      setLoading(false)
    }
}

const getNotification = () =>{
  setLoading(true)
  try{
      axios.get(`${dbLocation}/notification.php/post/`).then(function(response){
          setNotifications(response.data)
          setLoading(false)
  }) 
  }
  catch{
      setLoading(false)
  }
}

const getUsers =  () =>{
  setLoading(true)
  axios.get(`${dbLocation}/user/`).then(function(response){
      setUsers(response.data)
      setLoading(false)
  }) 
}
const getProjects =  () =>{
  setLoading(true)
  axios.get(`${dbLocation}/project.php/`).then(function(response){
      setProjects(response.data)
      setLoading(false)
  }) 
}
const getLikes = () =>{
  axios.get(`${dbLocation}/like.php/`).then(function(response){
      setLikes(response.data)
  })
}


  useEffect(() =>{
    if(!login){
      setLoad('true')
      setTimeout(() => {
        setLoad('false')
      }, 2000);
    }
    
    const user = Cookie.get('userDetails')
    if(user != undefined){
    
      const userd = JSON.parse(Cookie.get('userDetails'))
      setUserName(userd?.firstName + `${userd.lastName && '_'}` + userd?.lastName)
      if(userd?.matricNo == 'admin' && userd?.department == 'admin'){
        setUserClass('admin')
      } 
      else if(user?.matricNo == 'guest' && user?.department == 'guest'){
        setUserClass('guest')
    }else{

          setUserClass('user')
      }  
      setUserDepartment(userd?.department)
      setUserLevel(userd?.level)
      setFirstName(userd?.firstName)
      setLastName(userd?.lastName)
      setUserId(userd?.id)
      setProfilePicture(userd?.profilePicture)
    }
  }, [])
  
  
  return(
    <div className='app'>

      <AppContext.Provider value={{ userName, setUserName, firstName, setFirstName, lastName, setLastName, userClass, setUserClass, userLevel, setUserLevel, userDepartment, setUserDepartment, login, setLogin, alert, setAlert, alertMessage, setAlertMessage, imageZoom, setImageZoom, zoomImageTitle, setZoomImageTitle, userId, setUserId, setProfilePicture, profilePicture,postDCurrent, setPostDCurrent, notiDCurrent, setNotiDCurrent, showUser, setShowUser, setShowH, showH, gallery, setGallery, showComments, setShowComments, commentType, setCommentType, show, setShow, add, setAdd, postType, setPostType, loading, setLoading, posts, setPosts, notifications, setNotifications, users, setUsers, comments, setComments, likes, setLikes, url, setUrl, projects, setProjects, getProjects, getNotification, getPosts, getUsers, getLikes, dbLocation, setDbLocaation, getComments, showLikeInfo, setShowLikeInfo, load, settings, setSettings, addedNewPost, setAddedNewPost, setLoad, show, setShow }} >
        <Load />
        <Navbar />
        <Outlet/>
        <Loading />
        <LikeInfo />

      </AppContext.Provider>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Settings/:id/edit',
        element: <Settings />
      },
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: '/*',
        element: <h2 className='parent'>Page not found</h2>
      }
    ]
  }
])

function App({login}) {
  
    return (
      <div className='App'>
          <RouterProvider router={router} /> 
      </div>
    );



}
export default App;
         