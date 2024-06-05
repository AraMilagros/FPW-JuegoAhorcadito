import React, { useEffect, useState } from 'react';

import Teclado from '../components/Teclado';//import para armar el teclado
import Imagenes from '../components/Imagenes';//las imagenes del ahorcadito se importan en otro componente y se importan aqui como array
// imports para archivos json
import palabras from '../assets/json/palabras.json';
import abecedario from '../assets/json/abecedario.json';
// imports para los efectos de sonido 
import click from '../assets/sound/click.wav';
import error from '../assets/sound/error.wav';
import gameover from '../assets/sound/gameover.wav';
import win from '../assets/sound/win.wav';
// css para los estilos
import '../assets/css/Juego.css';

let arrayPalabra = new Array(0);//Array que contendrá la palabra que se generara automaticamente
let arrayPista = new Array(0);//Array que contendrá _ del tamaño de la palabra que se generó

let cont = 0; //contador para controlar las veces que el usuario puede equivocarse
export default function Juego() {

    const [palabra, setPalabra] = useState("");//contendrá la palabra que se tiene que adivinar
    const [pista, setPista] = useState("");//contendrá los guiones que representa la palabra que se tiene que adivinar
    const [jugar, setJugar] = useState(false);//sirve para saber si el usuario quiere volver a jugar
    const [contador, setContador] = useState(0);//llevara el control de la cantidad de errores que el usuario puede cometer

    const verificar = (event) => {
        let letra = event.target.textContent;//se captura la letra que el usuario acaba de clickear
        play(click);//se reproduce el efecto de sonido de click

        if (arrayPalabra.includes(letra)) {//se pregunta si la letra está dentro del array que contiene la palabra a adivinar
            for (let index = 0; index < arrayPalabra.length; index++) {
                //si la letra esta en la palabra se pasa a comparar cada letra hasta que haya coincidencia 
                // y entonces se añadira la letra en el array que solo contiene guiones
                if (arrayPalabra[index] == letra) {
                    arrayPista[index] = letra;
                }
            }

            //Aqui se setea para que el usuario pueda ver el lugar en donde estan las letras que adivino
            setPista(arrayPista.join(''));
        } else {
            //en caso de errar, el contador ira aumentando y tambien se reproduce un efecto de sonido que marca el error
            if (cont == 6) {
                // console.log("array en si: "+arrayPalabra);
                // console.log("array incluye: "+arrayPalabra.includes('_'));
                //Aqui se controla lo contrario...
                //en caso de que el contador llegue a su limite (Que es la cantidad de imagenes que se tiene del ahorcadito)
                //se pasa a deshabilitar todo el teclado evitando que el usuario pueda clickear y ademas se reproduce un efecto
                //de sonido que inidica que se perdio la partida, ademas de que se setea pista con la palabra generada para que 
                //el usuario pueda ver cuál era la palabra que tenía que adivinar

                if (arrayPista.includes("_ ")) {
                    deshabilitarTeclado();
                    setPista(palabra);
                    play(gameover);
                    setContador(7);
                }

            } else {
                cont++;
                setContador(cont);
                play(error);
            }

        }

        //Aqui recorremos el json para poder deshabilitar el btn que acaba de clickear en caso
        // de que la letra estuviera presente en la palabra a adivinar
        for (let index = 0; index < abecedario.length; index++) {
            if (abecedario[index].Letra == letra) {
                abecedario[index].Estado = true;
            }
        }

        //Aqui se hace un control para saber cuándo el usuario ya ha adivinado toda la palabra
        //en caso de ya no exista letras para adivinar, se reproduce un efecto de sonido que lo señala
        //al igual que tambien se deshabilitara el teclado por no haber más letras que adivinar
        if (!arrayPista.includes("_ ")) {
            play(win);
            deshabilitarTeclado();
        }

    }//fin de metodo verificar

    //Aqui se asigna la palabra que el usuario tendra que adivinar
    useEffect(() => {
       
        const json = Math.floor(Math.random() * palabras.length);//se genera el indice para traer x palabra del diccionario
        const palabraAzar = palabras[json];//se guarda el elemento de palabras.json
        arrayPalabra = Array.from(palabraAzar["Palabra"]);//la palabra que se guardo se lo guarda como array en ArrayPalabras
        
        arrayPista = new Array(arrayPalabra.length).fill('_ ');//y ese array se utiliza para llenar arrayPista con guiones
        setPista(arrayPista.join(''));
        setPalabra(arrayPalabra.join(''));
        habilitarTeclado();//en caso de haber jugado enteriormente, se habilitara los btn para que se pueda volver a jugar
        cont = 0;
        setContador(cont);
        setJugar(false);
    }, [jugar]);

    // consumir api para obtener palabras al azar
    // function getApi() {
    //     const urlApi = "https://clientes.api.greenborn.com.ar/public-random-word";

    //     fetch(urlApi)
    //         .then(res => res.json())
    //         .then(response => {
    //             console.log(response[0]);
    //             return arrayPalabra = Array.from(response[0]);
                
    //         })
    // }

    const habilitarTeclado = () => {
        for (let index = 0; index < abecedario.length; index++) {
            abecedario[index].Estado = false;
        }
    }
    const deshabilitarTeclado = () => {
        for (let index = 0; index < abecedario.length; index++) {
            abecedario[index].Estado = true;
        }
    }

    return (
        <>
            <div className="container">
                <div className="contenedor1">
                    <div className="cont1 img">
                        {<Imagenes i={contador} />}
                    </div>
                    <div className="cont1 pistaPalabra">
                        <h2>{pista}</h2>
                    </div>
                </div>

                <div className="contenedor2">
                    <div className="teclado">
                        {abecedario.map((item, index) => (
                            <Teclado key={index} id={item.Letra} metodo={verificar} letra={item.Letra} estado={item.Estado} />
                        ))}
                    </div>
                    <button className="btn btn-danger repetir" onClick={() => { setJugar(true), play(click); }}>JUGAR DE NUEVO</button>
                </div>
            </div>

        </>
    );
}

function play(sonido) {
    new Audio(sonido).play();
}