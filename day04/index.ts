interface Passport {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid?: string;
}

const readInput = async (): Promise<any> => {
  const file = await Deno.readTextFile("./input.txt");
  const lines = file.split("\n\n");
  return lines;
};

const processPassport = (rawPassport: string): object => {
  const fields = rawPassport.split("\n").join(" ").split(" ");
  const passport = fields.reduce((memo, field) => {
    const [key, value] = field.split(":");
    memo[key] = value;
    return memo;
  }, {} as { [key: string]: string });
  return passport;
};

// Part A
const a = async () => {
  const rawPassports = await readInput();
  const passports = rawPassports.map(processPassport);

  const validCount = passports.reduce(
    (memo: number, passport: Partial<Passport>) => {
      const keys = Object.keys(passport);
      const valid = keys.length === 8 ||
        (keys.length === 7 && !keys.includes("cid"));
      return valid ? memo + 1 : memo;
    },
    0,
  );

  return validCount;
};

const dateInRange = (
  value: string | undefined,
  start: number,
  finish: number,
): boolean => {
  if (!value) {
    return false;
  }
  if (value.length !== 4) {
    return false;
  }
  const num = parseInt(value, 10);
  return !isNaN(num) && (num >= start && num <= finish);
};

const checkHeight = (value: string): boolean => {
  const re = /^(?<number>[0-9]+)(?<measurement>in|cm)$/;
  const matches = re.exec(value);
  if (matches == null) {
    return false;
  }
  const measurement = matches?.groups?.measurement;
  const numberRaw = matches?.groups?.number;
  if (!measurement || !numberRaw) {
    return false;
  }

  const number = parseInt(numberRaw, 10);
  if (isNaN(number)) {
    return false;
  }

  if (measurement === "in") {
    return number >= 59 && number <= 76;
  } else if (measurement == "cm") {
    return number >= 150 && number <= 193;
  }

  return false;
};

// Part B
const b = async () => {
  const rawPassports = await readInput();
  const passports = rawPassports.map(processPassport);

  const validCount = passports.reduce(
    (memo: number, passport: Partial<Passport>) => {
      const keys = Object.keys(passport);

      const meetsRequiredFields = (keys.length === 8 ||
        (keys.length === 7 && !keys.includes("cid")));
      const validByr = dateInRange(passport.byr, 1920, 2002);
      const validIyr = dateInRange(passport.iyr, 2010, 2020);
      const validEyr = dateInRange(passport.eyr, 2020, 2030);
      const validHgt = checkHeight(passport.hgt || "");
      const validHcl = /^#[0-9a-f]{6}$/.test(passport.hcl || "");
      const validEcl = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
        .includes((passport.ecl || ""));
      const validPid = /^[0-9]{9}$/.test(passport.pid || "");

      const valid = meetsRequiredFields && validByr && validIyr && validEyr &&
        validHgt && validHcl && validEcl && validPid;
      return valid ? memo + 1 : memo;
    },
    0,
  );

  return validCount;
};

// Print answers
console.log(`a: ${await a()}`);
console.log(`b: ${await b()}`);

export {};
