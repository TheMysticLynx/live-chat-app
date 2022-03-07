import React, { useEffect } from "react";
import './Login.scss'
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../Redux/store";
import { useAuth } from "../Hooks/AuthHooks";

function Login() {
    let navigation = useNavigate();
    let user = useAuth();

    useEffect(() => {
        if (user) {
            navigation('/')
        }
    }, [user]);


    return (
        <div className="Login">
            <div className="content">
                <div>
                    <h1>Login</h1>
                    <p>Please login to access page services.</p>
                </div>

                <button onClick={ () => {
                    let auth = getAuth();
                    signInWithPopup(auth, new GoogleAuthProvider());
                }}>Sign In With Google</button>
            </div>
        </div>
    )
}

export default Login;