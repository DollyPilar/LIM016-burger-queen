import React from "react";
import { auth, db } from "../../../../firebase/firebase-config";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import "./Button.css";

export const ButtonCancel = () => {
  const handleDelete = async () => {
    const q = collection(db, "cart" + auth.currentUser.uid);

    const querySnapshot = await getDocs(q);
    // const deleteOps = [];

    querySnapshot.forEach((docc) => {
      const docId = docc.id;
      // console.log(docId);
      const prodRef = doc(db, "cart" + auth.currentUser.uid, docId);

      //   // let data = doc.data();
      deleteDoc(prodRef);
      //   docId = doc.id;
      //    deleteDoc(prodRef);
      // console.log("te debes eliminar");
    });
  };
  return (
    <React.Fragment>
      <button className="btnCancel" onClick={handleDelete}>
        {" "}
        Cancelar
      </button>
    </React.Fragment>
  );
};
