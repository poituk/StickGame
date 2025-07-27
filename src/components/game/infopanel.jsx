import next from "./gameModule/next";
import {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
export default function Info({gameRule, gameState, setWin, countMove}){
    const  listMode = ['none', 'Стандартный', 'Диапазонный', '"Рядом"', 'Комбинированный', 'Особый'];
    const moveStyle = {
        color: gameState.move === 1 ? 'rgb(50, 82, 196)' : 'rgb(204, 70, 70)',    
    };
    const activeButton = {
        "pointer-events": gameState.fieldState.filter(item => item == 2).length >= gameRule.l ? 'visible' : 'none',    
        "background-color": gameState.fieldState.filter(item => item == 2).length >= gameRule.l ? 'rgb(90, 166, 86)' : 'rgba(182, 172, 172, 0.6)', 
    };
    const [time, setTime] = useState(0);
    
    useEffect(() => {
        const timer = setInterval(() => {
        setTime(prev => prev + 1);
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);
    
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
                    <h3>Время хода</h3>
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
                <div className="blockinfo">
                    <h3>Минимум взять</h3>
                    <h5>{gameRule.l}</h5>
                </div>
                <div className="blockinfo">
                    <h3>Максимум взять</h3>
                    <h5>{gameRule.r}</h5>
                </div>
                <div className="blockinfo">
                    <h3>Взял</h3>
                    <h5>{gameState.fieldState.filter(item => item == 2).length}</h5>
                </div>
                <div className="blockinfo">
                    <h3>Осталось</h3>
                    <h5>{gameState.fieldState.filter(item => item != 1).length}</h5>
                </div>
            </div>
            <div className="Bcontainer">
                <button className="Bexit" onClick={() => gameState.stateScreen('menu')}></button>
                <Button style={activeButton} className="BNext" onClick = {() => {next(gameRule, gameState, setWin, countMove), setTime(0)}}><p>Следующий ход</p></Button>
            </div>
        </div>
    );
}