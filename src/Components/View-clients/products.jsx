import React from 'react';
import { useNavigate } from "react-router-dom";
import {signOut
} from 'firebase/auth';
import { auth } from '../../firebase-config';
function Product(){
let navigate = useNavigate();
const logOut = () => {
signOut(auth)
 navigate("/")
}
return (
    <React.Fragment>
    <div>Lista de productos</div>
    <button onClick={logOut}>CERRAR SESIÓN</button>
    </React.Fragment>
    )
}


export default Product