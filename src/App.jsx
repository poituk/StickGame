import { useState } from 'react';
import Menu from './components/menu/menu';
import Setings from './components/menu/setings';
import Game from './components/game/game';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState('menu'); // menu, settings, game
    let content
    const [gameRule, setgameRule] = useState({});
    if (currentScreen == "menu"){
        content = <Menu stateScreen = {setCurrentScreen}/>
    }
    if (currentScreen == "setings"){
        content = <Setings stateScreen = {setCurrentScreen} setgameRule = {setgameRule} />
    }
    if (currentScreen == "game") {
        content = <Game stateScreen = {setCurrentScreen} gameRule = {gameRule} starttime={Date.now()}/>
    }
    return (
        <div>
            {content}
        </div>
    );
}

