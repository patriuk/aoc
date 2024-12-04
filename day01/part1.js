import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
    const file = await fs.open(path.join(import.meta.dirname, 'input'));

    let left = [];
    let right = [];
    for await (const line of file.readLines()) {
        const pair = line.split('   ').map(a => Number(a));
        left.push(pair[0]);
        right.push(pair[1]);
    }

    const compareFunc = (a, b) => a - b;
    left.sort(compareFunc);
    right.sort(compareFunc);

    let sum = 0;
    for (let i = 0; i < left.length; i++) {
        const l = left[i];
        const r = right[i];

        sum += l >= r ? l - r : r - l;
    }

    console.log(sum);
}

main();

