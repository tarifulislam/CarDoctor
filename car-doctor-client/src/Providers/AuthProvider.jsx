import { createContext, useEffect, useState } from "react";
import auth from './../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";


export const AuthContext = createContext(null)


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const createUser = (email, password)=> {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }



    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, createUser => {
            const userEmail = createUser?.email || user?.email;
            const loggedUser = {email : userEmail}
            setUser(createUser)
            setLoading(false)
            console.log("observeing current user", createUser);
            // if user exists then issue a token  ----------------
            if(createUser){

                axios.post('http://localhost:5000/jwt',loggedUser, {withCredentials: true})
                .then(res => {
                    console.log("check token respons -- ",res.data);
                })
            }
            else{
                axios.post('http://localhost:5000/logout', loggedUser, {withCredentials: true})
                .then(res => {
                    console.log("logout respons -- ",res.data);
                })
            }
        });
        return () => {
            unSubscribe()
        }
    },[])


    const authInfo = {user, loading, createUser, signInUser, logOut}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;