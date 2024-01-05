import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from "axios"
import { AppContext } from "../App"
import { Alert } from "./Alert"
import { useNavigate } from "react-router"



export const Addpost = () =>{
    const { userClass, userName, setAlert, setAlertMessage, setShowUser, setShowH, getLikes, getComments, setNotiDCurrent, setGallery,  getPosts, dbLocation, userId, setAddedNewPost, setLoad, setShow } = useContext(AppContext)
    const navigate = useNavigate()

    
    const [ image, setImage ] = useState('')
    const [ imageInputDisplay, setImageInputDisplay ] = useState('')
    const [ customError, setCustomError ] = useState('')
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
        setValue('userClass', userClass)
        setValue('userName', userName)
    }, [])
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
        postTitle: yup.string(),
        postContent: yup.string(),
  
        })
    
    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    })
    
    const addPost = async (data) =>{
        setValue('userId', userId)
        if(data.postTitle !== '' || data.postContent !== '' || data.image !== ''){
            await axios.post(`${dbLocation}/post.php/`, data, {
                    headers: {
                    'Content-Type': "multipart/form-data"
                }
            }).then(function(response){
                
                setAlert(true)
                setLoad('Uploading')
                setShowH('gallery')
                setShow('')
                setTimeout(() => {
                    setAlert(false)
                    setShowH('posts')
                    setShow('posts')
                    setLoad('false')
                }, 2000);
                reset({
                    postTitle : '',
                    postContent: ''
                })
                document.querySelector('#image').value = null
                setImageInputDisplay('none')
                setValue('image', '')
                setAlertMessage('Post Created Successfully')
                setNotiDCurrent('')
                setGallery('')
                
                setShowUser('')
                getPosts()
                getLikes()
                getComments()
                setAddedNewPost(true)
                setCustomError('')
            })
        }else{
            setCustomError('All fields cannot be empty')
        }
    }

    return (
        <div className="adds">


            <input className="bg-blue invisible" type="text" placeholder="Enter post Title (Optional)"  {...register('userName')} readOnly/>
            <input className="bg-blue invisible" type="text" placeholder="Enter post Title (Optional)"  {...register('userClass')} readOnly/>
            <input className="bg-blue invisible" type="text" placeholder="Enter post Title (Optional)"  {...register('image')} readOnly/>
            

            <input className="bg-blue" type="text" placeholder="Enter post Title (Optional)"  {...register('postTitle')}/>
            {/* <p className="error">{errors.postTitle?.message}</p> */}
            <textarea cols="30" rows="10" className="bg-blue" type="text" placeholder="Enter post Content"  {...register('postContent')}></textarea>
            <p className="error">{errors.postContent?.message}</p>
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
            <p className="error">{customError}</p>

            <button onClick={handleSubmit(addPost)} className='action'> 
                Create Post
            </button>

            
        </div>
    )
}