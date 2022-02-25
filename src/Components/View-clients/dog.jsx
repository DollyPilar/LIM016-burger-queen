import React from 'react';
import dogExam from '../../img/dogExam.jpg'

function DogProducts(){
    return(
        <React.Fragment>
            <div>Lista productos de perros</div>
            <img src={dogExam} alt="" />

        </React.Fragment>

    )
}

export default DogProducts