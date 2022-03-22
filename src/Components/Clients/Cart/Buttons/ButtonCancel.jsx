import React from "react";
// import { auth, db } from "../../../../firebase/firebase-config";
// import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import { ButtonCancel } from "../../../../Globals/Buttons/ButtonCancel/ButtonCancel.jsx";

export const ButtonCancelShop = () => {
  const handleDelete = () => {
    //     const q = collection(db, "cart" + auth.currentUser.uid);
    //     const querySnapshot = getDocs(q);
    //     querySnapshot.forEach((docc) => {

    //           const docId = docc.id;
    //       const prodRef = doc(db, "cart" + auth.currentUser.uid, docId);
    //       deleteDoc(prodRef)

    // });
    Swal.fire({
      title: "¿Está seguro de que desea eliminar tu compra?",
      showCancelButton: true,
      confirmButtonColor: "#FFFFFF",
      cancelButtonColor: "#bb53f3",
      confirmButtonText: "Ok",
    });
    // .then((result) => {
    //   if (result.isConfirmed) {  }
    // });
  };

  return (
    <React.Fragment>
      <ButtonCancel onClick={handleDelete} name="Cancelar" />
    </React.Fragment>
  );
};
