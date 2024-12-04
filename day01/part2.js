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

    const map = new Map();
    for (let i = 0; i < left.length; i++) {
        const candidate = left[i];
        if (map.has(candidate)) {
            continue;
        }

        map.set(candidate, 0);
        for (let j = 0; j < right.length; j++) {
            if (right[j] === candidate) {
                const val = map.get(candidate);
                map.set(candidate, val + 1);
            }
        }
    }

    let sum = 0;
    map.forEach((v, k) => sum += k * v);

    console.log(sum);
}

main();

