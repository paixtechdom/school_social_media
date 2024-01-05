import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"
import { Adduser } from "./AddUser"

export const Users = () =>{
    const { userClass, setLoading, userId, setAlert, setAlertMessage, users, getUsers, dbLocation, setLoad, getLikes, getPosts, getComments } = useContext(AppContext)
    let i = 1


    const deleteUser = async (id, userName) =>{
        setLoading(true)
        await axios.post(`${dbLocation}/index.php/${userName}/${id}`)
            setLoading(false)
            setAlert(true)
            setLoad('inload')
            setTimeout(() => {
                setAlert(false)
                setLoad('false')
            }, 2000);
            getUsers()
            getPosts()
            getComments()
            getLikes()
            setAlertMessage('User Deleted')
    }


    return (
        <div className='usersParent parent'>
            {/* <Adduser /> */}
        <h2>Users</h2>
            {

                users?.map((user, key) =>(
                    <div className="users" key={key}>
                        {
                            userId === user.id && userClass === 'admin' &&
                            <>
                            <b>*</b>
                            <h3>{(user.firstName).toUpperCase()} {(user.lastName).toUpperCase()}</h3>
                            <p>Admin</p>
                            </>
                        }
                      
                    </div>
                ))
            }
             {
                users?.map((user, key) =>(
                    <div className="users" key={key}>
                        {
                            userId === user.id && userClass === 'admin' ? '' :
                            <>
                        <b>{ i ++}.</b>
                        <h3>{(user.firstName).toUpperCase()} {(user.lastName).toUpperCase()}</h3>

                             {
                                 userClass === 'admin' && 
                                 
                                 <button onClick={() => {deleteUser(user.id, (user.firstName+'_'+user.lastName))
                                }}>Delete</button>
                                 
                            }
                            </>
                        }
                    </div>
                ))
            }
        </div>
    )
}


