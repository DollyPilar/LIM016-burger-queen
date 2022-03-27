import React, { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaDollarSign,
  FaDollyFlatbed,
  // FaRegIdCard,
  // FaRegChartBar,
  // FaStore,
  // FaPaw,
} from "react-icons/fa";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config.jsx";
// import { LowNavBar } from "../HomePage/NavBar/NavBarEmployees/LowNavBar.jsx";
import "./AdminHome.css";
import admin from "../../../assets/admin.png";

function AdminHome() {
  const [products, setProducts] = useState([]);
  // función que trae los productos
  const getProducts = async () => {
    const collRef = collection(db, "compras");
    try {
      const allColl = await getDocs(collRef);
      const productsArray = [];

      allColl.forEach((doc) => {
        let data = doc.data();
        data.ID = doc.id;
        productsArray.push(data);
      });
      setProducts(productsArray);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  let totalPrice;
  let totalClients;
  let orders;
  if (products.length > 0) {
    orders = products.length;
    const prices = products.map((pro) => pro.finalProducts.finalPrice);
    totalPrice = prices.reduce((acc, cur) => acc + cur, 0);
    const clients = products.map((pro) => pro.finalProducts.buyerName);
    totalClients = [...new Set(clients)].length;
  }

  return (
    <React.Fragment>
      {/* <h2 className="titleAdmin">Reporte Semanal</h2> */}
      <div className="statisticsContainer">
        <div className="statisticCard">
          <p className="statisticInfo">Total de clientes</p>
          <div className="secondRow">
            <FaUserFriends className="adminIcon" />
            <p className="statisticInfo">{totalClients}</p>
          </div>
        </div>
        <div className="statisticCard">
          <p className="statisticInfo">Ventas totales</p>
          <div className="secondRow">
            <FaDollarSign className="adminIcon" />
            <p className="statisticInfo">{totalPrice}</p>
          </div>
        </div>
        <div className="statisticCard">
          <p className="statisticInfo">Pedidos totales</p>
          <div className="secondRow">
            <FaDollyFlatbed className="adminIcon" />
            <p className="statisticInfo">{orders}</p>
          </div>
        </div>
      </div>
      <div className="adminImgContainer">
        <img src={admin} alt="logo" className="adminImg" />
      </div>
    </React.Fragment>
  );
}
export default AdminHome;
