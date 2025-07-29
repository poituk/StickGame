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
    for (let [index, x] of field.entries()) {
        if (x == 0) {
            firstPos = Math.min(index, firstPos);
            count++;
        } else {
            if(count != 0){
                zeroRanges.push(count);
                startZeroRanges.push(firstPos);
            }
            firstPos = field.length;
            count = 0;
        }
        max0 = Math.max(max0, count);
    }
    if (count != 0) {
        max0 = Math.max(max0, count);
        zeroRanges.push(count);
        startZeroRanges.push(firstPos);
    }
    let g = new Array(max0 + 1).fill(0);
    for (let i = l; i <= max0; i++) {
        const numSet = new Set();
        for (let j = l; j <= r && i - j >= 0; j++) {
            if (j == 2) continue;
            for (let k = 0; i - j - k >= 0; k++) {
                numSet.add(g[k] ^ g[i - j - k]);
            }
        }
        for (let i1 = 0; i1 <= i; i1++) {
            for (let i2 = i1; i2 + i1 <=  i - 2; i2++) {
                numSet.add(g[i1] ^ g[i2] ^ g[i - i2 - i1 - 2]);
            }
        }
        g[i] = mex(numSet);
    }
    let xorField = 0;
    for (let x of zeroRanges){
        xorField ^= g[x];
    }
    if (xorField == 0){
        let pos;
        for (let i = 0; i < zeroRanges.length; i++){
            if(max0 == zeroRanges[i]){
                pos = startZeroRanges[i];
                break;
            }
        }
        if(max0 >= 3) {
            pos += 2;
        }
        let amountDel = l;
        while (amountDel != 0){
            field[pos] = 2;
            amountDel--;
            pos++;
        }
    } else {
        let pos, amountDel, flag = false;
        for (let i = 0; i < zeroRanges.length && !flag; i++) {
            for (let j = l; j <= r && zeroRanges[i] - j >= 0 && !flag; j++) {
                if (j == 2) continue;
                for(let k = 0; zeroRanges[i] - j - k >= 0; k++){
                    if((xorField ^ g[zeroRanges[i]] ^ g[k] ^ g[zeroRanges[i] - j - k]) == 0) {
                        pos = startZeroRanges[i] + k;
                        amountDel = j;
                        flag = true;
                        while (amountDel != 0){
                            field[pos] = 2;
                            amountDel --;
                            pos++;
                        }
                        break;
                    }
                }
            }
            for(let i1 = 0; i1 <= zeroRanges[i] && !flag; i1++) {
                for(let i2 = i1; i2 + i1 <=  zeroRanges[i] - 2 && !flag; i2++) {
                    if ((xorField ^ g[zeroRanges[i] - i1 - i2 - 2] ^ g[i1] ^ g[i2] ^ g[zeroRanges[i]]) == 0) {
                        field[startZeroRanges[i] + i1] = 2;
                        field[startZeroRanges[i] + i1 + i2 + 1] = 2;
                        flag = 1;
                        break;
                    }
                }
            }
            for(let j = i + 1; j < zeroRanges.length && !flag; j++) {
                for(let p1 = 0; p1 < zeroRanges[i] && !flag; p1++){
                    for(let p2 = 0; p2 < zeroRanges[j]; p2++){
                        if ((xorField ^ g[zeroRanges[i]] ^ g[zeroRanges[j]] ^ g[p1] ^ g[zeroRanges[i] - p1 - 1] ^ g[p2] ^ g[zeroRanges[j] - p2 - 1]) == 0) {
                            field[startZeroRanges[i] + p1] = 2;
                            field[startZeroRanges[j] + p2] = 2;
                            flag = 1;
                            break;
                        }
                    }   
                }
            }
        }
    }
    return field;
}