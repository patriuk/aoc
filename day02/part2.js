import { open } from "fs/promises";
import path from "node:path";

function isSafe(report) {
    const dir = report[0] > report[1] ? -1 : 1;

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];

        if (Math.sign(diff) !== dir || Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }
    }

    return true;
}

function dampen(report) {
    for (let i = 0; i < report.length; i++) {
        if (isSafe(report.toSpliced(i, 1))) {
            return true;
        }
    }

    return false;
}

async function main() {
    const file = await open(path.join(import.meta.dirname, 'input'));

    let input = [];
    for await (const line of file.readLines()) {
        const l = line.split(' ').map(a => Number(a));
        input.push(l);
    }

    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        let safe = isSafe(input[i]);
        if (!safe) {
            safe = dampen(input[i]);
        }
        sum += safe ? 1 : 0;
    }

    console.log(sum);
}

main();
