import ActivateButton from './gameModule/ActivateButton';
import './NumberGrid.css'
import exitIcon from '../../assets/stickbroke3.png';
import { useEffect, useState, useRef  } from 'react';
export default function Field({gameRule, GameState}){
    const [isMouseDown, setIsMouseDown] = useState(false);
    const buttonsRef = useRef([]);

    // Обработчик зажатия мыши
    const handleMouseDown = () => {
        setIsMouseDown(true);
    };

    // Обработчик отпускания мыши
    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    // Обработчик наведения на кнопку
    const handleButtonEnter = (index) => {
        if (isMouseDown) {
        // Эмулируем клик при зажатой мыши
        buttonsRef.current[index].click();
        }
    };

    // Вешаем глобальные обработчики
    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    const Fieldstyle = {
        backgroundColor: GameState.move === 1 ? 'rgb(168, 195, 210)' : 'rgba(240, 136, 136, 0.64)'
    };
    const Bstyle = [{
        backgroundColor: '#ece4e4',
        backgroundBlendMode: 'multiply',
    },
    {
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
        transform: 'scale(0.9)',
        transition: 'all 2s ease-out',
        background: `url(${exitIcon}) no-repeat center`,
        backgroundSize: '67%',
    },
    {
        backgroundColor: 'rgba(139, 253, 173, 0.64)',
        backgroundBlendMode: 'multiply',
        transform: 'scale(1.03)',
        transition: 'transform 0.5s ease',
        backgroundSize: '70%'
    }
    ];
    return (
        <div style = {Fieldstyle} className="MField" onMouseDown={handleMouseDown}>
             <div className="grid-container">
                {GameState.FieldState.map((value, index) => (
                    <button 
                    style = {Bstyle[value]}  
                    key={index} 
                    className="grid-item"  
                    ref={(el) => (buttonsRef.current[index] = el)}
                    onMouseEnter={() => handleButtonEnter(index)} 
                    onClick={() => ActivateButton(gameRule, GameState, index)}>
                        <div className='numb'>{index + 1}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}