import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {signOut, onAuthStateChanged} from 'firebase/auth';
import { auth } from '../../firebase/firebase-config.jsx';
import Dog from "./dog.jsx";
import Cat from "./cats.jsx";

function Product(){
let navigate = useNavigate();
const [show, setShow] = useState(true);

const [ createUser, setCreateUser] = useState('');


useEffect(()=>{
    onAuthStateChanged(auth,(user) => {
        setCreateUser(user.uid);
})
})
console.log('el uid del ususario'+ createUser)

const logOut = () => {
signOut(auth)
 navigate("/")
}

return (
    <React.Fragment>
    <div>Lista de productos</div> 
    <div className='btnContainer'>

    <button className = 'btnDog' onClick={() => setShow(true)}>dogs</button>
    
    <button onClick={() => setShow(false)}>cats</button>

    </div>
    {
     show ? <Dog/>: <Cat/> 
      
    }

<p>Nombre del cliente: </p>
{/* <p>{createUser}</p> */}
{/* {
    <p>{createUser && {createUser}}</p>
} */}



   
    <button onClick={logOut}>cerrar sesión</button>
    </React.Fragment>
    )
}


export default Product