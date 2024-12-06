import { open } from "fs/promises";
import path from "node:path";

const example = [
    '.M.S......',
    '..A..MSMS.',
    '.M.S.MAA..',
    '..A.ASMSM.',
    '.M.S.M....',
    '..........',
    'S.S.S.S.S.',
    '.A.A.A.A..',
    'M.M.M.M.M.',
    '..........'
];
// 9 X-MAS

function isMatch(diag) {
    return diag === 'MAS' || diag === 'SAM';
}

function solve(file) {
    // start top left, always look at the entire 3x3 square
    const rows = file.length - 2;
    const cols = file[0].length - 2;

    let sum = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const mid = file[r + 1][c + 1];
            if (mid !== 'A') {
                continue;
            }
            const left = file[r][c] + mid + file[r + 2][c + 2];
            const right = file[r][c + 2] + mid + file[r + 2][c];

            if (isMatch(left) && isMatch(right)) {
                sum += 1;
            }
        }
    }

    return sum;
}

async function main() {
    const file = await open(path.join(import.meta.dirname, 'input'));

    let input = [];
    for await (let line of file.readLines()) {
        input.push(line);
    }

    console.log("example:", solve(example));
    console.log("input:", solve(input));
}


main();

