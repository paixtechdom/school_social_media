import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"

export const Gallery = () =>{
    const { setImageZoom, setZoomImageTitle, dbLocation, posts } = useContext(AppContext)

 



    return (
        <div className="galleryParent parent">
            <h2>Gallery</h2>
            <div className="gallery" >
            {
                posts?.map((post, key) =>(
                    post.image != '' &&
                    <div key={key} className="imageParent">

                        <img src={`${dbLocation}/images/${post.image}`} alt="" className="image" key={key}
                        onClick={() => {
                            setImageZoom(true)
                            setZoomImageTitle(post.image)
                        }}
                        />                     
                    </div>
                        ))
            }
            </div>
        </div>
    )
}