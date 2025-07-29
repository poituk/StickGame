import standartBot from './standartBot.js'
import inRowBot from './inRowBot.js'
import specialBot from './specialBot.js'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function gameOver(left, a){
    let max0 = 0, count0 = 0
    for(let value of a){
        if(value == 0){
            count0 += 1;
        }else{
            count0 = 0;
        }
        max0 = Math.max(max0, count0);
    }
    return max0 < left;
}

export default async function next(gameRule, gameState, setWin, countMove, setBlock, setGameTime) {
    let nArray = gameState.fieldState;
    gameState.fieldState.forEach((value, index) => {
        if (value === 2) {
            gameState.updateElement(index, 1);
            nArray[index] = 1;
        }
    });
    gameState.fieldState = nArray;
    if(gameRule.mode == 1 || gameRule.mode == 2 || gameRule.mode == 5){
        if(gameState.fieldState.filter(item => item == 0).length < gameRule.l){
            if (gameState.move == 1){
                setWin(gameRule.firstPlayer);
                return;
            } else {
                if(gameRule.opponent != 'Bot') setWin(gameRule.secondPlayer);
                else setWin('ImpossibleValue%&&$')
                return;
            }
        }
    }
    if(gameRule.mode == 3 || gameRule.mode == 4){
        if(gameOver(gameRule.l, gameState.fieldState)){
            if(gameState.move == 1){
                setWin(gameRule.firstPlayer);
                return;
            }else{
                if(gameRule.opponent != 'Bot') setWin(gameRule.secondPlayer);
                else setWin('ImpossibleValue%&&$');
                return;
            }
        }
    }
    gameState.setMove(3 - gameState.move);
    gameState.move = 3 - gameState.move;
    countMove();
    if(gameRule.opponent == "Bot" && gameState.move == 2){
        setBlock(1);
        await sleep(500);
        let nArray;
        if(gameRule.mode == 1 || gameRule.mode == 2) nArray = standartBot([... gameState.fieldState], gameRule.l, gameRule.r);
        else if(gameRule.mode == 3 || gameRule.mode == 4) nArray = inRowBot([... gameState.fieldState], gameRule.l, gameRule.r);
        else nArray = specialBot([... gameState.fieldState], 1, 3);
        gameState.setfieldState(nArray);
        gameState.fieldState = nArray;
        await sleep(1200);
        setBlock(0);
        next(gameRule, gameState, setWin, countMove);
    }
}