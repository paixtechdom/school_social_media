import axios from "axios"
import { useContext, useEffect, useId, useState } from "react"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SettingsUpdateProfilePics } from "./SettingsUpdateProfilePics"
import { Alert } from "../Alert"
import { ImageZoomed } from "../ImageZoomed"
import { Login } from "../Login/Login"
import { AppContext } from "../../App"
import './Settings.css'

export const Settings = () =>{
    const [ user, setUser ] = useState([])
    const [ showPassword, setShowPassword ] = useState('password')
    const { imageZoom, login, alert, alertMessage, setAlertMessage, setAlert, setLoading, dbLocation, profilePicture, userName, setImageZoom, setZoomImageTitle, userId, userClass } = useContext(AppContext)

    const id = userId 

    useEffect(() => {
        getUser()
    }, [profilePicture])


    const getUser =  () =>{
        axios.get(`${dbLocation}/user/${id}`).then(function(response){
            setUser(response.data)
        }) 
        
    }

    // refresh settings, all deletes(unlike, delete posts , delete notification, no dp(random online dp))
    const schema = yup.object().shape({
        confirmOldPassword: yup.
        string()
        .oneOf([(user.password), null], 'Password do not match old password')
        .required('Old Password is a required'),
        password: yup.string().min(6).max(18).required(),
        confirmNewPassword: yup.
        string()
        .oneOf([yup.ref('password'), null], 'Passwords do not match')
        .required('Confirm New Password is a required')
    })
    
    const { register, handleSubmit, setValue, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const onUpdate =  (data) =>{
        Update(data.password, id)
    }
    const Update = async (password, id) =>{
        setLoading(true)
        await axios.post(`${dbLocation}/user/${id}/${password}`).then(function(response){    
                setAlert(true)
                setLoading(false)
                setTimeout(() => {
                    setAlert(false)
                }, 2000);
                reset({
                    confirmNewPassword: '',
                    password: '',
                    confirmOldPassword:''
                })
                setAlertMessage('Password Updated Successfully')
                getUser()
        })

        }
 



    return(
        <div className="settings parent">
            {
                login ? 
                <>
                <div className="setProfile">
                    <div className="sP">
                    {
                    profilePicture != '' ?
                        
                        <img src={`${dbLocation}/images/${user.profilePicture}`}  className='icon' 
                        onClick={() => {
                            setImageZoom(true)
                            setZoomImageTitle(profilePicture)
                        }}/>
                    :
                    <img src={`${dbLocation}/images/dp.png`}  className='icon' />

                }
                    </div>
                    <h2>{(userName).toUpperCase()}</h2>
                </div>
                
                <SettingsUpdateProfilePics id={id}/>  
                <form className="password">
                    <h4>Change Password</h4>
                    {
                        userClass == 'guest' &&
                        <p className="error">{'You cannot change the password to the guest account'}</p>
                    }
                    
                    <input type={showPassword} placeholder="Old Password"  {...register('confirmOldPassword')}/>
                    <p className="error">{errors.confirmOldPassword?.message}</p>

                    <input type={showPassword} placeholder="New Password"  {...register('password')}/>
                    <p className="error">{errors.password?.message}</p>

                    <input type={showPassword} placeholder="Confirm New Password"  {...register('confirmNewPassword')}/>
                    <p className="error">{errors.confirmNewPassword?.message}</p>
                    <div className="passwordReveal" >
                        <input type="checkbox" name="" id="" onClick={() =>{
                            setShowPassword(showPassword == 'text' ? 'password' : 'text') 
                        }}/>
                        <p> Show Password </p>
                    </div>

                        <button onClick={handleSubmit(onUpdate)} style={{color: 'black'}} disabled={userClass == 'guest' ? true : false}> 
                                Save 
                        </button>
                   
                </form>
                
                {
                        alert && <Alert alertMessage={alertMessage}/>
                    }

                     {
                imageZoom == true && <ImageZoomed /> 
            }
                </>

            : 
            <Login />
            }
        {/* nlknm;
        
        
        // theme
        // fontsize
        // password
        // profilePicture */}
        </div>
    )
}