import { useState } from 'react';
import Menu from './components/menu/Menu';
import Setings from './components/menu/Setings';
import Game from './components/game/Game';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState('menu'); 
    let content
    const [gameRule, setGameRule] = useState({});
    if (currentScreen == "menu"){
        content = <Menu stateScreen = {setCurrentScreen}/>
    }
    if (currentScreen == "setings"){
        content = <Setings stateScreen = {setCurrentScreen} setGameRule = {setGameRule} />
    }
    if (currentScreen == "game") {
        content = <Game stateScreen = {setCurrentScreen} gameRule = {gameRule} startTime={Date.now()}/>
    }
    return (
        <div>
            {content}
        </div>
    );
}

