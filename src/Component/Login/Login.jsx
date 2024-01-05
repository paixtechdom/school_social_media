import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AppContext } from "../../App"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import './Login.css'
import Cookie from "js-cookie"


export const Login = () =>{
    const { setUserName, setFirstName, setLastName, setUserClass, setUserLevel, setLogin, setUserId, setProfilePicture, setUserDepartment,dbLocation } = useContext(AppContext)

    // to store users fetched
    const [ users, setUsers ] = useState([])
    // to store error to be displayed if there is error in the login details
    const [ customError, setCustomError ] = useState('')
    const [ showPassword, setShowPassword ] = useState('password')
    const navigate = useNavigate()
    
    
    useEffect(()=>{
        // to fetch all users
        getUsers()
        
    }, [])
    
    
    // to fetch all users
    const getUsers =  () =>{
        axios.get(`${dbLocation}/user/`).then(function(response){
            setUsers(response.data)
        }) 
    }

    // to validate the login inputs
    const schema = yup.object().shape({
        matricNo: yup.string().required('Username is required'),
        password: yup.string().min(6).max(18).required()
    })
    
    // to handle the details of the form on submit
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    // LOGIN FUNCTION
    const onLogin = (data) =>{
        // to fetch all users and check if the username and password matches an existing record
        users.forEach( userr =>{
            if(data.password == userr.password && data.matricNo == (userr.matricNo)){
                
                // set login = true
                setLogin(true)
                setProfilePicture(userr?.profilePicture)

                // to create and save a cookie of this user's details
                Cookie.remove('userDetails', {path:'/'})
                Cookie.set('userDetails', JSON.stringify(userr), {
                    expires: 1,
                    sameSite:'strict',
                    secure: 'true',
                    path: '/'
                })
                const user = JSON.parse(Cookie.get('userDetails'))
                setUserName(user?.firstName + `${user.lastName && '_'}` + user?.lastName)
                if(user?.matricNo == 'admin' && user?.department == 'admin'){
                    setUserClass('admin')
                }
                else if(user?.matricNo == 'guest' && user?.department == 'guest'){
                    setUserClass('guest')
                }
                else{
                    setUserClass('user')
                }
                setUserLevel(user?.level)
                setUserId(user?.id)
                setFirstName(user?.firstName)
                setLastName(user?.lastName)
                setUserDepartment(user?.department)
                navigate('/')
            }
            else{
                setCustomError('Incorrect Matric Number or password')
                setTimeout(() => {
                    setCustomError('')
                }, 3000);
            }
        })
    }


    return (
        <div className="login parent">

            <form className="form">
                <fieldset>
                <legend className="">Login</legend>

                <input className="bg-blue" type="text" placeholder="Matric Number"  {...register('matricNo')}/>
                <p className="error">{errors.username?.message}</p>
                <input type={showPassword} placeholder="Password"  {...register('password')}/>
                <div className="passwordReveal">
                <input type="checkbox" onClick={() =>{
                    setShowPassword(showPassword == 'text' ? 'password' : 'text')
                }}/>
                <p> Show Password </p>
                </div>
                <p className="error">{errors.password?.message}</p>
                <p className="error">{customError}</p>

                <button onClick={handleSubmit(onLogin)} className=''> 
                    Login 
                </button>
                </fieldset>
            </form>
            {/* <AddImage /> */}


        </div>
    )
}