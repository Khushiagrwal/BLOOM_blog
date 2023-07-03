import React from "react";
import {auth,provider} from "../config/firebase"
import {signInWithPopup} from "firebase/auth";
import { useNavigate} from "react-router-dom";

function Login({setIsAuth}){
    let navigate=useNavigate();

    const signInWithGoogle=()=>{
        signInWithPopup(auth,provider).then((res)=>{
            localStorage.setItem("isAuth",true);
            setIsAuth(true);
            navigate("/");
        })
    }
    return (
        <div className="loginPage">
            <p>Sign In With Google  </p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}> Sign In with Google</button>
        </div>
        );
}
export default Login;