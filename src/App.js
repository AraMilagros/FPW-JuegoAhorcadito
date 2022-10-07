import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Juego from './pages/Juego';
function App() {
    return (
        <div className="container">
            <Juego/>
        </div>
    );

}

export default App;