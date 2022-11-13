import random, time, math, functools

def generate_datasets(A_req=[100, [-100, 100]], B_req=[100, (0, 0), 10], C_req=[100, (-10, -10), (10, 10)], D_req=[25, 20, (0, 0), 10]):
    # A_req = [number_of_points, [interval_a, interval_b]]
    # B_req = [number_of_points, centre_point, radius]
    # C_req = [number_of_points, left_down, right_up]
    # D_req = [number_of_points_on_axes, number_of_points_on_diagonals, left_down, a]

    def generate_random_point_on_a_rectangle(ld, ru, x):
        if random.random() < abs(ru[0]-ld[0])/(abs(ru[1] - ld[1])+abs(ru[0]-ld[0])):
            if random.random() < 0.5: return ld[0] + x * abs(ru[0] - ld[0]), ru[1]
            else: return ld[0] + x * abs(ru[0] - ld[0]), ld[1]
        else:
            if random.random() < 0.5: return ru[0], ld[1] + x * abs(ru[1] - ld[1])
            else: return ld[0], ld[1] + x * abs(ru[1] - ld[1])

    dataset_A = [(random.uniform(A_req[1][0], A_req[1][1]), random.uniform(A_req[1][0], A_req[1][1])) for _ in range(A_req[0])]
    dataset_B = [(lambda x: (B_req[1][0] + B_req[2]*math.sin(x), B_req[1][1] + B_req[2]*math.cos(x)))(random.random()*2*3.1415) for _ in range(B_req[0])]
    dataset_C = [generate_random_point_on_a_rectangle(C_req[1], C_req[2], random.random()) for _ in range(C_req[0])]
    dataset_D = [D_req[2], (D_req[2][0], D_req[2][1]+D_req[3]), (D_req[2][0]+D_req[3], D_req[2][1]), (D_req[2][0]+D_req[3], D_req[2][1]+D_req[3])] + [(lambda x: (D_req[2][0], D_req[2][1] + x*D_req[3]))(random.random()) for _ in range(D_req[0])] + [(lambda x: (D_req[2][0] + x*D_req[3], D_req[2][1]))(random.random()) for _ in range(D_req[0])] + [(lambda x: (D_req[2][0] + x*D_req[3], D_req[2][1] + x*D_req[3]))(random.random()) for _ in range(D_req[1])] + [(lambda x: (D_req[2][0] + x*D_req[3], D_req[2][1] + D_req[3]-x*D_req[3]))(random.random()) for _ in range(D_req[1])]
    return [dataset_A, dataset_B, dataset_C, dataset_D]


def det(a, b, c, zeros=0, type_of_det=1):
    eps = 10**(-12)
    # eps = 1
    if type_of_det == 0:
        det_v = (a[0]*b[1]+b[0]*c[1]+a[1]*c[0]-c[0]*b[1]-b[0]*a[1]-c[1]*a[0])
    else:
        det_v = ((a[0]-c[0])*(b[1]-c[1])-(b[0]-c[0])*(a[1]-c[1]))
    if 0-eps < det_v < 0+eps:
        if zeros:
            return 0
        return ((a[0]-c[0])**2 + (a[1]-c[1])**2) - ((a[0]-b[0])**2 + (a[1]-b[1])**2)
    elif det_v < 0:
        return -1
    else:
        return 1

def Graham_Clean(array_copied_shuffled):
    s = []
    array= array_copied_shuffled
    m_point = min(array, key=lambda x: (x[1], x[0]))
    array.sort(key=functools.cmp_to_key(lambda x, y: det(m_point, x, y)))
    array.reverse()
    q  = [[] for _ in array]
    i = 0
    if len(array) <= 3:
        return s
    for i in range(3):
        q[i] = array[i]
    i += 1
    t = 2
    while i < len(array):
        if det(q[t-1], q[t], array[i], zeros=1) > 0:
            t += 1
            q[t] = array[i]
            i += 1
        else:
            t -= 1
            if t == 0:
                t += 1
                q[t] = array[i]
                i += 1
    return q[:t+1], s
def Jarvis_Clean(array_copied_shuffled):
    array = array_copied_shuffled
    s = []
    m_point = min(array, key=lambda x: (x[1], x[0]))
    q = [m_point]
    relative_min_point = (m_point[0]-100, m_point[1])
    i = 0
    while i < len(array):
        determinant = det(m_point, relative_min_point, array[i], 1)
        if (determinant < 0 and array[i] != m_point) or (determinant == 0 and array[i] != m_point and (relative_min_point[0] - m_point[0])**2 + (relative_min_point[1] - m_point[1])**2 < (array[i][0] - m_point[0])**2 + (array[i][1] - m_point[1])**2):
            if array[i] != m_point:
                relative_min_point = array[i]
        i += 1
    a = relative_min_point
    q.append(relative_min_point)
    iterator = 0
    while a != m_point:
        if iterator > len(array)*1.5:
            break
        iterator += 1
        relative_min_point = q[0]
        i = 0
        while i < len(array):
            determinant = det(a, relative_min_point, array[i], 1)
            if (determinant < 0 and array[i] != a) or (determinant == 0 and array[i] != a and (relative_min_point[0] - a[0])**2 + (relative_min_point[1] - a[1])**2 < (array[i][0] - a[0])**2 + (array[i][1] - a[1])**2):
                relative_min_point = array[i]
            i += 1
        if relative_min_point != q[0]:
            while det(q[-2], q[-1], relative_min_point, 1) == 0:
                if len(q) > 1:
                    q.pop()
                if len(q) == 1:
                    break
        a = relative_min_point
        q.append(relative_min_point)
    return q[:-1], s
def Graham_Time(array):
    n = 10
    T = 0
    array_o = array.copy()
    for _ in range(n):
        array_o.sort(key=lambda x:random.random())
        start = time.time()
        Graham_Clean(array_o)
        stop = time.time()
        T += stop - start
    T /= n
    return T
def Jarvis_Time(array):
    n = 10
    T = 0
    array_o = array.copy()
    for powt in range(n):
        print(powt)
        array_o.sort(key=lambda x:random.random())
        start = time.time()
        Jarvis_Clean(array_o)
        stop = time.time()
        T += stop - start
    T /= n
    return T
def time_datasets(datasets):
    dataset_names = ["A", "B", "C", "D"]
    i = 0
    for current_dataset in datasets:
        # print(dataset_names[i])
        array_o = current_dataset.copy()
        array_o.sort(key=lambda x:random.random())
        print("Graham:" + "\t" + str(dataset_names[i]) + "\t" + str(Graham_Time(array_o)))
        array_o.sort(key=lambda x:random.random())
        print("Jarvis" + "\t" + str(dataset_names[i]) + "\t" + str(Jarvis_Time(array_o)))
        i += 1


datasets_to_time = [generate_datasets(A_req=[3*10**3, [-100, 100]], B_req=[3*10**3, (0, 0), 10], C_req=[3*10**3, (-10, -10), (10, 10)], D_req=[3*10**3//2, 3*10**3//2, (0, 0), 10])]

i = 0
for dataset_type in datasets_to_time:
    print(["zbior_10**"+str(a) for a in range(1, 5)][i])
    i += 1
    # scenes_four += generate_four_scenes(dataset_type)
    time_datasets(dataset_type)