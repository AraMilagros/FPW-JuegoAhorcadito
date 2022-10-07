import React from 'react';

export default function Teclado(props){
    return(
        <>
            <button className="btn btn-primary" id={props.letra} onClick={props.metodo} disabled={props.estado}>{props.letra}</button>
        </>
    );
}