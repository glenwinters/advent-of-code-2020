const readInput = async (): Promise<number[]> => {
  const file = await Deno.readTextFile("./input.txt");
  const lines = file.split("\n");
  const numbers = lines.map((line) => parseInt(line, 10));
  return numbers;
};

// Part A
const a = async (): Promise<number> => {
  const numbers = await readInput();

  // Start at i + 1 on the inner loop so you don't compare two numbers twice
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === 2020) {
        return numbers[i] * numbers[j];
      }
    }
  }
  throw new Error("No pair found!");
};

// Part B
const b = async (): Promise<number> => {
  const numbers = await readInput();

  // Start at i + 1 on the inner loop so you don't compare two numbers twice
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      // Move on if the first two numbers already exceed 2020 assuming the third
      // could potentially be 0
      if (numbers[i] + numbers[j] > 2020) {
        continue;
      }
      for (let k = j + 1; k < numbers.length; k++) {
        if (numbers[i] + numbers[j] + numbers[k] === 2020) {
          return numbers[i] * numbers[j] * numbers[k];
        }
      }
    }
  }
  throw new Error("No pair found!");
};

// Print answers
console.log(`a: ${await a()}`);
console.log(`b: ${await b()}`);

export {};
