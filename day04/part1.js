import { open } from "fs/promises";
import path from "node:path";

const example = [
    '....XXMAS.',
    '.SAMXMS...',
    '...S..A...',
    '..A.A.MS.X',
    'XMASAMX.MM',
    'X.....XA.A',
    'S.S.S.S.SS',
    '.A.A.A.A.A',
    '..M.M.M.MM',
    '.X.X.XMASX'
];
// 18 XMAS

function outOfBounds(x, y, rows, cols) {
    return !(x >= 0 && x < rows && y >= 0 && y < cols);
}

function solve(file) {
    const dirs = [ // [row, col]
        [0, 1], // right
        [1, 1], // diag right
        [1, 0], // down
        [1, -1] // diag left
    ];

    const rows = file.length;
    const cols = file[0].length;
    const target = 'XMAS';
    const rTarget = 'SAMX';

    let sum = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            for (let [dr, dc] of dirs) {
                let candidate = "";
                for (let i = 0; i < target.length; i++) {
                    const x = r + dr * i;
                    const y = c + dc * i;
                    if (outOfBounds(x, y, rows, cols)) {
                        break;
                    }
                    candidate += file[x][y];
                }
                if (candidate === target || candidate === rTarget) {
                    sum += 1;
                }
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

