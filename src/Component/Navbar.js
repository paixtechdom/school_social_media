import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AppContext } from '../App'
import './Navbar.css'
import Cookie from 'js-cookie'

export const Navbar = () =>{
    const { userName, userId, login, setLogin, setUserName, settings, setSettings, setUserClass, profilePicture, setImageZoom, setZoomImageTitle, dbLocation, userClass } = useContext(AppContext)
    const [ blueHome, setBlueHome ] = useState('blue')
    const [ blueSettings, setBlueSettings ] = useState('')

    return(
        <div className='navbar'>
            {
                userName && 
                <div className='userDetails'>
                    <div className='dp'> 
                {
                    profilePicture != '' ?
                        
                        <img src={`${dbLocation}/images/${profilePicture}`}  className='icon' 
                        onClick={() => {
                            setImageZoom(true)
                            setZoomImageTitle(profilePicture)
                        }}/>
                    :
                    <img src={`${dbLocation}/images/dp.png`}  className='icon' />

                }
                    </div>

                <p className='username'>{(userName).toUpperCase()}</p>
            </div>
            }
            <div className='links'>
            {login &&  
                <>
                    <Link to='/' className={blueHome}  onClick={() =>{
                        setBlueHome('blue')
                        setBlueSettings('')
                        setSettings(false)
                     }}>
                        <i className='fa fa-home'></i>
                        <span>Home</span>
                    </Link>

                     <Link to='#' className={blueSettings}  onClick={() =>{
                        setBlueHome('')
                        setBlueSettings('blue')
                        setSettings(true)
                     }}>
                        <i className='fa fa-user'></i>
                        <span>Profile</span>
                    </Link> 
                </>
                 }
            {login == false ? <Link to='/Login'>Login</Link>  : 
                <Link onClick={() => {
                    setLogin(false) 
                    setUserClass('')
                    setUserName('')
                    setSettings(false)
                    // RemoveCookie('userDatails')
                    Cookie.remove('userDetails', {path:'/'})

                }}> <i className='fa fa-sign-out'></i> <span>Logout</span> </Link>
            }
            </div>
        </div>
    )
}