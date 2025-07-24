import './end.css'
import { Modal, Button } from 'react-bootstrap';
export default function End({name, setWin, gameRule, gameState, countmove, starttime}){
    const  listmode= ['none', 'Стандартный', 'Диапазонный', '"Рядом"', 'Комбинированный', 'Особый'];
    const GameDuration = Math.floor((Date.now() - starttime) / 1000)
    return (
        <div className='win-menu'>
            <div className='wintext'>
                {gameRule.opponent == 'Bot' ?  
                    (name === 'ImpossibleValue%&&$' ? <h1>Поражение</h1> : <h1>Победа</h1>)
                    : 
                    <h1>{name} победил!</h1>
                }
            </div>
            <div className='win-content'>
                <div className='info'>
                    <h5>Режим: {listmode[gameRule.mode]}</h5>
                </div>
                <div className='info'>
                    <h5>Минимум можно взять: {gameRule.l}</h5>
                </div>
                <div className='info'>
                    <h5>Максимум можно взять: {gameRule.r}</h5>
                </div>
                <div className='info'>
                    <h5>Количество ходов: {countmove.current}</h5>
                </div>
                <div className='info'>
                <h5>
                    Время игры: {}
                    {(hours => hours > 0 && (
                        <span>
                        {hours}
                        {' час' + 
                            (hours % 10 === 1 && hours % 100 !== 11 ? '' :
                            [2,3,4].includes(hours % 10) && ![12,13,14].includes(hours % 100) ? 'а' : 'ов')}{' '}
                        </span>
                    ))(Math.floor(GameDuration / 3600))}
                    
                    {(minutes => minutes > 0 && (
                        <span>
                        {minutes}
                        {' минут' + 
                            (minutes % 10 === 1 && minutes % 100 !== 11 ? 'а' :
                            [2,3,4].includes(minutes % 10) && ![12,13,14].includes(minutes % 100) ? 'ы' : '')}{' '}
                        </span>
                    ))(Math.floor((GameDuration % 3600) / 60))}
                    
                    {(seconds => (
                        <span>
                        {seconds}
                        {' секунд' + 
                            (seconds % 10 === 1 && seconds % 100 !== 11 ? 'а' :
                            [2,3,4].includes(seconds % 10) && ![12,13,14].includes(seconds % 100) ? 'ы' : '')}
                        </span>
                    ))(Math.floor(GameDuration % 60))}
                </h5>
                </div>
            </div>
            <div className='win-exit'>
                <Button variant="primary" onClick={() => setWin(undefined)}>Посмотреть поле</Button>
                <Button variant="danger" onClick={() => gameState.stateScreen('menu')}>Выход</Button>
            </div>
        </div>
    );
}