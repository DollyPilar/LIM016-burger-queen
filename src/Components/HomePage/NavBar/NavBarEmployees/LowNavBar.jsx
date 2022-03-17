import React, {Fragment} from "react";
import { useNavigate } from "react-router-dom";

import "./LowNavBar.css"

export const LowNavBar = () =>{
    const navigate =useNavigate(); 
const addProducts = ()=>{
    navigate("/AddProducts");
}
const goAdminHome = () =>{
    navigate("/Admin")
}

    return (
        <Fragment>
            <div className="lowBarAdmin">
                <h3 className="lowBarInfo" onClick={goAdminHome}>Home</h3>
                <h3 className="lowBarInfo">Empleados</h3>
                <h3 className="lowBarInfo" onClick={addProducts}>Productos</h3>
                <h3 className="lowBarInfo">Pedidos</h3>
            </div>
        </Fragment>
    )
}