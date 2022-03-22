import React, { createContext, useContext, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-config.jsx";

export const rolContext = createContext();

export const useRol = () => {
  const context = useContext(rolContext);
  if (!context) throw new Error("There is not Provider");
  return context;
};

export function RolProvider({ children }) {
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const getRols = async () => {
      const collRef = collection(db, "users");
      try {
        const allColl = await getDocs(collRef);
        const rolsArray = [];
        allColl.forEach((doc) => {
          let data = doc.data().rol;
          rolsArray.push(data);
        });
        setRol(rolsArray);
      } catch (e) {
        console.log(e);
      }
    };
    getRols();
  }, []);
  //   console.log(rol);

  return (
    <rolContext.Provider
      value={{
        rol,
      }}
    >
      {children}
    </rolContext.Provider>
  );
}
