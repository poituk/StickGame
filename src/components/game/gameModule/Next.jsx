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
    console.log(GameState)
    GameState.FieldState.forEach((value, index) => {
        if (value === 2) {
            GameState.updateElement(index, 1);
        }
    });
    if(gameRule.mode == 1 || gameRule.mode == 2 || gameRule.mode == 5){
        if(GameState.FieldState.filter(item => item == 0).length < gameRule.l){
            if(GameState.move == 1){
                setWin(gameRule.Fplayer);
            }else{
                if(gameRule.opponent != 'Bot') setWin(gameRule.Splayer);
                else setWin('ImpossibleValue%&&$')
            }
            
        }
    }
    if(gameRule.mode == 3 || gameRule.mode == 4){
        if(GameOver(gameRule.l, GameState.FieldState)){
            if(GameState.move == 1){
                setWin(gameRule.Fplayer);
            }else{
                if(gameRule.opponent != 'Bot') setWin(gameRule.Splayer);
                else setWin('ImpossibleValue%&&$')
            }
        }
    }
    GameState.setMove(3 - GameState.move);
    countmove();
}