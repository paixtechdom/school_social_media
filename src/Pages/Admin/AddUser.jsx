import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../App"


export const Adduser = () =>{
    const navigate = useNavigate()
    const {  setAlert, setAlertMessage, setShowUser, setShowH, setPostDCurrent, setNotiDCurrent, setGallery, setCustomError, dbLocation, getUsers } = useContext(AppContext)

  
    const schema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        department: yup.string().required('Department is required'),
        level: yup.string().required('Level is required'),
        matricNo: yup.string().required('Matric No is required'),
        password: yup.string().min(6).max(18).required()
    })
    
    const { register, handleSubmit, formState: {errors}, setValue, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const addUser = async (data) =>{
        axios.get(`${dbLocation}/user/`).then(function(response){
            const users = response.data
            let appearance = 0;

            users.forEach( userr =>{
                if(data.firstName == userr.firstName && data.lastName == userr.lastName){
                    appearance += 1
                   
                  
                }
                else{
                    
                }
            })
            if (appearance == 0){
                
                try{
                    axios.post(`${dbLocation}/users/save`, data).then(function(response){
                       setAlert(true)
                        setTimeout(() => {
                            setAlert(false)
                            
                        }, 2000);
                        reset({
                            firstName : '',
                            lastName: '',
                            department: '',
                            level: '',
                            matricNo: '',
                            password: ''
                        })
                        setAlertMessage('User Added Successfully')
                        setShowH('showUsers')
                        setPostDCurrent('')
                        setNotiDCurrent('')    
                        setGallery('')    
                        setShowUser('blue')    
                        getUsers()
                    })
                    // navigate('/')
                }
                catch{
                    // console.log(err)
                }
            }
            else{
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 2000);
                setAlertMessage('User Exists')
                
            
            }
        }) 
        
    }

    return (
        <div className="adds">

            <input className="bg-blue" type="text" placeholder="First Name"  {...register('firstName')}/>
            <p className="error">{errors.firstName?.message}</p>

            <input className="bg-blue" type="text" placeholder="Last Name"  {...register('lastName')}/>
            <p className="error">{errors.lastName?.message}</p>

            <input className="bg-blue" type="text" placeholder="department"  {...register('department')}/>
            <p className="error">{errors.department?.message}</p>

            <input className="bg-blue" type="text" placeholder="level"  {...register('level')}/>
            <p className="error">{errors.level?.message}</p>

            <input className="bg-blue" type="text" placeholder="matricNo"  {...register('matricNo')}/>
            <p className="error">{errors.matricNo?.message}</p>

            <input type="text" placeholder="Password"  {...register('password')}/>
            <p className="error">{errors.password?.message}</p>


                <p className="error">{errors.class?.message}</p>
            <button onClick={handleSubmit(addUser)} className='action'> 
                    Add User
                </button>
        </div>
    )
}