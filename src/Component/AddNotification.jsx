import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"





export const AddNotification = () =>{
    const {  setAlert, setAlertMessage, setShowUser, setShowH, setPostDCurrent, setNotiDCurrent, setGallery, getNotification, dbLocation, getLikes, getComments } = useContext(AppContext)

    const [ image, setImage ] = useState('')
    const [ imageInputDisplay, setImageInputDisplay ] = useState('')
    const selectFile = () =>{
        document.querySelector('#image').click()
    }

    const setFile = (e) =>{
        const inputedFile = e.target.files[0]
        if(inputedFile == undefined){
            setImage('')
        }
        else if(inputedFile !== undefined && inputedFile !== '' ){
            if(inputedFile.type === 'image' || inputedFile.name.endsWith('.jpeg') || inputedFile.name.endsWith('.jpg') || inputedFile.name.endsWith('.png')  || inputedFile.name.endsWith('.JPEG') || inputedFile.name.endsWith('.JPG') || inputedFile.name.endsWith('.PNG')){
                setImage(inputedFile)
            } else{
                alert('Input a valid image')
                e.target.value = null
                setImage('')
            }
        }  
    }
    useEffect(() =>{
        setValue('image', image)
    } , [image])
    useEffect(() =>{
        if(image == ''){
            setImageInputDisplay('none')
        }
        else{
            setImageInputDisplay('block')
        }
    } , [image])

    const schema = yup.object().shape({
        notificationTitle: yup.string(),
        // postTitle: yup.string().required('Post Title is required'),
        notificationContent: yup.string().required('Notification Content is required'),
        })
    
    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    })

    const addNotification = async (data) =>{
         await axios.post(`${dbLocation}/notification.php/save`, data, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }).then(function(response){
       
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                    
                }, 2000);
                reset({
                    notificationContent : '',
                    notificationTitle: ''
                })
                document.querySelector('#image').value = null
                setImageInputDisplay('none')
                setValue('image', '')
                setAlertMessage('Notification Created Successfully')
                setShowH('notifications')
                setPostDCurrent('')
                setNotiDCurrent('blue')    
                setGallery('')
                setShowUser('')
                getNotification()
                getLikes()
                getComments()
            })
            // if(response.data.success){
                
            // }

    }

    return (
        <div className="adds">

            <input className="bg-blue" type="text" placeholder="Enter Notification Heading (Optional)"  {...register('notificationTitle')}/>
            {/* <p className="error">{errors.postTitle?.message}</p> */}
            <textarea  cols="30" rows="10"  className="bg-blue" type="text" placeholder="Enter notification Content"  {...register('notificationContent')}></textarea>
            <p className="error">{errors.notificationContent?.message}</p>

            <input type="file" className="image" id="image" onChange={setFile}
            style={{
                display: imageInputDisplay,
            }}
            />

            <button

                style={{
                    color: 'black'
                }}
                onClick={selectFile}
            >
                Click to Add an image (optional)
            </button>
            

            <button onClick={handleSubmit(addNotification)} className='action'> 
                Create Notification
              </button>
             
        </div>
    )
}