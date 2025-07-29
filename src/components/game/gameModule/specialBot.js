let ans;
function dfs(field, startTime){
    if (Date.now() - startTime >= 1000) return;
    for (let i = 0; i < field.length; i++) {
        if (field[i] != 0) continue;
        let nArray = [...field];
        nArray[i] = 2;
        if (!dfs(nArray, startTime)) {
            ans = nArray;
            return 1;
        }
    }
    if (Date.now() - startTime >= 1000) return;
    for (let i = 0; i < field.length; i++) {
        for (let j = i + 1; j < field.length; j++){
            if (field[i] != 0 || field[j] != 0) continue;
            let nArray = [...field];
            nArray[i] = nArray[j] = 2;
            if (!dfs(nArray, startTime)) {
                ans = nArray;
                return 1;
            }
        }
    }
    if (Date.now() - startTime >= 1000) return;
    for (let i = 0; i < field.length - 2; i++) {
        if (field[i] != 0) continue;
        let nArray = [...field];
        nArray[i] = nArray[i + 1] = nArray[i + 2] = 2;
        if (!dfs(nArray, startTime)) {
            ans = nArray;
            return 1;
        }
    }
    return 0;
}

export default function specialBot(field) {
    if(!dfs(field, Date.now())) {
        ans = [...field];
        for (let i = 0; i < ans.length; i++) {
            if (ans[i] != 0) continue;
            ans[i] = 2;
            break;
        }
    }
    return ans;
}