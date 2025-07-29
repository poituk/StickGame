export default function standartBot(Field, l, r){
    let n = Field.filter(item => item == 0).length;
    const dp = new Array(n + 1).fill(0);
    const cnt = new Array(n + 1).fill(0);
    for(let i = l;i <= n;i++){
        for(let j = i - l;j >= Math.max(i - r, 0); j--) {
            if(dp[j] == 0){
                dp[i] = 1;
            }
            if(dp[j] == 1){
                cnt[i]++;
            }
        }
    }
    let mx = -1, CountGet = 0;
    for(let i = l;n - i >= Math.max(n - r, 0);i++){
        if(dp[n] == 0){
            if(cnt[n - i] > mx){
                CountGet = i;
                mx = cnt[n - i];
            }
        }else{
            if(dp[n - i] == 0){
                CountGet = i;
                break;
            }
        }
    }
    for(let i = 0;i < Field.length; i++){
        if(CountGet == 0) break;
        if(Field[i] == 0){
            Field[i] = 2;
            CountGet--;
        }
    }
    return [...Field];
}