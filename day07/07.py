import sys
import re
from pprint import pprint

# Parse input

lines = [l.rstrip("\n") for l in sys.stdin.read().split("\n")]

# Build bag graph

bag_graph = {}
for line in lines:
    bag_match = re.match(r"^([a-z]+ [a-z]+)", line)
    bag = bag_match.groups()[0]
    bags_held = re.findall(r"(?P<n>[0-9]+) (?P<name>[a-z]+ [a-z]+)", line)

    bag_graph[bag] = [[int(t[0]), t[1]] for t in bags_held]
    # print(bag)
    # print(bags_held)
# pprint(bag_graph)

# Part A

def has_bag(graph, bag, query):
    bags_held = graph[bag]
    if len(bags_held) == 0:
        return False
    elif query in [b[1] for b in bags_held]:
        return True
    else:
        return any(has_bag(graph, b[1], query) for b in bags_held)

a = sum(
    [1 if has_bag(bag_graph, bag, "shiny gold") else 0 for bag in bag_graph]
)
print(a)

# Part B

def count_bags(graph, bag):
    bags_held = graph[bag]

    bag_count = sum(b[0] for b in bags_held)
    inner_bag_count = sum(b[0] * count_bags(graph, b[1]) for b in bags_held)
    return bag_count + inner_bag_count

b = count_bags(bag_graph, 'shiny gold')
print(b)