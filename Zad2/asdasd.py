# Narzędzie jest oparte o kilka zewnętrznych bibliotek, które potrzebujemy najpierw zaimportować.
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.collections as mcoll
import matplotlib.colors as mcolors
from matplotlib.widgets import Button
import json as js

# Parametr określający jak blisko (w odsetku całego widocznego zakresu) punktu początkowego
# wielokąta musimy kliknąć, aby go zamknąć.
TOLERANCE = 0.15


def dist(point1, point2):
    return np.sqrt(np.power(point1[0] - point2[0], 2) + np.power(point1[1] - point2[1], 2))


# Klasa ta trzyma obecny stan wykresu oraz posiada metody, które mają zostać wykonane
# po naciśnięciu przycisków.
class _Button_callback(object):
    def __init__(self, scenes):
        self.i = 0
        self.scenes = scenes
        self.adding_points = False
        self.added_points = []
        self.adding_lines = False
        self.added_lines = []
        self.adding_rects = False
        self.added_rects = []

    def set_axes(self, ax):
        self.ax = ax

    # Metoda ta obsługuje logikę przejścia do następnej sceny.
    def next(self, event):
        self.i = (self.i + 1) % len(self.scenes)
        self.draw(autoscaling=True)

    # Metoda ta obsługuje logikę powrotu do poprzedniej sceny.
    def prev(self, event):
        self.i = (self.i - 1) % len(self.scenes)
        self.draw(autoscaling=True)

    # Metoda ta aktywuje funkcję rysowania punktów wyłączając równocześnie rysowanie
    # odcinków i wielokątów.
    def add_point(self, event):
        self.adding_points = not self.adding_points
        self.new_line_point = None
        if self.adding_points:
            self.adding_lines = False
            self.adding_rects = False
            self.added_points.append(PointsCollection([]))

    # Metoda ta aktywuje funkcję rysowania odcinków wyłączając równocześnie
    # rysowanie punktów i wielokątów.
    def add_line(self, event):
        self.adding_lines = not self.adding_lines
        self.new_line_point = None
        if self.adding_lines:
            self.adding_points = False
            self.adding_rects = False
            self.added_lines.append(LinesCollection([]))

    # Metoda ta aktywuje funkcję rysowania wielokątów wyłączając równocześnie
    # rysowanie punktów i odcinków.
    def add_rect(self, event):
        self.adding_rects = not self.adding_rects
        self.new_line_point = None
        if self.adding_rects:
            self.adding_points = False
            self.adding_lines = False
            self.new_rect()

    def new_rect(self):
        self.added_rects.append(LinesCollection([]))
        self.rect_points = []

    # Metoda odpowiedzialna za właściwą logikę rysowania nowych elementów. W
    # zależności od włączonego trybu dodaje nowe punkty, początek, koniec odcinka
    # lub poszczególne wierzchołki wielokąta. Istnieje ciekawa logika sprawdzania
    # czy dany punkt jest domykający dla danego wielokąta. Polega ona na tym, że
    # sprawdzamy czy odległość nowego punktu od początkowego jest większa od
    # średniej długości zakresu pomnożonej razy parametr TOLERANCE.
    def on_click(self, event):
        if event.inaxes != self.ax:
            return
        new_point = (event.xdata, event.ydata)
        if self.adding_points:
            self.added_points[-1].add_points([new_point])
            self.draw(autoscaling=False)
        elif self.adding_lines:
            if self.new_line_point is not None:
                self.added_lines[-1].add([self.new_line_point, new_point])
                self.new_line_point = None
                self.draw(autoscaling=False)
            else:
                self.new_line_point = new_point
        elif self.adding_rects:
            if len(self.rect_points) == 0:
                self.rect_points.append(new_point)
            elif len(self.rect_points) == 1:
                self.added_rects[-1].add([self.rect_points[-1], new_point])
                self.rect_points.append(new_point)
                self.draw(autoscaling=False)
            elif len(self.rect_points) > 1:
                if dist(self.rect_points[0], new_point) < (
                        np.mean([self.ax.get_xlim(), self.ax.get_ylim()]) * TOLERANCE):
                    self.added_rects[-1].add([self.rect_points[-1], self.rect_points[0]])
                    self.new_rect()
                else:
                    self.added_rects[-1].add([self.rect_points[-1], new_point])
                    self.rect_points.append(new_point)
                self.draw(autoscaling=False)

    # Metoda odpowiedzialna za narysowanie całego wykresu. Warto zauważyć,
    # że zaczyna się ona od wyczyszczenia jego wcześniejszego stanu. Istnieje w
    # niej nietrywialna logika zarządzania zakresem wykresu, tak żeby, w zależności
    # od ustawionego parametru autoscaling, uniknąć sytuacji, kiedy dodawanie
    # nowych punktów przy brzegu obecnie widzianego zakresu powoduje niekorzystne
    # przeskalowanie.
    def draw(self, autoscaling=True):
        if not autoscaling:
            xlim = self.ax.get_xlim()
            ylim = self.ax.get_ylim()
        self.ax.clear()
        for collection in (self.scenes[self.i].points + self.added_points):
            if len(collection.points) > 0:
                self.ax.scatter(*zip(*(np.array(collection.points))), **collection.kwargs)
        for collection in (self.scenes[self.i].lines + self.added_lines + self.added_rects):
            self.ax.add_collection(collection.get_collection())
        labl = self.scenes[self.i].label
        self.ax.autoscale(autoscaling)
        if not autoscaling:
            self.ax.set_xlim(xlim)
            self.ax.set_ylim(ylim)
        plt.title(labl)
        if self.scenes[self.i].equal:
            self.ax.set_aspect('equal')
        else:
            self.ax.set_aspect('auto')
        plt.draw()


