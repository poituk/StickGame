import StandartBot from './StandartBot.jsx'
function GameOver(l, a){
    mx = 0
    k = 0
    for(let x of a){
        if(x == 0){
            k += 1;
        }else{
            k = 0;
        }
        mx = max(mx, k);
    }
    return mx < l;
}

export default function Next(gameRule, GameState, setWin, countmove){
    let nArray = GameState.FieldState;
    GameState.FieldState.forEach((value, index) => {
        if (value === 2) {
            GameState.updateElement(index, 1);
            nArray[index] = 1;
        }
    });
    GameState.FieldState = nArray;
    console.log(GameState.FieldState)
    if(gameRule.mode == 1 || gameRule.mode == 2 || gameRule.mode == 5){
        if(GameState.FieldState.filter(item => item == 0).length < gameRule.l){
            if(GameState.move == 1){
                setWin(gameRule.Fplayer);
                return;
            }else{
                if(gameRule.opponent != 'Bot') setWin(gameRule.Splayer);
                else setWin('ImpossibleValue%&&$')
                return;
            }
            
        }
    }
    if(gameRule.mode == 3 || gameRule.mode == 4){
        if(GameOver(gameRule.l, GameState.FieldState)){
            if(GameState.move == 1){
                setWin(gameRule.Fplayer);
                return;
            }else{
                if(gameRule.opponent != 'Bot') setWin(gameRule.Splayer);
                else setWin('ImpossibleValue%&&$');
                return;
            }
        }
    }
    GameState.setMove(3 - GameState.move);
    GameState.move = 3 - GameState.move;
    countmove();
    if(gameRule.opponent == "Bot" && GameState.move == 2){
        nArray = StandartBot([... GameState.FieldState], gameRule.l, gameRule.r);
        console.log(nArray);
        GameState.setFieldState(nArray);
        GameState.FieldState = nArray;
        Next(gameRule, GameState, setWin, countmove);
    }
    
}