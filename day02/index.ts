import countBy from "https://deno.land/x/lodash@4.17.15-es/countBy.js";
import identity from "https://deno.land/x/lodash@4.17.15-es/identity.js";

const readInput = async (): Promise<string[]> => {
  const file = await Deno.readTextFile("./input.txt");
  const lines = file.split("\n");
  return lines;
};

// Part A
const a = async (): Promise<number> => {
  const lines = await readInput();
  const re = /^(?<min>\d+)-(?<max>\d+) (?<letter>[a-z]): (?<password>[a-z]+)$/g;

  const validPasswordCount = lines.reduce(
    (count: number, line: string): number => {
      // Reset stateful RegExp object
      re.lastIndex = 0;

      const matches = re.exec(line);
      if (!matches || !matches.groups) {
        throw new Error(`Failed to parse line: ${line}`);
      }

      const min = matches.groups.min;
      const max = matches.groups.max;
      const letter = matches.groups.letter;
      const password = matches.groups.password;

      // {a: 1, b: 3, c: 1} for abcbb
      const letterCounts = countBy(password, identity);

      // Increment the count if the letter count is within the bounds
      if (letterCounts[letter] >= min && letterCounts[letter] <= max) {
        return count + 1;
      }
      return count;
    },
    0,
  );

  return validPasswordCount;
};

// Part B
const b = async (): Promise<number> => {
  const lines = await readInput();
  const re = /^(?<min>\d+)-(?<max>\d+) (?<letter>[a-z]): (?<password>[a-z]+)$/g;

  const validPasswordCount = lines.reduce(
    (count: number, line: string): number => {
      // Reset stateful RegExp object
      re.lastIndex = 0;

      const matches = re.exec(line);
      if (!matches || !matches.groups) {
        throw new Error(`Failed to parse line: ${line}`);
      }

      const pos1 = parseInt(matches.groups.min, 10);
      const pos2 = parseInt(matches.groups.max, 10);
      const letter = matches.groups.letter;
      const password = matches.groups.password;

      // Increment the count if the letter count is within the bounds
      if ((password[pos1 - 1] === letter) !== (password[pos2 - 1] === letter)) {
        return count + 1;
      }
      return count;
    },
    0,
  );

  return validPasswordCount;
};

// Print answers
console.log(`a: ${await a()}`);
console.log(`b: ${await b()}`);

export {};
