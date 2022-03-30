import React from "react";
import { db } from "../../../../firebase/firebase-config.jsx";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { ButtonAccept } from "../../../../Globals/Buttons/ButtonAccept/ButtonAccept.jsx";
import { useAuth } from "../../../Route/AuthContext.jsx";

export const ButtonShop = ({
  cartProducts,
  userName,
  totalQty,
  totalPrice,
}) => {
  const { user } = useAuth();
  const createShoppingColl = async () => {
    const finalProducts = {
      buyerID: user.uid,
      shoppingState: "Pedido a preparar",
      buyerName: userName,
      dateOfShopping: Date.now(),
      finalQuantity: totalQty,
      finalPrice: totalPrice,
      productsInformation: cartProducts,
    };

    try {
      await addDoc(collection(db, "compras"), {
        finalProducts,
      });
      Swal.fire({
        position: "top",
        icon: "success",
        iconColor: "#ce73ff",
        toast: true,
        title: "Compra realizada",
        width: "23rem",
        showConfirmButton: false,
        timer: 2500,
      });
      const q = collection(db, "cart" + user.uid);

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docc) => {
        const docId = docc.id;
        const prodRef = doc(db, "cart" + user.uid, docId);
        deleteDoc(prodRef);
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <React.Fragment>
      <ButtonAccept onClick={createShoppingColl} name="Comprar" />
    </React.Fragment>
  );
};
