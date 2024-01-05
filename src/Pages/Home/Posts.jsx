import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { AppContext } from "../../App"
import { Comments } from "./Comments"
import { Like } from "./Like"
import { LikeNo } from "./LikeNo"
import { Addpost } from "../../Component/Addpost"
import { CommentInfo } from "./CommentInfo"
import { CommentSpan } from "./CommentSpan"
import { PostUserProfilePics } from "./postUserProfilePics"

export const Posts = () =>{
    
    const { userName, setZoomImageTitle, setImageZoom, setAlert, setAlertMessage, setShowLikeInfo, setShowComments, setCommentType, setPostType, posts, getPosts, dbLocation, showComments, setShowH, setLoad, setShow } = useContext(AppContext)



    useEffect(()=>{
        setPostType('post')
    }, [])




    const deletePost = async (id, image) =>{
        if(image.length > 0){
            await axios.post(`${dbLocation}/post.php/${id}/${image}`)
        }else{
            await axios.post(`${dbLocation}/post.php/${id}`, id)
        }
        
            setAlert(true)
            setShowH('')
            setShow('')
            setLoad('Deleting')
            setTimeout(() => {
                setAlert(false)
                setShowH('posts')
                setShow('posts')
                setLoad('false')
            }, 2000);
            getPosts()
            setAlertMessage('Post Deleted')
        
        
    }





    return(
        <div>

           <div className="poNoParent">
           <h2>Add Post</h2>
            <Addpost />

           {
                posts?.map((post, key) =>(
                    <div className="postParent" key={key}>
                        <div className="poNo">
                            <div className="postUserInfo">
                                <div className="postImg">
                                <PostUserProfilePics userId={post.userId}/>
                                
                                </div>
                                <p>

                                    <i>{
                                        post.userName == userName ? 'You' : post.userName
                                    }</i> <br />
                                    <i>{
                                        post.createdAt
                                    }</i>
                                </p>
                            </div>
                            <h3>{post.postTitle}</h3>
                            <p>{post.postContent}</p>
                           
                            <img src={`${dbLocation}/images/${post.image}`} alt="" className="image" 
                            onClick={() => {
                                setImageZoom(true)
                                setZoomImageTitle(post.image)
                            }}
                            />
                            <div className="LikeNo">
                                <p onClick={() => {setShowLikeInfo(post.id)
                                 }}>
                                 <LikeNo likeType={'like'}  postId={post.id} postType={'post'} /> 
                                </p>
                                <p>
                                <CommentInfo commentType={'post'} postId={post.id}/>
                                </p>
                            </div>
                            
                           
                            
                            <div className="poNoButtons">
                           <Like likeType={'like'} userName={userName} postId={post.id} postType={'post'}/>
 
                            <button className="commentButton" onClick={()=> { 
                                setShowComments(showComments == post.id ? '' : post.id) 
                                setCommentType('post')
                            }}><i className="fa fa-comments"></i>
                            <CommentSpan postId={post.id}/>
                            </button>
                            {
                                post.userName == userName &&
                                <button className="commentButton delete" onClick={() => deletePost(post.id, post.image)}>
                                    <i className="fa fa-remove"></i>
                                    <span>Delete</span>
                                </button>
                            }
                            </div>
                        </div>
                        
                        <Comments postId={post.id} userName={userName} postTitle={post.postTitle} type={'post'}/>
                        
                    </div>
                ))
            }
            </div>
        </div>
    )
}