# Klasa Scene odpowiada za przechowywanie elementów, które mają być
# wyświetlane równocześnie. Konkretnie jest to lista PointsCollection i
# LinesCollection.
class Scene:
    def __init__(self, points=[], lines=[], label="", equal=0):
        self.points = points
        self.lines = lines
        self.label = label
        self.equal = equal


# Klasa PointsCollection gromadzi w sobie punkty jednego typu, a więc takie,
# które zostaną narysowane w takim samym kolorze i stylu. W konstruktorze
# przyjmuje listę punktów rozumianych jako pary współrzędnych (x, y). Parametr
# kwargs jest przekazywany do wywołania funkcji z biblioteki MatPlotLib przez
# co użytkownik może podawać wszystkie parametry tam zaproponowane.
class PointsCollection:
    def __init__(self, points, **kwargs):
        self.points = points
        self.kwargs = kwargs

    def add_points(self, points):
        self.points = self.points + points


# Klasa LinesCollection podobnie jak jej punktowy odpowiednik gromadzi
# odcinki tego samego typu. Tworząc ją należy podać listę linii, gdzie każda
# z nich jest dwuelementową listą punktów – par (x, y). Parametr kwargs jest
# przekazywany do wywołania funkcji z biblioteki MatPlotLib przez co użytkownik
# może podawać wszystkie parametry tam zaproponowane.
class LinesCollection:
    def __init__(self, lines, **kwargs):
        self.lines = lines
        self.kwargs = kwargs

    def add(self, line):
        self.lines.append(line)

    def get_collection(self):
        return mcoll.LineCollection(self.lines, **self.kwargs)


