import { useState } from "react";
import './setings.css'
import { 
    Stack, 
    Button,
} from "react-bootstrap";
import ShowRulesButton from "../rule/ShowingRule"
import { toast, ToastContainer } from 'react-toastify';

export default function Setings({stateScreen, setGameRule}) {
    const [firstField, setFirstField] = useState(1)
    const [secondState, setSecondState] = useState('Bot')
    function setingSetings(e) {
        e.preventDefault()
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
       
        
        for(let [key, value] of Object.entries(data)){
            if(!value) {
                toast.info('Не все поля заполнены!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }
        }
        if(!data.l){
            data.l = 1;
        }
        if(!data.r){
            data.r = 3;
        }
        if(!data.secondPlayer){
            data.secondPlayer = 'Бот';
        }
        if(!data.gameTime){
            data.gameTime = 0;
        }

        data.r = parseInt(data.r);
        data.l = parseInt(data.l);
        data.n = parseInt(data.n);
        data.gameTime = parseInt(data.gameTime);
        if (data.l > data.r) {
            toast.error('Минимум взять за ход должен быть МЕНЬШЕ максимума взять за ход', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (data.r > data.n){
            toast.error('За ход нельзя взять столько палок', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setGameRule(data)
            stateScreen('game')
        }
    }
    const gameMode = [
        {value: 1, label: 'Стандартный'},
        {value: 2, label: 'Диапазонный'},
        {value: 3, label: '"Рядом"'},
        {value: 4, label: 'Комбинированный'},
        {value: 5, label: 'Особый'},
    ]
    const gameOpponent = [
        {value: 'Bot', label: 'Бот'},
        {value: 'Player', label: 'Второй игрок'}
    ]
    const gameTime = [
        {value: 0, label: 'нет'},
        {value: 5, label: '5 секунд'},
        {value: 15, label: '15 секунд'},
        {value: 30, label: '30 секунд'},
        {value: 60, label: '1 минута'},
        {value: 180, label: '3 минуты'},
        {value: 300, label: '5 минут'},
        {value: 600, label: '10 минут'},
    ]
    return (
        <div>
            <button className="back" onClick={() => stateScreen('menu')}></button>
            <Stack gap={0} className="text-center setname">
                <h1>Настройка</h1>
                <h1>игры</h1>
            </Stack>
            <ShowRulesButton />
            <form onSubmit = {setingSetings}>
                <div className="form-group">
                    <label>Режим </label>
                    <select name="mode" onChange={(e) => setFirstField(e.target.value)}>
                    {gameMode.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Противник </label>
                    <select name="opponent" onChange={(e) => setSecondState(e.target.value)}>
                    {gameOpponent.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </div>
                {secondState != "Bot" && (<div className="form-group">
                    <label>Ограничение хода </label>
                    <select name="gameTime" onChange={(e) => setSecondState(e.target.value)}>
                    {gameTime.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </div>)}
                {secondState == "Bot" && (
                    <div className="form-group">
                    <label>Первый ходит</label>
                    <div className="radioButton">
                        <label>
                            <input
                            name = "firstMove"
                            type="radio"
                            value={1}
                            defaultChecked
                            required
                            />
                            {' '}
                            Игрок
                        </label>
                        <label>
                            <input
                            name = "firstMove"
                            type="radio"
                            value={2}
                            required
                            />
                            {' '}
                            Бот
                        </label>
                    </div>
                </div>)}
                {secondState == "Bot" ? (<div className="form-group">
                    <label>Имя игрока</label>
                    <input
                    name = "firstPlayer"
                    type="text"
                    maxLength={16}
                    defaultValue = "Игрок"
                    />
                </div>) : (
                    <div>
                    <div className="form-group">
                        <label>Имя первого игрока</label>
                        <input
                        name = "firstPlayer"
                        type="text"
                        maxLength={12}
                        defaultValue = "Игрок 1"
                        />
                    </div>
                    <div className="form-group">
                        <label>Имя Второго игрока</label>
                        <input
                        name = "secondPlayer"
                        type="text"
                        maxLength={12}
                        defaultValue = "Игрок 2"
                        />
                    </div>
                </div>)}
                <div className="form-group">
                    <label>Всего палочек </label>
                    <input
                    name = "n"
                    type="number"
                    min = "5"
                    max = "50"
                    step="1" 
                    defaultValue = {10}
                    />
                </div>
                {(firstField == 2 || firstField == 4) && (<div className="form-group">
                    <label>Минимум взять за ход </label>
                    <input
                    name = "l"
                    type="number"
                    min = "2"
                    max = "50"
                    step="1" 
                    defaultValue = {2}
                    />
                </div>)}
                {firstField != 5 && (<div className="form-group">
                    <label>Максимум взять за ход </label>
                    <input
                    name = "r"
                    type="number"
                    min = "2"
                    max = "50"
                    step="1"
                    defaultValue = {2}
                    />
                </div>)}
                <Button variant="light" className = "mx-auto d-block light" size = "lg" type="submit">Начать</Button>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={3000} 
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
