import React from "react";
import { useAuth } from "../../../Route/AuthContext.jsx";
import { db } from "../../../../firebase/firebase-config.jsx";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import { ButtonCancel } from "../../../../Globals/Buttons/ButtonCancel/ButtonCancel.jsx";

export const ButtonCancelShop = () => {
  const { user } = useAuth();
  // console.log(user.uid);
  const deleteShop = async () => {
    const q = collection(db, "cart" + user.uid);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docc) => {
      const docId = docc.id;
      const prodRef = doc(db, "cart" + user.uid, docId);
      deleteDoc(prodRef);
    });
  };
  const handleDelete = () => {
    Swal.fire({
      title: "¿Está seguro de que desea eliminar tu compra?",
      showCancelButton: true,
      confirmButtonColor: "#FFFFFF",
      cancelButtonColor: "#bb53f3",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteShop();
      }
    });
  };

  return (
    <React.Fragment>
      <ButtonCancel onClick={handleDelete} name="Cancelar" />
    </React.Fragment>
  );
};
