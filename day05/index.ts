const readInput = async (): Promise<string[]> => {
  const file = await Deno.readTextFile("./input.txt");
  const lines = file.split("\n");
  return lines;
};

// Problem
// 128 rows, 8 columns
// F means first half, B means second half
// L means first half, R means second half
// ID = row * 8 + column

const identifyRow = (code: string[]): number => {
  let start = 0;
  let end = 127;
  let half = 128 / 2;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === "B") {
      start += half;
    } else if (code[i] === "F") {
      end -= half;
    }
    half = half / 2;
  }
  return start;
};

const identifyCol = (code: string[]): number => {
  let start = 0;
  let end = 7;
  let half = 8 / 2;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === "R") {
      start += half;
    } else if (code[i] === "L") {
      end -= half;
    }
    half = half / 2;
  }
  return start;
};

const identifySeat = (code: string): { row: number; col: number } => {
  const chars = code.split("");
  const rowCode = chars.slice(0, 7);
  const colCode = chars.slice(7);

  return {
    row: identifyRow(rowCode),
    col: identifyCol(colCode),
  };
};

const identifySeatId = (code: string): number => {
  const seat = identifySeat(code);
  return seat.row * 8 + seat.col;
};

// Part A
const a = async () => {
  const codes = await readInput();
  const highest = codes.reduce((max, code) => {
    const seatId = identifySeatId(code);
    return seatId > max ? seatId : max;
  }, 0);

  return highest;
};

// Part B
const b = async () => {
  const codes = await readInput();
  const grid = new Array(128).fill(0).map(() => new Array(8).fill(0));
  codes.forEach((code) => {
    const seat = identifySeat(code);
    grid[seat.row][seat.col] = 1;
  });

  const free = grid.reduce((memo, col, rowIndex) => {
    const freeInRow = col.reduce((rowMemo, occupied, colIndex) => {
      if (occupied === 0) {
        rowMemo.push(`row ${rowIndex}, col ${colIndex}`);
      }
      return rowMemo;
    }, []);

    memo.push(freeInRow);
    return memo;
  }, []);
  console.log(free);
};

// Print answers
console.log(`a: ${await a()}`);
console.log(`b: ${await b()}`);

export {};
