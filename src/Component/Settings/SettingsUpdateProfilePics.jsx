import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { AppContext } from "../../App"
import Cookie from "js-cookie"



export const SettingsUpdateProfilePics = ({id}) =>{
    const { setAlert, setAlertMessage, setProfilePicture, profilePicture, setUserName, setUserClass, setUserId,setLoading, dbLocation } = useContext(AppContext)
    const [ profilepics, setProfilepics ] = useState('')
    const [ imageInputDisplay, setImageInputDisplay ] = useState('')
    const [ disabled, setDisabled ] = useState(true)
    const selectFile = () =>{
        document.querySelector('#image').click()
    }

    const setFile = (e) =>{
        const inputedFile = e.target.files[0]
        if(inputedFile.length < 1){
            alert('Image input cannot be empty')
        }else{
            if(inputedFile.type === 'image' || inputedFile.name.endsWith('.jpeg') || inputedFile.name.endsWith('.jpg') || inputedFile.name.endsWith('.png')  || inputedFile.name.endsWith('.JPEG') || inputedFile.name.endsWith('.JPG') || inputedFile.name.endsWith('.PNG')){
                setProfilepics(inputedFile)
            } else{
                alert('Input a valid image')
                e.target.value = null
            }
        }
    }

    useEffect(() =>{
        setValue('profilepics', profilepics)
        setValue('id', id)
    } , [profilepics])
    useEffect(() =>{
        if(profilepics == ''){
            setImageInputDisplay('none')
        }
        else{
            setImageInputDisplay('block')
            setDisabled(false)
        }
    } , [profilepics])

    
    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm()
 
    const updateImage = async (data) =>{
            setLoading(true)
             await axios.post(`${dbLocation}/index.php/`, data, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
            .then(function(res){                
                axios.get(`${dbLocation}/user/${id}`).then(function(response){
                const user = (response.data)
                setProfilePicture(response.data.profilePicture)
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                    setLoading(false)
                }, 2000);
                Cookie.remove('userDetails', {path:'/'})
                Cookie.set('userDetails', JSON.stringify(user), {
                    expires: 1,
                    sameSite:'strict',
                    secure: 'true'
                })
                const userd = JSON.parse(Cookie.get('userDetails'))
                setUserName(userd?.firstName + '_' + userd?.lastName)
                if(userd?.matricNo == 'admin' && userd?.department == 'admin'){
                    setUserClass('admin')
                }else{
                    setUserClass('user')
                }                
                setUserId(userd?.id)
                setAlertMessage('Profile Picture Updated Successfully')
                document.querySelector('#image').value = null
                }) 
                  

            })
    
    }

    return (
        <form className="">


            <h4>Change Profile Picture</h4>
            
            <input type="file" className="image" id="image" onChange={setFile}
            style={{
                display: imageInputDisplay,
            }} 
            required/>

            <button
                className="focusInput"
                style={{
                    color: 'black'
                }}
                onClick={selectFile}
            >
                Click to select an Image 
            </button>

            <button onClick={handleSubmit(updateImage)} style={{
                color: 'black'
            }} disabled={disabled}> 
               Update
            </button>

            
        </form>
    )
}