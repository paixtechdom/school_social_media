import { useContext, useEffect } from 'react'
import { AppContext } from '../App'
import './Alert.css'


export const Alert = ({alertMessage}) =>{

    return(
        <div className="alert">
            <p>
                {alertMessage}
            </p>
        </div>
    )
}