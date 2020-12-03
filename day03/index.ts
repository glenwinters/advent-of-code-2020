import countBy from "https://deno.land/x/lodash@4.17.15-es/countBy.js";
import identity from "https://deno.land/x/lodash@4.17.15-es/identity.js";

const readInput = async (): Promise<string[][]> => {
  const file = await Deno.readTextFile("./input.txt");
  const lines = file.split("\n");
  return lines.map((line) => line.split(""));
};

interface Position {
  x: number;
  y: number;
}

class Toboggan {
  private position: Position = { x: 0, y: 0 };
  private treesSeen: number = 0;

  constructor(private grid: string[][]) {}

  /**
   * Moves the toboggan on the grid and tracks trees seen after movement.
   */
  move(x: number, y: number) {
    this.position = { x: this.position.x + x, y: this.position.y + y };
    if (this.position.x < 0) {
      throw new Error(
        `fell off left side of grid! ${this.position.x},${this.position.y}`,
      );
    }
    if (this.onGrid() && this.atTree()) {
      this.treesSeen += 1;
    }
  }

  atTree(): boolean {
    // Wrap grid infinitely to the right
    const gridWidth = this.grid[0].length;
    return this.grid[this.position.y][this.position.x % gridWidth] === "#";
  }

  onGrid(): boolean {
    return this.position.y < this.grid.length;
  }

  getTreesSeen(): number {
    return this.treesSeen;
  }

  printPosition(): void {
    console.log(`Position: ${this.position.x},${this.position.y}`);
  }

  /**
   * Runs a slope a given direction until it reaches the bottom.
   */
  runSlope(x: number, y: number): void {
    while (this.onGrid()) {
      this.move(x, y);
    }
  }
}

// Part A
const a = async (): Promise<number> => {
  const grid = await readInput();
  const toboggan = new Toboggan(grid);
  toboggan.runSlope(3, 1);
  return toboggan.getTreesSeen();
};

// Part B
const b = async (): Promise<number> => {
  const grid = await readInput();
  // Directions for each run
  const runs = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

  // Collect the number of trees seen for each run
  const treesSeenByRun = runs.map(([x, y]) => {
    const toboggan = new Toboggan(grid);
    toboggan.runSlope(x, y);
    return toboggan.getTreesSeen();
  });

  // Multiply all the values together
  const product = treesSeenByRun.reduce((memo, trees) => memo * trees, 1);
  return product;
};

// Print answers
console.log(`a: ${await a()}`);
console.log(`b: ${await b()}`);

export {};