# Klasa Plot jest najważniejszą klasą w całym programie, ponieważ agreguje
# wszystkie przygotowane sceny, odpowiada za stworzenie wykresu i przechowuje
# referencje na przyciski, dzięki czemu nie będą one skasowane podczas tzw.
# garbage collectingu.
class Plot:
    def __init__(self, scenes=[Scene()], points=[], lines=[], json=None):
        if json is None:
            self.scenes = scenes
            if points or lines:
                self.scenes[0].points = points
                self.scenes[0].lines = lines
        else:
            self.scenes = [Scene([PointsCollection(pointsCol) for pointsCol in scene["points"]],
                                 [LinesCollection(linesCol) for linesCol in scene["lines"]])
                           for scene in js.loads(json)]

    # Ta metoda ma szczególne znaczenie, ponieważ konfiguruje przyciski i
    # wykonuje tym samym dość skomplikowaną logikę. Zauważmy, że konfigurując każdy
    # przycisk podajemy referencję na metodę obiektu _Button_callback, która
    # zostanie wykonana w momencie naciśnięcia.
    def __configure_buttons(self):
        plt.subplots_adjust(bottom=0.2)
        ax_prev = plt.axes([0.6, 0.05, 0.15, 0.075])
        ax_next = plt.axes([0.76, 0.05, 0.15, 0.075])
        ax_add_point = plt.axes([0.44, 0.05, 0.15, 0.075])
        ax_add_line = plt.axes([0.28, 0.05, 0.15, 0.075])
        ax_add_rect = plt.axes([0.12, 0.05, 0.15, 0.075])
        b_next = Button(ax_next, 'Następny')
        b_next.on_clicked(self.callback.next)
        b_prev = Button(ax_prev, 'Poprzedni')
        b_prev.on_clicked(self.callback.prev)
        b_add_point = Button(ax_add_point, 'Dodaj punkt')
        b_add_point.on_clicked(self.callback.add_point)
        b_add_line = Button(ax_add_line, 'Dodaj linię')
        b_add_line.on_clicked(self.callback.add_line)
        b_add_rect = Button(ax_add_rect, 'Dodaj figurę')
        b_add_rect.on_clicked(self.callback.add_rect)
        return [b_prev, b_next, b_add_point, b_add_line, b_add_rect]

    def add_scene(self, scene):
        self.scenes.append(scene)

    def add_scenes(self, scenes):
        self.scenes = self.scenes + scenes

    # Metoda toJson() odpowiada za zapisanie stanu obiektu do ciągu znaków w
    # formacie JSON.
    def toJson(self):
        return js.dumps([{"points": [np.array(pointCol.points).tolist() for pointCol in scene.points],
                          "lines": [linesCol.lines for linesCol in scene.lines]}
                         for scene in self.scenes])

        # Metoda ta zwraca punkty dodane w trakcie rysowania.

    def get_added_points(self):
        if self.callback:
            return self.callback.added_points
        else:
            return None

    # Metoda ta zwraca odcinki dodane w trakcie rysowania.
    def get_added_lines(self):
        if self.callback:
            return self.callback.added_lines
        else:
            return None

    # Metoda ta zwraca wielokąty dodane w trakcie rysowania.
    def get_added_figure(self):
        if self.callback:
            return self.callback.added_rects
        else:
            return None

    # Metoda ta zwraca punkty, odcinki i wielokąty dodane w trakcie rysowania
    # jako scenę.
    def get_added_elements(self):
        if self.callback:
            return Scene(self.callback.added_points, self.callback.added_lines + self.callback.added_rects)
        else:
            return None

    # Główna metoda inicjalizująca wyświetlanie wykresu.
    def draw(self, equal=0):
        plt.close()
        fig = plt.figure()
        self.callback = _Button_callback(self.scenes)
        self.widgets = self.__configure_buttons()
        ax = plt.axes(autoscale_on=False)
        if equal:
            ax.set_aspect('equal')
        self.callback.set_axes(ax)
        fig.canvas.mpl_connect('button_press_event', self.callback.on_click)
        plt.show()
        self.callback.draw()




import random, math, numpy, time, functools, collections
"""Generowanie zbiorow danych"""



def generate_datasets(A_req=[100, [-100, 100]], B_req=[100, (0, 0), 10], C_req=[100, (-10, -10), (10, 10)], D_req=[(0, 0), 10, 25, 20]):
    # A_req = [number_of_points, [interval_a, interval_b]]
    # B_req = [number_of_points, centre_point, radius]
    # C_req = [number_of_points, left_down, right_up]
    # D_req = [left_down, a, number_of_points_on_axes, number_of_points_on_diagonals]

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
    dataset_D = [D_req[0], (D_req[0][0], D_req[0][1]+D_req[1]), (D_req[0][0]+D_req[1], D_req[0][1]), (D_req[0][0]+D_req[1], D_req[0][1]+D_req[1])] + [(lambda x: (D_req[0][0], D_req[0][1] + x*D_req[1]))(random.random()) for _ in range(D_req[2])] + [(lambda x: (D_req[0][0] + x*D_req[1], D_req[0][1]))(random.random()) for _ in range(D_req[2])] + [(lambda x: (D_req[0][0] + x*D_req[1], D_req[0][1] + x*D_req[1]))(random.random()) for _ in range(D_req[3])] + [(lambda x: (D_req[0][0] + x*D_req[1], D_req[0][1] + D_req[1]-x*D_req[1]))(random.random()) for _ in range(D_req[3])]
    return [dataset_A, dataset_B, dataset_C, dataset_D]



"""Zapisywanie danych do pliku"""
# jsonStr = js.dumps(datasets)
# with open("datasets.json", 'w') as file:
#     file.write(jsonStr)
# file.close()

"""Odczytywanie danych z pliku"""
# with open('datasets.json', 'r') as file:
#     json = file.read()
# datasets = js.loads(json)
# file.close()

def det(a, b, c, zeros=0, type_of_det=0):
    eps = 10**(-10)
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
import seaborn as sns
# d_x = [x[0] for x in datasets[3]]
# d_y = [x[1] for x in datasets[3]]
#
# sns.jointplot(x=d_x, y=d_y)



