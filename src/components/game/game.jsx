import './game.css'
import { useState, useRef} from 'react';
import Info from './InfoPanel';
import Field from './Field';
import End from './End';
import { toast, ToastContainer } from 'react-toastify';

export default function Game({stateScreen, gameRule, startTime}) {
    const initialArray = Array(gameRule.n).fill(0);
    const [fieldState, setfieldState] = useState(initialArray);
    const [move, setMove] = useState(1);
    const [win, setWin] = useState(undefined);
    const updateElement = (index, value) => {
        setfieldState(prev => {
            const newArray = [...prev];
            newArray[index] = value;
            return newArray;
        });
    };
    const countMove = useRef(0);
    const handleMove = () => {
        countMove.current += 1;
    };
    const gameState = {fieldState, setfieldState, updateElement, move, setMove, stateScreen}
    return (
        <div className="split-container">
            {win != undefined && <End name = {win} setWin = {setWin} gameRule = {gameRule} gameState = {gameState} countMove = {countMove} startTime = {startTime} />}
            <div className="left-panel">
                <Info gameRule = {gameRule} gameState = {gameState} setWin = {setWin} countMove = {handleMove}/>
            </div>
            <div className="right-panel">
                <Field gameRule = {gameRule} gameState = {{fieldState, updateElement, move, setMove, stateScreen}}/>
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
