
import { createContext, useState } from "react";
import { app } from "../firebase.init";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {
 const [loading, setLoading] = useState(true);
const [user, setUser] = useState(null);
      const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }                        
      const info={
       createUser,
       setUser,
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