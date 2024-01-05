import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from "axios"
import './Project.css'

export const Projects = () =>{
    const { userClass, firstName, lastName, setLoading, userId, setAlert, setAlertMessage, users, setUsers, userLevel, projects, getProjects, userDepartment, dbLocation } = useContext(AppContext)

    const [ file, setFile ] = useState('')
    const [ appearance, setAppearance ] = useState(0)
    const [ fileInputDisplay, setFileInputDisplay ] = useState('')
    const selectFile = () =>{
        document.querySelector('#image').click()
    }

    const getFile = (e) =>{
        const inputedFile = e.target.files[0]
        if(inputedFile.type === 'text/plain' || inputedFile.name.endsWith('.doc') || inputedFile.name.endsWith('.docx') || inputedFile.name.endsWith('.pdf')){
            setFile(inputedFile)
            alert('Only files with .doc, .docx, .pdf are supported')
        } else{
            e.target.value = null
        }
    }

    useEffect(() =>{
        checkProjects()
    }, [projects])


    
    const checkProjects = () =>{
        projects.forEach((project) =>{
            if(project.firstName == firstName && project.lastName == lastName){
                setAppearance(appearance + 1)
            }
        })
    }
    useEffect(() =>{

        setValue('lastName', lastName)
        setValue('firstName', firstName)
        setValue('department', userDepartment)

    }, [])

    useEffect(() =>{
        setValue('file', file)
    } , [file])
    useEffect(() =>{
        if(file == ''){
            setFileInputDisplay('none')
        }
        else{
            setFileInputDisplay('block')
        }
    } , [file])

    const schema = yup.object().shape({
        projectTitle: yup.string().required('Project Topic is required'),  
        })
    
    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    })
 
    const addProject = async (data) =>{
        if (data.file !== ''){
            setLoading(true)
            const response = await axios.post(`${dbLocation}/project.php/posts/save`, data, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            })
            if(response.data.success){
                
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                    
                }, 2000);
                reset({
                    projectTitle : ''
                })
                document.querySelector('#image').value = ''
                setAlertMessage('Project Added Successfully')
                setLoading(false)
                getProjects()
                checkProjects()
                setAppearance(appearance + 1)
                document.querySelector('#image').value = null
            }

        }else{
            
        }
    }

    return(
           <div className="poNoParent">
            <div className="projects">

                <h2>Final Year Projects <i className="fa fa-graduation-cap"></i> </h2>

           
           {
            userClass == 'admin' ? '' : 
            appearance < 1 && userLevel == 300  &&
            <div className="adds" >
                
        
                <input className="bg-blue" type="text" placeholder="Enter Project Topic"  {...register('projectTitle')}/>
                <p className="error">{errors.projectTitle?.message}</p>

                <input type="file" className="image" id="image" onChange={getFile}
                style={{
                    display: fileInputDisplay,
                }}
                required/>
    
                <button
    
                    style={{
                        color: 'black'
                    }}
                    onClick={selectFile}
                >
                    Click to add file 
                </button>
    
                <button onClick={handleSubmit(addProject)} className='action'> 
                    ADD PROJECT <i className="fa fa-upload"></i>
                </button>

            
            </div>
           }

                {
                    projects?.map((project, key) =>(
                        <div className="project" key={key}>
                            <h3>{key+1}.</h3>
                            <div>

                                <h3><b>Topic -</b> {project.projectTitle}</h3>
                                <p className="name"><b>By -</b>  {(project.firstName).toUpperCase()} {(project.lastName).toUpperCase()} </p>
                                <p className="title"><b>Department -</b> {project.department}</p>
                                <p className="file"> <b>File -</b> {project.file}</p>
                                <a href={`${dbLocation}/files/${project.file}`}  download>Download <i className="fa fa-download"></i> </a>
                                <i>{project.createdAt}</i>
                            </div>
                        </div>
                    ))
                }
            
            </div>
        </div>
    )
}