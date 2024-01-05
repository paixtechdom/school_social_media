import { useContext } from "react"
import { AppContext } from "../../App"
import './Load.css'

export const Load = () =>{
    const { load, dbLocation } = useContext(AppContext)

    if(load == 'Deleting' || load == 'Uploading'){
        return(
            <div className="load inload">
                <img  src={`${dbLocation}/images/logo.png`}/>                
                <h2>{load}...</h2>
            </div>
        )
    }
    // if(load == 'Uploading'){
    //     return(
    //         <div className="load inload">
    //             <img  src={`${dbLocation}/images/logo.jpg`}/>                
    //             <p>Uploading...</p>
    //         </div>
    //     )
    // }
     
}