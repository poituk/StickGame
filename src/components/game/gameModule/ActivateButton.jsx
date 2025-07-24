import { toast, ToastContainer} from 'react-toastify';
const warningelement = {
    warning: (message) => {
        toast.warning(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    },
};
function StandartCheck({gameRule, GameState, index}){
    
    
    if(GameState.FieldState[index] == 2){
        GameState.updateElement(index, 0)
    } else {
        if(GameState.FieldState.filter(item => item == 2).length < gameRule.r){
            GameState.updateElement(index, 2)
        }else{
            warningelement.warning('Нельзя выбрать эту карточку!');
        }
    }
}
function InRowCheck({gameRule, GameState, index}){
    if(GameState.FieldState[index] == 2){
        if((index === 0 || GameState.FieldState[index - 1] !== 2) || (index === gameRule.n - 1 || GameState.FieldState[index + 1] !== 2)) {
            GameState.updateElement(index, 0);
        } else {
            warningelement.warning('Нельзя выбрать эту карточку!');
        }
    } else if(GameState.FieldState.filter(item => item == 2).length < gameRule.r){
        if((index > 0 && GameState.FieldState[index - 1] === 2) || (index < gameRule.n - 1 && GameState.FieldState[index + 1] === 2) || GameState.FieldState.filter(item => item == 2).length == 0){
            GameState.updateElement(index, 2);
        } else {
            warningelement.warning('Нельзя выбрать эту карточку!');
        }
    } else {
        warningelement.warning('Нельзя выбрать эту карточку!');
    }
}
function SpecialCheck({gameRule, GameState, index}){
    const count2 = GameState.FieldState.filter(item => item == 2).length;
    if(GameState.FieldState[index] == 2){
        GameState.updateElement(index, 0);
    } else {
        if(count2 === 1 || count2 === 0){
            GameState.updateElement(index, 2);
        } else {
            const i1 = GameState.FieldState.indexOf(2), i2 = GameState.FieldState.lastIndexOf(2);
            if(Math.max(i1, index, i2) - Math.min(i1, index, i2) === 2){
                GameState.updateElement(index, 2);
            } else {
                warningelement.warning('Нельзя выбрать эту карточку!');
            }
        }
    }
}

export default function ActivateButton(gameRule, GameState, index){
    if(gameRule.mode == 1 || gameRule.mode == 2){
        StandartCheck({gameRule, GameState, index})
    }
    if(gameRule.mode == 3 || gameRule.mode == 4){
        InRowCheck({gameRule, GameState, index})
    }
    if(gameRule.mode == 5){
        SpecialCheck({gameRule, GameState, index})
    }
}