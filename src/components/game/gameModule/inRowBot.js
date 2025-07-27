function mex(numSet) {
    let mex = 0;
    while (numSet.has(mex)) mex++;
    return mex;
}

export default function inRowBot(field, l, r) {
    let count = 0, max0 = 0;
    const zeroRanges = [];
    const startZeroRanges = [];
    let firstPos = field.length;
    for(let [index, x] of field.entries()){
        if(x == 0){
            firstPos = Math.min(index, firstPos);
            count++;
        }else{
            if(count != 0){
                zeroRanges.push(count);
                startZeroRanges.push(firstPos);
            }
            firstPos = field.length;
            count = 0;
        }
        max0 = Math.max(max0, count);
    }
    if(count != 0) {
        max0 = Math.max(max0, count);
        zeroRanges.push(count);
        startZeroRanges.push(firstPos);
    }
    let g = new Array(max0 + 1).fill(0);
    for(let i = l; i <= max0; i++) {
        const numSet = new Set();
        for(let j = l; j <= r && i - j >= 0; j++) {
            for(let k = 0; i - j - k >= 0; k++){
                numSet.add(g[k] ^ g[i - j - k]);
            }
        }
        g[i] = mex(numSet);
    }
    let xorField = 0;
    for(let x of zeroRanges){
        xorField ^= g[x];
    }
    if(xorField == 0){
        console.log(max0);
        let pos;
        for(let i = 0; i < zeroRanges.length; i++){
            if(max0 == zeroRanges[i]){
                pos = startZeroRanges[i];
                break;
            }
        }
        let amountDel = l;
        while(amountDel != 0){
            field[pos] = 2;
            amountDel--;
            pos++;
        }
    } else {
        let pos, amountDel, flag = false;
        for(let i = 0; i < zeroRanges.length && !flag; i++) {
            for(let j = l; j <= r && zeroRanges[i] - j >= 0 && !flag; j++) {
                for(let k = 0; zeroRanges[i] - j - k >= 0; k++){
                    if(xorField ^ g[zeroRanges[i]] ^ g[k] ^ g[zeroRanges[i] - j - k] == 0) {
                        pos = startZeroRanges[i] + k;
                        amountDel = j;
                        flag = true;
                        break;
                    }
                }
            }
        }
        while(amountDel != 0){
            field[pos] = 2;
            amountDel --;
            pos++;
        }
    }
    return field;
}