import ActiveButton from './gameModule/ActiveButton';
import './numberGrid.css'
import exitIcon from '../../assets/stickBroke.png';
import { useEffect, useState, useRef  } from 'react';
export default function Field({gameRule, gameState, block}){
    const [isMouseDown, setIsMouseDown] = useState(false);
    const buttonsRef = useRef([]);

    const handleMouseDown = () => {
        setIsMouseDown(true);
    };
    const handleMouseUp = () => {
        setIsMouseDown(false);
    };
    const handleButtonEnter = (index) => {
        if (isMouseDown) {
            buttonsRef.current[index].click();
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    const fieldStyle = {
        backgroundColor: gameState.move === 1 ? 'rgb(168, 195, 210)' : 'rgba(240, 136, 136, 0.64)'
    };
    const backgroundStyle = [{
        backgroundColor: '#ece4e4',
        backgroundBlendMode: 'multiply',
    },
    {
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
        transform: 'scale(1.02)',
        transition: 'all 2s ease-out',
        background: `url(${exitIcon}) no-repeat center`,
        backgroundSize: '67%',
    },
    {
        backgroundColor: 'rgba(139, 253, 173, 0.64)',
        backgroundBlendMode: 'multiply',
        transform: 'scale(1.03)',
        transition: 'transform 0.5s ease',
        backgroundSize: '63%'
    }
    ];
    return (
        <div style = {fieldStyle} className="MField" onMouseDown={handleMouseDown}>
             <div className="grid-container">
                {gameState.fieldState.map((value, index) => (
                    <button 
                    style = {backgroundStyle[value]}  
                    key={index} 
                    className="grid-item"  
                    ref={(el) => (buttonsRef.current[index] = el)}
                    onMouseEnter={() => handleButtonEnter(index)} 
                    onClick={() => {if (block == 0) { ActiveButton(gameRule, gameState, index) }}}>
                        <div className='numb'>{index + 1}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}