import React from 'react';
import img0 from '../assets/img/juego/img0.png';
import img1 from '../assets/img/juego/img1.png';
import img2 from '../assets/img/juego/img2.png';
import img3 from '../assets/img/juego/img3.png';
import img4 from '../assets/img/juego/img4.png';
import img5 from '../assets/img/juego/img5.png';
import img6 from '../assets/img/juego/img6.png';
import img7 from '../assets/img/juego/img7.png';

import '../assets/css/Imagenes.css';

export default function Imagenes(props) {
    const arregloImagenes = [img0, img1, img2, img3, img4, img5, img6, img7];
    return (
        <>
            <div className="contenedor">
                <img className="img-ahorcado" src={arregloImagenes[props.i]} />
            </div>
            <span className="badge bg-danger label">Intentos restantes: {(arregloImagenes.length-(props.i+1))}</span>
        </>
    );
}