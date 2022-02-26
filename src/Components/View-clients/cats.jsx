import React from 'react';
import catExam from '../../img/catExam.jpg'

function CatProducts(){
    return(
  
        <React.Fragment>
              <div>Lista productos de gatos</div>
        <img src={catExam} alt="" />
        <button >arbol</button>
            <button >pluma</button>
            <button >rascadero</button>

    </React.Fragment>

    )
}

export default CatProducts