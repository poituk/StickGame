import './end.css'
import { Modal, Button } from 'react-bootstrap';
export default function End({name, setWin, gameRule, gameState, countMove, startTime, gameMove}){
    const  listMode= ['none', 'Стандартный', 'Диапазонный', '"Рядом"', 'Комбинированный', 'Особый'];
    const gameDuration = Math.floor((Date.now() - startTime) / 1000)
    const styleNew = {
        color: gameRule.firstPlayer === name ? 'rgb(50, 82, 196)' : 'rgb(204, 70, 70)',    
    };
    return (
        <div className='win-menu'>
            <div className='wintext'>
                {gameRule.opponent == 'Bot' ?  
                    (name === 'ImpossibleValue%&&$' ? <h1 style={{color: 'rgb(200, 39, 39)'}}>Поражение</h1> : <h1 style={{color: 'rgb(36, 162, 66)'}}>Победа</h1>)
                    : 
                    <h1><b style={styleNew}>{name}</b> победил!</h1>
                }
            </div>
            <div className='win-content'>
                <div className='info'>
                    <h5>Режим: <b>{listMode[gameRule.mode]}</b></h5>
                </div>
                <div className="info">
                    <h5>Противник: <b>{(gameRule.opponent == 'Bot') ? 'Бот' : 'Игрок'}</b></h5>
                </div>
                {gameRule.opponent == 'Bot' && (
                    <h5>Первый ходил: <b>{(gameMove == '2') ? 'Бот' : 'Игрок'}</b></h5>
                )}
                <div className='info'>
                    <h5>Минимум можно взять: <b>{gameRule.l}</b></h5>
                </div>
                <div className='info'>
                    <h5>Максимум можно взять: <b>{gameRule.r}</b></h5>
                </div>
                <div className='info'>
                    <h5>Количество ходов: <b>{countMove.current}</b></h5>
                </div>
                <div className='info'>
                <h5>
                    Время игры: {}
                    <b>
                        {(hours => hours > 0 && (
                            <span>
                            {hours}
                            {' час' +
                                (hours % 10 === 1 && hours % 100 !== 11 ? '' :
                                [2,3,4].includes(hours % 10) && ![12,13,14].includes(hours % 100) ? 'а' : 'ов')}{' '}
                            </span>
                        ))(Math.floor(gameDuration / 3600))}
                        
                        {(minutes => minutes > 0 && (
                            <span>
                            {minutes}
                            {' минут' +
                                (minutes % 10 === 1 && minutes % 100 !== 11 ? 'а' :
                                [2,3,4].includes(minutes % 10) && ![12,13,14].includes(minutes % 100) ? 'ы' : '')}{' '}
                            </span>
                        ))(Math.floor((gameDuration % 3600) / 60))}
                        
                        {(seconds => (
                            <span>
                            {seconds}
                            {' секунд' +
                                (seconds % 10 === 1 && seconds % 100 !== 11 ? 'а' :
                                [2,3,4].includes(seconds % 10) && ![12,13,14].includes(seconds % 100) ? 'ы' : '')}
                            </span>
                        ))(Math.floor(gameDuration % 60))}
                    </b>
                </h5>
                </div>
            </div>
            <div className='win-exit'>
                <Button className = "firstBut" variant="primary" onClick={() => {setWin(undefined); gameRule.gameTime = 0}}>Посмотреть поле</Button>
                <Button variant="danger" onClick={() => gameState.stateScreen('menu')}>Выход</Button>
            </div>
        </div>
    );
}