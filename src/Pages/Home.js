import React, { useEffect, useState } from "react";
import {getDocs,collection,deleteDoc,doc} from "firebase/firestore"
import {db,auth} from '../config/firebase'

function Home({isAuth}){
    const [postLists,setLists]=useState([]);
    const postsCollectionRef=collection(db,"posts");
    useEffect(()=>{
      const getpost =async()=>{
        const data =await getDocs(postsCollectionRef)
        setLists(data.docs.map((doc)=>({...doc.data(),id:doc.id })))
      }  
      getpost();
    })
    const deletePost = async (id) => {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
    };
    return (
        <div className="homePage">{postLists.map((post)=>{
          return(
          <div className="post">
            <div className="postHeader">
              <div className="title"><h1>{post.title}</h1></div>
              <div className="deletePost">
                {isAuth && post.author.id===auth.currentUser.uid && <button onClick={()=>{deletePost(post.id)}} >&#128465;</button>}
              </div>
            </div>
            <div className="postTextContainer">
              {post.postText}
            </div>
          </div>
          );
        })}</div>
    );
}
export default Home;