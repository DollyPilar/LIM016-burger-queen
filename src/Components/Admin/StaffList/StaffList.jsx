import React, { useState, useEffect } from "react";
// import { IndividualStaffCard } from "./IndividualStaffCard.jsx";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config.jsx";
// import { FaPlusCircle } from "react-icons/fa";
import "./StaffList.css";

export const StaffList = () => {
  const [staffs, setStaffs] = useState([]);

  const getStaffs = () => {
    const staffMembers = [];
    const collRef = collection(db, "users");
    const order = query(collRef, where("Tienda", "==", "Happy Paws"));
    onSnapshot(order, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.ID = doc.id;
        staffMembers.push(data);
      });
    });
    return staffMembers;
  };
  useEffect(() => {
    const st = getStaffs();

    setStaffs(st);
  }, []);

  //   if (staff.length > 0) {
  //console.log(staffs);
  //   }
  //   else {
  //     console.log("no hay");
  //   }
  return (
    <React.Fragment>
      <div className="staffContainer">
        {/* <div className="firstRowStaff">
          <h3 className="cardStaffName">Nombre</h3>
          <h3 className="cardStaffEmail">Email</h3>
          <h3 className="cardStaffRol">Rol</h3>
        </div> */}
        <div>
          {staffs.length > 0 && (
            <div className="firstRowStaff">
              {staffs.map((staff, index) => (
                <div className="IndividualStaffCard" key={index}>
                  <h3 className="staffInfo">{staff.name}</h3>
                  <h3 className="staffInfo">{staff.email}</h3>
                  <h3 className="staffInfo">{staff.rol}</h3>
                </div>
              ))}
            </div>
          )}
        </div>

        {staffs.length < 1 && <p>no hay</p>}
      </div>
    </React.Fragment>
  );
};
