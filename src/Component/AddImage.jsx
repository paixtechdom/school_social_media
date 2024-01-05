import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import { AppContext } from "../../App"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
// import './Addimage.css'

export const AddImage = () =>{
    
    const [ file, setFile ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ images, setImages ] = useState([])

    const upload = async () =>{
        const formData = new FormData();
        formData.append('title', title)
        formData.append('file', file)
        const response = await axios.post('http://localhost:80/api-eduaid/image.php/', formData, {
            headers: {
                'Content-Type': "multipart/form-data"
            },
        })
        if(response.data.success){
         console.log('File Uploaded successfully')   
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        await upload()
    }


    useEffect(() =>{
        const getImages = () => {
            axios.get('http://localhost:80/api-eduaid/image.php/').then(function(response){
                setImages(response.data)
            })
            }
            getImages()
    } , [])


    return(
        <div>
            
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder="Text" onChange={(e) => setTitle(e.target.value)} required/>

                <input type="file" onChange={(e) => setFile(e.target.files[0])} required/>

                <button type="submit">submit</button>
            </form>

            {
                images?.map((image, key) =>(
                    <div className="poNo" key={key}>
                        
                        <h3>{image.title}</h3>
                       <img src={`http://localhost/api-eduaid/images/${image.file}`} alt="" className="image" />
                    </div>
                ))
            }

        </div>
    )
}