import sys
import re
from pprint import pprint

# Parse input

lines = [l.rstrip("\n") for l in sys.stdin.read().split("\n")]
data = [int(line) for line in lines]
## Problem

## Part A
def has_sum_pair(nums, sum_):
    diffs = set()
    for num in nums:
        if num in diffs:
            return True 
        diffs.add(sum_ - num)

    return False

preamble_len = 25
invalid_num = None
for i in range(len(data)):
    if i < preamble_len:
        continue

    start = i - preamble_len
    if not has_sum_pair(data[start:i], data[i]):
        invalid_num = data[i]
        print(invalid_num)
        break

## Part B
start = 0
end = 1
sum_ = data[0] + data[1]
while sum_ != invalid_num:
    if sum_ < invalid_num:
        end += 1
    elif sum_ > invalid_num:
        if end == start + 1:
            end += 1
        start += 1
    
    sum_ = sum(data[start:end + 1])

sum_range = data[start:end + 1]
print(min(sum_range) + max(sum_range))