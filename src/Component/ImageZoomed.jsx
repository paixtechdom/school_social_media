import { useContext } from "react"
import { AppContext } from "../App"
import './ImageZoomed.css'
export const ImageZoomed = () => {
    const { imageZoom, setImageZoom, setZoomImageTitle, zoomImageTitle, dbLocation } = useContext(AppContext)
    
    return (
        <div className="imageZoomed">
            <p onClick={() => {
                setImageZoom(false)
                setZoomImageTitle('')
            }}>⨉</p>
            <img src={`${dbLocation}/images/${zoomImageTitle}`} alt="" />
        </div>
    )
}