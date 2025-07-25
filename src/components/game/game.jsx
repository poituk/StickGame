import './game.css'
import { useState, useRef} from 'react';
import Info from './infopanel';
import Field from './field';
import End from './end';
import { toast, ToastContainer } from 'react-toastify';

export default function Game({stateScreen, gameRule, starttime}) {
    const initialArray = Array(gameRule.n).fill(0);
    const [FieldState, setFieldState] = useState(initialArray);
    const [move, setMove] = useState(1);
    const [win, setWin] = useState(undefined);
    const updateElement = (index, value) => {
        setFieldState(prev => {
            const newArray = [...prev];
            newArray[index] = value;
            return newArray;
        });
    };
    const countmove = useRef(0);
    const handleMove = () => {
        countmove.current += 1;
    };
    const gameState = {FieldState, setFieldState, updateElement, move, setMove, stateScreen}
    return (
        <div className="split-container">
            {win != undefined && <End name = {win} setWin = {setWin} gameRule = {gameRule} gameState = {gameState} countmove = {countmove} starttime = {starttime} />}
            <div className="left-panel">
                <Info gameRule = {gameRule} GameState = {gameState} setWin = {setWin} countmove = {handleMove}/>
            </div>
            <div className="right-panel">
                <Field gameRule = {gameRule} GameState = {{FieldState, updateElement, move, setMove, stateScreen}}/>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