datasets = generate_datasets(A_req=[100, [-100, 100]], B_req=[100, (0, 0), 10], C_req=[100, (-10, -10), (10, 10)], D_req=[(0, 0), 10, 25, 20])
datasets[0] = [(1.2972890319602897, 30.867847511123045), (90.73613709884685, 63.553463527525366), (-87.57271895134112, 95.38451623530904), (-16.577621699214333, 25.61486950205247), (-21.5673277839134, 39.29872934674526), (69.70414208264799, -14.182836945130518), (-49.583539128511454, 95.3105824740756), (86.37598046256812, -54.63889864303606), (25.85482622450128, -3.801200831814768), (89.76835851718107, -46.834435766929474), (-0.0516051712914134, 45.6392761918608), (83.92337070939519, 32.58613727421982), (9.696890460922901, 84.7992245361614), (40.98580845119341, -19.863487804619353), (15.129213923620881, -99.69357042321423), (-0.5081464911309155, -80.46698277078221), (18.260641180156128, 69.74850708175094), (-79.27534038117801, -8.968649967950455), (-74.93624366601551, -97.39698577504903), (-30.639020166750484, -57.02344117403106), (-85.74665249918085, 88.90119968916366), (52.316112824039095, 41.690607109743524), (64.45633012555061, 68.70191013186886), (97.78700923737881, 55.215892824006005), (-14.905794138558718, 11.884016335662338), (-82.91981835562261, -63.112177095227494), (-72.99393687995632, -39.45057776432846), (-90.35816479769696, 41.59282866288706), (99.04009974491166, 18.35798900836781), (-8.338524611255949, -49.46515222377772), (-47.89972038606827, 48.42725573794701), (51.59293840801641, -7.050364143843552), (-85.85098839739962, -79.16568301025539), (31.791204093753038, 28.998169841682), (31.631617651576192, 43.29285946779652), (-58.83557637222039, -17.820642486899246), (49.13303058274718, 65.56247451824729), (87.31215479754411, 4.34105952021433), (-13.11700269991347, 4.589001820001798), (4.776100430677005, 16.98550041627513), (34.78010955091432, 61.317113530169564), (64.56650689990724, 95.16741981954047), (66.89518704619405, -67.57782251508182), (-5.178501119197463, 20.61678125075123), (-19.569456260945728, -57.68016559270277), (-15.618805832476838, 37.85243439318785), (-27.982189593536845, -92.71140392287293), (-65.91633158682075, 89.90183371579087), (27.414087772836453, 98.95710840341263), (74.89875547635631, -25.872114841216543), (-50.721723336977554, 90.24952765380695), (87.0244670786175, -68.08928453944303), (52.438631424981935, 64.60127693633896), (47.97433956670173, -66.5575065040962), (-50.34745420396614, 15.693660622131262), (-45.56417483208066, -10.821089578899134), (-37.629737887407714, 32.109992722786075), (-67.2754614362322, 58.37881795444616), (18.68875602446974, -30.663553783275034), (-15.999797753088643, -6.848097163929339), (-72.34016968077741, 89.74424977569615), (-26.547768859877195, -73.37470700765053), (-38.09119847476803, 84.68884987819936), (95.92320064858953, 4.481258397245512), (75.28930967813821, -4.417491885746003), (-11.160686740414079, -67.77827556709653), (-55.13601402397763, -70.82632551667763), (-93.21000663764146, -31.55776774432877), (-37.79314183108633, -92.68271099107264), (64.4697233260598, 68.59569601403572), (46.606507415604796, -5.821496050638444), (-94.53859976294527, 22.486966125866388), (32.88024889220645, 46.84407185904203), (7.603458584084805, -44.96271472369568), (71.41175984853672, 92.82987477742682), (52.299022381903484, -89.36164314746722), (-43.372154664777305, 38.1682395943412), (-28.95180232381327, 43.319542277643336), (-94.10918547289388, 67.52986418044739), (78.08084751292682, 75.59784528426036), (33.0018111518051, -62.824122990011965), (-66.82898771012523, 93.52571754246216), (31.200026009115504, -34.26535171762757), (-88.59918232486555, 0.9387793060497245), (62.929093337823815, -64.16190495183088), (50.370200545463376, -34.83457248643333), (78.13304597084155, -48.964189181987706), (-27.810480193633836, 37.65351830770504), (-61.214426556615045, -53.31458881318976), (1.185157347691927, -63.124291480685216), (97.45834430923307, 19.478971934312497), (49.698449142537726, -59.998958040595255), (-0.5475789143518028, 17.09646025260905), (37.51166945239325, -74.02306330886219), (85.19761415832642, -30.288653921990957), (57.492882216391905, -1.2735085617202344), (15.717995791224055, 51.213345747634264), (-67.68284671071684, 65.33989433026042), (49.73506445219232, 99.84092602931122), (2.3558786838707704, -68.32111426100803)]
scenes = [Scene([PointsCollection(datasets[0])]), Scene([PointsCollection(datasets[1])]), Scene([PointsCollection(datasets[2])]), Scene([PointsCollection(datasets[3])], equal=1)]

