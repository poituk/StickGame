import { useState } from "react";
import './setings.css'
import { 
    Stack, 
    Button,
} from "react-bootstrap";
import ShowRulesButton from "../rule/showrule"
import { toast, ToastContainer } from 'react-toastify';

export default function Setings({stateScreen, setgameRule}) {
    const [Fstate, setFstate] = useState(1)
    const [Ostate, setOstate] = useState('Bot')
    function SetSetings(e) {
        e.preventDefault()
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
       
        
        for(let [key, value] of Object.entries(data)){
            if(!value) {
                toast.info('Не все поля заполнены!', {
                    position: "bottom-right",
                    autoClose: 5000,
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
        if(!data.Splayer){
            data.Splayer = 'Бот';
        }

        data.r = parseInt(data.r);
        data.l = parseInt(data.l);
        data.n = parseInt(data.n);
        console.log(data)
        if (data.l > data.r) {
            toast.error('Минимум взять за ход должен быть МЕНЬШЕ максимума взять за ход', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (data.r > data.n){
            toast.error('За ход нельзя взять столько палок', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setgameRule(data)
            stateScreen('game')
        }
    }
    const Gmode = [
        {value: 1, label: 'Стандартный'},
        {value: 2, label: 'Диапазонный'},
        {value: 3, label: '"Рядом"'},
        {value: 4, label: 'Комбинированный'},
        {value: 5, label: 'Особый'},
    ]
    const Gopponent = [
        {value: 'Bot', label: 'Бот'},
        {value: 'Player', label: 'Второй игрок'}
    ]
    return (
        <div>
            <button className="back" onClick={() => stateScreen('menu')}></button>
            <Stack gap={0} className="text-center setname">
                <h1>Настройка</h1>
                <h1>игры</h1>
            </Stack>
            <ShowRulesButton />
            <form onSubmit = {SetSetings}>
                <div className="form-group">
                    <label>Режим </label>
                    <select name="mode" onChange={(e) => setFstate(e.target.value)}>
                    {Gmode.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Противник </label>
                    <select name="opponent" onChange={(e) => setOstate(e.target.value)}>
                    {Gopponent.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </div>
                {Ostate == "Bot" ? (<div className="form-group">
                    <label>Имя игрока</label>
                    <input
                    name = "Fplayer"
                    type="text"
                        maxLength={16}
                    defaultValue = "Игрок"
                    />
                </div>) : (
                    <div>
                    <div className="form-group">
                        <label>Имя первого игрока</label>
                        <input
                        name = "Fplayer"
                        type="text"
                        maxLength={12}
                        defaultValue = "Игрок 1"
                        />
                    </div>
                    <div className="form-group">
                        <label>Имя Второго игрока</label>
                        <input
                        name = "Splayer"
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
                {(Fstate == 2 || Fstate == 4) && (<div className="form-group">
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
                {Fstate != 5 && (<div className="form-group">
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
