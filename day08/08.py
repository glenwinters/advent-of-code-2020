import sys
import re
from pprint import pprint

# Parse input

lines = [l.rstrip("\n") for l in sys.stdin.read().split("\n")]

## Problem
# operation
# * acc n: modify accumulator by n, which starts at 0
# * jmp n: jump n instructions (+1 means next instruction)
# * nop: skip


def to_instruction(line):
    op, arg = line.split(" ")
    return (op, int(arg))


instructions = [to_instruction(line) for line in lines]


def run(tweak = None):
    """Runs instructions with indicated tweak

    It runs until an infinite loop is detected or the program terminates.

    If tweak is passed, it modifies the nth instruction. If `nop`, change to jmp.
    If `jmp`, change to `nop`. If `acc`, do nothing.

    Returns boolean `infinite` and the last accumulator value.
    """
    i = 0
    acc = 0
    seen = set()
    infinite = True
    while i not in seen:
        seen.add(i)
        og_op, arg = instructions[i]

        if tweak == i:
            tweak_ops = {
                'nop': 'jmp',
                'jmp': 'nop',
                'acc': 'acc'
            }
            op = tweak_ops[og_op]
        else:
            op = og_op

        if op == "nop":
            i += 1
        elif op == "acc":
            acc += arg
            i += 1
        elif op == "jmp":
            i += arg

        if i == len(instructions):
            infinite = False
            break

    return infinite, acc

# Part A

infinite_a, acc_a = run()
print(acc_a)

# Part B

acc_b = None
for tweak_i in range(len(instructions)):
    inf, acc = run(tweak_i)
    if not inf:
        acc_b = acc
print(acc_b)