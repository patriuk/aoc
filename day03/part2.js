import { readFile } from "node:fs/promises";
import path from "node:path";

function isDigit(c) {
    return c >= '0' && c <= '9';
}

function multiply(s) {
    const result = {
        mul: 0,
        len: 0
    }

    const end = s.indexOf(')');
    if (end < 4) {
        return result;
    }

    result.len = end + 1;

    const pairs = s.split(',');
    const trimmed = pairs.map(p => Array.from(p).filter(c => isDigit(c)).join(''))
    const mul = Number(trimmed[0]) * Number(trimmed[1]);
    result.mul = isNaN(mul) ? 0 : mul;

    return result;
}

async function main() {
    const file = await readFile(
        path.join(import.meta.dirname, 'input'),
        { encoding: 'utf8' }
    );

    let enabled = true;
    let sum = 0;
    for (let i = 0; i < file.length - 3; i++) {
        if (file.slice(i, i + 4).includes('do()')) {
            enabled = true;
            i += 4;
        }

        if (file.slice(i, i + 7).includes("don't()")) {
            enabled = false;
            i += 7
        }

        const candidate = file.slice(i, i + 3);
        if (enabled && candidate === 'mul') {
            const { mul, len } = multiply(file.slice(i + 3, i + 12));
            sum += mul;
            i += len;
        }
    }

    // 108830766
    console.log(sum);
}

main();

