import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config.jsx";

import "./StaffList.css";

export const StaffList = () => {
  const [staffs, setStaffs] = useState([]);

  // función que trae los productos
  const getStaffs = async () => {
    const collRef = collection(db, "users");
    try {
      const allColl = await getDocs(collRef);
      const staffsArray = [];

      allColl.forEach((doc) => {
        let data = doc.data();
        data.ID = doc.id;
        staffsArray.push(data);
      });
      setStaffs(staffsArray);
    } catch (e) {
      console.log(e);
    }
  };
  //console.log(products);

  useEffect(() => {
    getStaffs();
  }, []);

  // if (staffs.length > 0) {
  //   staffs.map((staff) => console.log("f" + staff.name));
  // }
  //   else {
  //     console.log("no hay");
  //   }
  return (
    <React.Fragment>
      <div className="staffContainer">
        {staffs.length > 0 && (
          <table className="staffTable">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            {staffs.map((staff, index) => (
              <tbody key={index}>
                <tr>
                  <td>{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>{staff.rol}</td>
                </tr>
              </tbody>
            ))}
          </table>
        )}

        {staffs.length < 1 && <p>no hay</p>}
      </div>
    </React.Fragment>
  );
};
