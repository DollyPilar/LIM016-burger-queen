import React, { useState } from 'react';
import { addDoc, collection} from 'firebase/firestore';
import { auth, db, storage } from '../../../firebase/firebase-config';
import { ref, uploadBytes, getDownloadURL} from  'firebase/storage';



export const AddProducts =()=>{

    const [productPhoto, setProductPhoto] = useState("")
    const [productName, setProductName]=useState("")
    const [productPrice, setProductPrice]=useState("")
    const [productType, setProductType]=useState("")


    const subirFile =async(e)=>{
        const file=e.files[0];
        const name=file.name
        const fotoRef = ref(storage, name)

        try{
        await uploadBytes(fotoRef, file)
        }

        catch(e){
        console.log(e)
        }
        getDownloadURL(fotoRef).then((URL)=>{
            setProductPhoto(URL)
        }).catch((e)=>console.log(e))
    }
    const addProducts = async (e)=>{
        e.preventDefault()
        const colRef = collection(db, 'products');
      await addDoc(colRef, {
    Nombre: productName,
    Precio: productPrice,
    Tipo: productType,
    Img: productPhoto,
  });
    }

    return(
        <React.Fragment>
            <form onSubmit={addProducts}>
                <div>
                    <input 
                    type="text"
                    placeholder="Name"
                    name='name'
                    onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                    ></input>
                </div>
                <div>
                    <input 
                    type="text"
                    placeholder="Precio"
                    name='precio'
                    onChange={(e) => {
                        setProductPrice(e.target.value);
                      }}
                    ></input>
                    
                </div>
                <div>
                    <input 
                    type="text"
                    placeholder="Tipo"
                    name='tipo'
                    onChange={(e) => {
                        setProductType(e.target.value);
                      }}
                    ></input>
                </div>
                <div>
                    <input 
                    type="file"
                    placeholder="Imagen"
                    name='imagen'
                    onChange={(e) => {
                        subirFile(e.target);
                      }}
                    ></input>
                    <button type='submit'>Enviar </button>
                </div>
            </form>
        </React.Fragment>
    )
}

