import uniq from "https://deno.land/x/lodash@4.17.15-es/uniq.js";

const readInput = async (): Promise<string[]> => {
  const file = await Deno.readTextFile("./input.txt");
  const groups = file.split("\n\n");
  return groups;
};

// Problem
// Answers to 26 questions in groups

const countOneYes = (group: string): number => {
  const answers = group.split("\n").join(" ").split("");
  const uniqueAnswers = uniq(answers).filter((s) => s !== " ");
  return uniqueAnswers.length;
};

const countAllYes = (group: string): number => {
  const answers = group.split("\n").join(" ").split(" ");
  const alpha = "abcdefghijklmnopqrstuvwxyz";

  const finalCount = alpha.split("").reduce((count, letter) => {
    let pass = true;
    answers.forEach((answer) => {
      if (!answer.includes(letter)) {
        pass = false;
      }
    });

    return pass ? count + 1 : count;
  }, 0);

  return finalCount;
};
// Part A
const a = async () => {
  const groups = await readInput();
  const sum = groups.map(countOneYes).reduce((memo, n) => memo + n, 0);
  return sum;
};

// Part B
const b = async () => {
  const groups = await readInput();
  const sum = groups.map(countAllYes).reduce((memo, n) => memo + n, 0);
  return sum;
};

// Print answers
console.log(`a: ${await a()}`);
console.log(`b: ${await b()}`);

export {};
