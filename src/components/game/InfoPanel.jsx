import next from "./gameModule/next";
import {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
import standartBot from './gameModule/standartBot.js'
import inRowBot from './gameModule/inRowBot.js'
import specialBot from './gameModule/specialBot.js'
import { toast, ToastContainer } from "react-toastify";

function getHint(gameRule, gameState, hintAmount, setHintAmount, block){
    if (hintAmount == 0 || block == 1) return;
    setHintAmount(hintAmount - 1);
    gameState.fieldState.forEach((value, index) => {
        if (value === 2) {
            gameState.updateElement(index, 0);
            gameState.fieldState[index] = 0;
        }
    });
    let nArray;
    if(gameRule.mode == 1 || gameRule.mode == 2) nArray = standartBot([... gameState.fieldState], gameRule.l, gameRule.r);
    else if(gameRule.mode == 3 || gameRule.mode == 4) nArray = inRowBot([... gameState.fieldState], gameRule.l, gameRule.r);
    else nArray = specialBot([... gameState.fieldState], 1, 3);
    gameState.setfieldState(nArray);
    toast.success('Компьютер походил бы так', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    gameState.fieldState = nArray;
}

export default function Info({gameRule, gameState, setWin, countMove, block, setBlock}){
    if (gameRule.firstMove == 2) {
        gameRule.firstMove = 1;
        next(gameRule, gameState, setWin, countMove, setBlock);
    }
    const  listMode = ['none', 'Стандартный', 'Диапазонный', '"Рядом"', 'Комбинированный', 'Особый'];
    const moveStyle = {
        color: gameState.move === 1 ? 'rgb(50, 82, 196)' : 'rgb(204, 70, 70)',    
    };
    const activeButton = {
        "pointerEvents": gameState.fieldState.filter(item => item == 2).length >= gameRule.l ? 'visible' : 'none',    
        "backgroundColor": gameState.fieldState.filter(item => item == 2).length >= gameRule.l ? 'rgb(90, 166, 86)' : 'rgba(182, 172, 172, 0.6)', 
    };
    const [time, setTime] = useState(gameRule.gameTime);
    
    const addTime = (gameRule.gameTime == 0 ? 1 : -1); 

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => {
                if (prev <= 0 && addTime == -1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev + addTime;
            });
        }, 1000);
    
        return () => clearInterval(timer); 
    }, [gameRule.gameTime]);
    if (time == 0 && gameRule.gameTime > 0) {
        if(gameState.move == 2) setWin(gameRule.firstPlayer);
        else setWin(gameRule.secondPlayer);
        setBlock(1);
        gameState.fieldState.forEach((value, index) => {
            if (value === 2) {
                gameState.updateElement(index, 0);
            }
        });
    }

    const [hintAmount, setHintAmount] = useState(3);
    return (
        <div className="MInfo">
            <div className="logomini">
                <h1 className = "nameapp infonameapp">ПАЛОЧКИ</h1>
            </div>
            <div className="pBut">
                <div className="blockinfo">
                    <h3>Ходит</h3>
                    {gameState.move == 1 ? (
                        <h5 style={moveStyle}>{gameRule.firstPlayer}</h5>
                    ) : (
                        <h5 style={moveStyle}>{gameRule.secondPlayer}</h5>
                    )}
                </div>
                <div className="blockinfo">
                    {gameRule.gameTime == 0 ? (<h3>Время хода</h3>) : (<h3>Таймер хода</h3>)}
                    <h5>
                    {time >= 3600 && `${Math.floor(time / 3600).toString().padStart(2, '0')} : `}
                    {time >= 60 && `${Math.floor((time % 3600) / 60).toString().padStart(2, '0')} : `}
                    {`${(time % 60).toString().padStart(2, '0')}`}
                    </h5>
                </div>
                <div className="blockinfo">
                    <h3>Режим</h3>
                    <h5>{listMode[gameRule.mode]}</h5>
                </div>
                {(gameRule.mode == 2 || gameRule.mode == 4) && (
                <div className="blockinfo">
                    <h3>Минимум взять</h3>
                    <h5>{gameRule.l}</h5>
                </div>
                )}
                {gameRule.mode != 5 && (
                <div className="blockinfo">
                    <h3>Максимум взять</h3>
                    <h5>{gameRule.r}</h5>
                </div>
                )}
                <div className="blockinfo">
                    <h3>Взял</h3>
                    <h5>{gameState.fieldState.filter(item => item == 2).length}</h5>
                </div>
                <div className="blockinfo">
                    <h3>Осталось</h3>
                    <h5>{gameState.fieldState.filter(item => item != 1).length}</h5>
                </div>
                {gameRule.opponent == 'Bot' && (
                <div className="blockinfo">
                    <h3>Подсказка</h3>
                    <button className="hint" onClick={() => getHint(gameRule, gameState, hintAmount, setHintAmount, block)}><h4>{hintAmount}</h4></button>
                </div>
                )}
            </div>
            <div className="Bcontainer">
                <button className="Bexit" onClick={() => gameState.stateScreen('menu')}></button>
                <Button style={activeButton} className="BNext" onClick = {async () => {await next(gameRule, gameState, setWin, countMove, setBlock), setTime(gameRule.gameTime)}}><p>Следующий ход</p></Button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000} 
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