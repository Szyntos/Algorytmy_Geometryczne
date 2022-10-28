import json as js
import math

with open('datasets.json', 'r') as file:
    json = file.read()
datasets = js.loads(json)
file.close()
B = datasets[1]
B_part = []
for point in B:
    if 0 < point[0] < 100000000000000/5 and 0 < point[1] < 100000000000000/5:
        B_part.append(point)
l = 0
for point_1 in B_part:
    l = 0
    s = []
    for point_2 in B_part:
        if point_1 != point_2:
            s.append(math.sqrt((point_1[0]-point_2[0])**2 + (point_1[1] - point_2[1])**2))
    l += min(s)
print(l/len(B))
