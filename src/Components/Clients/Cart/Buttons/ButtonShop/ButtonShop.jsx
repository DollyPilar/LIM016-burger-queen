import React from "react";
import { auth, db } from "../../../../../firebase/firebase-config.jsx";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import "./ButtonShop.css";
import Swal from "sweetalert2";
export const ButtonShop = ({ cartProducts, user, totalQty, totalPrice }) => {
  //   const handleShop = async () => {
  //     console.log(totalQty, totalPrice, user, cartProducts);
  //   };
  const createShoppingColl = async () => {
    const finalProducts = {
      buyerID: auth.currentUser.uid,
      buyerName: user,
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
      const q = collection(db, "cart" + auth.currentUser.uid);

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docc) => {
        const docId = docc.id;
        const prodRef = doc(db, "cart" + auth.currentUser.uid, docId);
        deleteDoc(prodRef);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <React.Fragment>
      <button className="btnBuy" onClick={createShoppingColl}>
        {" "}
        ComprarBtn2
      </button>
    </React.Fragment>
  );
};
