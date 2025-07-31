import _ from 'lodash';
export default function specialBot(field) {
    const st = [];
    let st2 = 1;
    for (let i = 0;i <= 50;i++) {
        st.push(st2);
        st2 *= 2;
    }
    const N = (1 << 20);
    const dp = new Array(N + 1).fill(false);
    const c = new Set();
    c.add(0);
    for (let bt = 1; bt <= 20; bt++) {
        for (let s = (1 << (bt - 1)); s < (1 << bt); s++) {
            let f = false;
            for (let i = 0; i < bt; i++) {
                if ((s >> i & 1) === 0) {
                    continue;
                }
                const s1 = s - (1 << i);
                if (!dp[s1]) {
                    dp[s] = true;
                    f = true;
                    break;
                }
            }
            for (let i = 0; i < bt && !f; i++) {
                for (let j = i + 1; j < bt; j++) {
                    if ((s >> i & 1) === 0 || (s >> j & 1) === 0) {
                        continue;
                    }
                    const s1 = s - (1 << i) - (1 << j);
                    if (!dp[s1]) {
                        dp[s] = true;
                        f = true;
                        break;
                    }
                }
            }
            for (let i = 0; i < bt - 2 && !f; i++) {
                if ((s >> i & 1) === 0 || (s >> (i + 1) & 1) === 0 || (s >> (i + 2) & 1) === 0) {
                    continue;
                }
                const s1 = s - (1 << i) - (1 << (i + 1)) - (1 << (i + 2));
                if (!dp[s1]) {
                    dp[s] = true;
                    f = true;
                    break;
                }
            }
            if (!f) {
                c.add(s);
            }
        }
    }
    let count = 0, s = 0, bt = 0;
    let zeroPos = [], onlyZeroPos = [];
    for(let [index, x] of field.entries()){
        if(x == 0){
            zeroPos.push(index);
            onlyZeroPos.push(index);
            count++;
        }else{
            if(count != 0){
                while(count > 0){
                    count--;
                    s += st[bt];
                    bt++;
                }
                zeroPos.push(index);
                bt++;
            }
            count = 0;
        }
    }
    if(count != 0) {
        while(count > 0){
            count--;
            s += st[bt];
            bt++;
            console.log(s);
        }
    }
    if(s < st[20] && !c.has(s)){
        console.log('win');
        let flag = 0;
        for (let i = 0; i < bt; i++) {
            if ((s >> i & 1) === 0) {
                continue;
            }
            let s1 = s - (1 << i);
            if (c.has(s1)) {
                flag = 1;
                field[zeroPos[i]] = 2;
                break;
            }
        }
        for (let i = 0; i < bt && !flag; i++) {
            for (let j = i + 1; j < bt; j++) {
                if ((s >> i & 1) === 0 || (s >> j & 1) === 0) {
                    continue;
                }
                let s1 = s - (1 << i) - (1 << j);
                if (c.has(s1)) {
                    field[zeroPos[i]] = field[zeroPos[j]] = 2;
                    flag = 1;
                    break;
                }
            }
        }
        for (let i = 0; i < bt - 2 && !flag; i++) {
            if ((s >> i & 1) === 0 || (s >> (i + 1) & 1) === 0 || (s >> (i + 2) & 1) === 0) {
                continue;
            }
            let s1 = s - (1 << i) - (1 << (i + 1)) - (1 << (i + 2));
            if (c.has(s1)) {
                field[zeroPos[i]] = field[zeroPos[i + 1]] = field[zeroPos[i + 2]] = 2;
                flag = 1;
                break;
            }
        }
    } else {
        let inRow3 = [];
        for (let i = 0; i + 2 < field.length; i++){
            if (field[i] == 0 && field[i + 1] == 0 && field[i + 2] == 0) {
                inRow3.push(i);
            }
        }
        let mx = 3;
        if (inRow3.length == 0) {
            mx--;
        }
        if(onlyZeroPos.length == 0) {
            mx--;
        }
        let mod = _.random(1, mx);
        if (mod == 1){
            let pos = onlyZeroPos[_.random(0, onlyZeroPos.length - 1)];
            field[pos] = 2;
        } else if (mod == 2){
            let p1 = onlyZeroPos[_.random(0, onlyZeroPos.length - 1)], p2 = onlyZeroPos[_.random(0, onlyZeroPos.length - 1)];
            field[p1] = field[p2] = 2;
        } else {
            let pos = inRow3[_.random(0, inRow3.length - 1)];
            field[pos] = field[pos + 1] = field[pos + 2] = 2;
        }
    }
    return field;
}