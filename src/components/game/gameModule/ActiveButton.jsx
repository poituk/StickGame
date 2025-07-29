import { toast } from 'react-toastify';
const warningelement = {
    warning: (message) => {
        toast.warning(message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    },
};
function standartCheck({gameRule, gameState, index}){
    if(gameState.fieldState[index] == 2){
        gameState.updateElement(index, 0)
    } else {
        if(gameState.fieldState.filter(item => item == 2).length < gameRule.r){
            gameState.updateElement(index, 2)
        }else{
            warningelement.warning('Нельзя выбрать эту палочку!');
        }
    }
}
function inRowCheck({gameRule, gameState, index}){
    if(gameState.fieldState[index] == 2){
        if((index === 0 || gameState.fieldState[index - 1] !== 2) || (index === gameRule.n - 1 || gameState.fieldState[index + 1] !== 2)) {
            gameState.updateElement(index, 0);
        } else {
            warningelement.warning('Нельзя выбрать эту палочку!');
        }
    } else if(gameState.fieldState.filter(item => item == 2).length < gameRule.r){
        if((index > 0 && gameState.fieldState[index - 1] === 2) || (index < gameRule.n - 1 && gameState.fieldState[index + 1] === 2) || gameState.fieldState.filter(item => item == 2).length == 0){
            gameState.updateElement(index, 2);
        } else {
            warningelement.warning('Нельзя выбрать эту палочку!');
        }
    } else {
        warningelement.warning('Нельзя выбрать эту палочку!');
    }
}
function specialCheck({gameRule, gameState, index}){
    const count2 = gameState.fieldState.filter(item => item == 2).length;
    if(gameState.fieldState[index] == 2){
        gameState.updateElement(index, 0);
    } else {
        if(count2 === 1 || count2 === 0){
            gameState.updateElement(index, 2);
        } else {
            const i1 = gameState.fieldState.indexOf(2), i2 = gameState.fieldState.lastIndexOf(2);
            if(Math.max(i1, index, i2) - Math.min(i1, index, i2) === 2){
                gameState.updateElement(index, 2);
            } else {
                warningelement.warning('Нельзя выбрать эту палочку!');
            }
        }
    }
}

export default function ActiveButton(gameRule, gameState, index){
    if(gameRule.mode == 1 || gameRule.mode == 2){
        standartCheck({gameRule, gameState, index})
    }
    if(gameRule.mode == 3 || gameRule.mode == 4){
        inRowCheck({gameRule, gameState, index})
    }
    if(gameRule.mode == 5){
        specialCheck({gameRule, gameState, index})
    }
}