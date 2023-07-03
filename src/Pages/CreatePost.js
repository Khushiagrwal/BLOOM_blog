import React, { useState ,useEffect} from "react";
import { addDoc,collection } from "firebase/firestore";
import {db,auth} from "../config/firebase"
import { useNavigate } from "react-router-dom";

function CreatePost({isAuth}){

    const[title,setTitle]=useState("");
    const[postText,setPostText]=useState("");

    let navigate=useNavigate();
    const postsCollectionRef=collection(db,"posts");
    
    const createPost=async()=>{
        await addDoc(postsCollectionRef,{title,postText,author:{name:auth.currentUser.displayName,id:auth.currentUser.uid},});
        navigate("/");
    }
    useEffect(()=>{
        if(!isAuth)
            navigate("/login")
    },[]);
    return (
        <div className="createPostPage"> 
            <div className="cpContainer">
                <h1>Create A Post</h1>
                <div className="inputGp">
                    <label>Title :</label>
                    <input type="text" placeholder="Title..." onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div className="inputGp">
                    <label htmlFor="">Post</label>
                    <textarea placeholder="Post..." onChange={(e)=>{setPostText(e.target.value)}} ></textarea>
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
        );
}
export default CreatePost;