# datasets[0] = [(lambda x: (x, 1/20*x+1/20))(random.random()*2000-1000) for _ in range(1000)]
def arr_to_lines(array):
    lines = []
    i = 0
    while i < len(array) - 1:
        lines.append([array[i], array[i+1]])
        i += 1
    return lines
# def Graham(array_o):
#     array= array_o.copy()
#     m_point = min(array, key=lambda x: (x[1], x[0]))
#     array.sort(key=functools.cmp_to_key(lambda x, y: det(m_point, x, y)))
#     array.reverse()
#     s = [Scene([PointsCollection(array, color="#fafafa")]), Scene([PointsCollection(array, color="#fafafa"),
#                      PointsCollection(array[:1], color="#ff00ff")]), Scene([PointsCollection(array, color="#fafafa"),
#                      PointsCollection(array[:2], color="#ff00ff")], [LinesCollection(arr_to_lines(array[:2]))]), Scene([PointsCollection(array, color="#fafafa"),
#                      PointsCollection(array[:3], color="#ff00ff")], [LinesCollection(arr_to_lines(array[:3]))])]
#     q  = [[] for _ in array]
#     i = 0
#     if len(array) <= 3:
#         return s
#     for i in range(3):
#         q[i] = array[i]
#     i += 1
#     t = 2
#     while i < len(array):
#         if det(q[t-1], q[t], array[i], zeros=1) > 0:
#             t += 1
#             q[t] = array[i]
#             i += 1
#         else:
#             t -= 1
#             if t == 0:
#                 t += 1
#                 q[t] = array[i]
#                 i += 1
#         s.append(Scene([PointsCollection(array, color="#fafafa"),
#                      PointsCollection(q[:t+1], color="#ff00ff")], [LinesCollection(arr_to_lines(q[:t+1]))]))
#
#     s.append(Scene([PointsCollection(array, color="#fafafa"),
#                      PointsCollection(q[:t+1], color="#ff00ff")], [LinesCollection(arr_to_lines(q[:t+1]+[q[0]]))]))
#     return q[:t+1], s
# q, scenes = Graham(datasets[0])
# print(q)
def Jarvis(array):
    m_point = min(array, key=lambda x: (x[1], x[0]))
    q = [m_point]
    s = [Scene([PointsCollection(array, color="#fafafa")])]
    s = [(Scene([PointsCollection(array, color="#fafafa"), PointsCollection(q, color="#ff00ff")]))]
    relative_min_point = (m_point[0]-100, m_point[1])
    i = 0
    while i < len(array)-1:
        if det(m_point, relative_min_point, array[i]) < 0:
            if array[i] != m_point:
                relative_min_point = array[i]
        i += 1
    a = relative_min_point
    q.append(relative_min_point)
    s.append(Scene([PointsCollection(array, color="#fafafa"), PointsCollection(q, color="#ff00ff")], [LinesCollection(arr_to_lines(q))]))
    while a != m_point:
        relative_min_point = q[0]
        i = 0
        while i < len(array)-1:
            if det(a, relative_min_point, array[i]) < 0:
                if array[i] != a:
                    relative_min_point = array[i]
            i += 1
        a = relative_min_point
        q.append(relative_min_point)
        s.append(Scene([PointsCollection(array, color="#fafafa"), PointsCollection(q, color="#ff00ff")], [LinesCollection(arr_to_lines(q))]))
    return q[:-1], s

q, scenes = Jarvis(datasets[0])
print(q)
# scenes = [Scene([PointsCollection(datasets[0], color="#fafafa"),
#                      PointsCollection(q, color="#ff00ff")])]
# print(q)
# print(datasets[0])
# scenes = [Scene([PointsCollection(datasets[0], color="#ffffff")], [PointsCollection([datasets[0][x], (-100, -100), (100, 100)])]) for x in range(len(datasets[0]))]
# scenes = [Scene([PointsCollection(datasets[0], color="#ffffff"),
#                      PointsCollection(q, color="#ff00ff")])] + [Scene([PointsCollection(datasets[0], color="#ffffff"),
#                      PointsCollection([datasets[0][x], m_point], color="#ad8cff", s=40)], [LinesCollection([[datasets[0][x], m_point]])]) for x in range(len(datasets[0]))]
plot3 = Plot(scenes)
plot3.draw()