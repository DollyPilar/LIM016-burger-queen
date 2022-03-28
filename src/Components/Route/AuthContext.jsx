import React, { createContext, useContext, useEffect, useState } from "react";
import {
  //   signInWithEmailAndPassword,
  onAuthStateChanged,
  //   signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase-config.jsx";
export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not Provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // const signIn = (email, password) =>
  //   signInWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  // const logOut = () => signOut(auth);
  return (
    <authContext.Provider
      value={{
        // signIn,
        user,
        //  logOut
      }}
    >
      {children}
    </authContext.Provider>
  );
}
