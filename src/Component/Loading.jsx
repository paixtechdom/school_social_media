import { useContext } from 'react'
import { AppContext } from '../App'
import './Loading.css'

export const Loading = () =>{

    const {loading} = useContext(AppContext)

    if(loading){
        return(
            <div className="loading">
                <div className="spinner">
                    <div className="spin"></div>
                </div>
            </div>
        )
    }

}