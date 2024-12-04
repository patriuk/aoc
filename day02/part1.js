import { open } from "fs/promises";
import path from "path";

function isSafeCrude(report) {
    const dir = !!(report[0] > report[1]);

    for (let i = 1; i < report.length; i++) {
        const left = report[i - 1];
        const right = report[i];
        const newDir = !!(left > right);
        if (newDir != dir) {
            return false;
        }

        if (dir) { // desc 
            if ((left - right) < 1 || (left - right) > 3) {
                return false
            }
        } else { // asc 
            if ((right - left) < 1 || (right - left) > 3) {
                return false
            }
        }

    }

    return true;
}

function isSafe(report) {
    const dir = report[0] > report[1] ? -1 : 1;

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];

        if (Math.sign(diff) !== dir || Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false
        }
    }

    return true;
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
        sum += isSafe(input[i]) ? 1 : 0;
    }

    console.log(sum);
}

main();
