import React from 'react';
import { useNavigate } from "react-router-dom";
import {signOut} from 'firebase/auth';
import { auth } from '../../firebase-config';
import Dog from "./dog.jsx";
import Cat from "./cats.jsx";

function Product(){
let navigate = useNavigate();
const logOut = () => {
signOut(auth)
 navigate("/")
}
return (
    <React.Fragment>
    <div>Lista de productos</div> 
    <button>dogs</button>
    <Dog/>
    <button>cats</button>
    <Cat/>
    <button onClick={logOut}>cerrar sesión</button>
    </React.Fragment>
    )
}


export default Product