import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {signOut, onAuthStateChanged} from 'firebase/auth';
import { auth, db } from '../../firebase/firebase-config.jsx';
import Dog from "./dog.jsx";
import Cat from "./cats.jsx";
import {doc, getDoc} from 'firebase/firestore';
function Product(){
let navigate = useNavigate();
const [show, setShow] = useState(true);

const [ userName, setuserName] = useState('');

onAuthStateChanged(auth, async (user) => {
    if(user){
const userUID = user.uid;
const docRef = doc(db, "users", userUID);
const docSnap = await getDoc(docRef);
         //console.log (docSnap.doc.data())
const userInfo = docSnap.data();
setuserName(userInfo.name)

    }
})




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
<p>{userName}</p>
{/* {
    <p>{createUser && {createUser}}</p>
} */}



   
    <button onClick={logOut}>cerrar sesión</button>
    </React.Fragment>
    )
}


export default Product