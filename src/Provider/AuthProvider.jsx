
import {  useEffect, useState } from "react";
import { app } from "../firebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged,signInWithPopup,GoogleAuthProvider, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "./AuthContext";
 
const auth = getAuth(app);
const AuthProvider = ({children}) => {
 const [loading, setLoading] = useState(true);
const [user, setUser] = useState(null);
const googleProvider = new GoogleAuthProvider();

//signIn
      const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }           
    
    //google SignIn
     const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //set current user
   useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [])

      const info={
       createUser,
       googleSignIn,
       setUser,
       signIn,
       loading,
       user
      }

  return (
  <AuthContext.Provider value={info}>
      {children}                                                                                 
  </AuthContext.Provider>
   );
};

export default AuthProvider;