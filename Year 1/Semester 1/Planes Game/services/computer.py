from random import randint

data_set_easy = [['A3N', 'A7N', 'G4E'], ['B3W', 'G3S', 'H6S'], ['A3N', 'D5W', 'E4N'],
                 ['B5W', 'D5E', 'G4E'], ['D3S', 'D4E', 'F1E'], ['F1W', 'E8E', 'B4W']]

data_set_normal = [['A3N', 'B5N', 'G9S', 'I3W'], ['A3N', 'B5N', 'G9S', 'I3W'], ['A3N', 'B5N', 'G9S', 'I3W'],
                   ['A3N', 'B5N', 'G9S', 'I3W'], ['A3N', 'B5N', 'G9S', 'I3W'], ['A3N', 'B5N', 'G9S', 'I3W']]


class ComputerService:
    def __init__(self, computer_board):
        self.__computer_board = computer_board

    @property
    def board(self):
        # Getter for the board
        return self.__computer_board

    def generate_planes(self):

        """
        This function generates planes for the computer
        :return:
        """

        data_set = []

        if self.__computer_board.difficulty == 0:
            data_set = data_set_easy[randint(0, 5)]
        elif self.__computer_board.difficulty == 1:
            data_set = data_set_normal[randint(0, 5)]

        for item in data_set:
            x, y, orientation = 0, 0, 0
            items = list(item)
            if len(items) == 3:
                x, y, orientation = ord(items[0]) - 65, int(items[1]), items[2]
            elif len(items) == 4:
                x, y, orientation = ord(items[0]) - 65, int(items[1]) * 10 + int(items[2]), items[3]

            self.__computer_board.add_plane(x, y - 1, orientation)

    def get_hit(self, x, y):
        """
        This function registers if a given input coordinates are crashes, hits or nothings and also marks the hit spot with X
        :param x:
        :param y:
        :return:
        """
        return self.__computer_board.get_hit(x, y)

    def move(self, x1, x2, y1, y2, cells, queue):
        """
        This function is the 'AI' of the computer, and it respects the difficulty of every game
        :param x1:
        :param x2:
        :param y1:
        :param y2:
        :param cells:
        :param queue:
        :return:
        """
        if self.__computer_board.difficulty == 0:
            return self.move_easy(x1, x2, y1, y2)
        if self.__computer_board.difficulty == 1:
            return self.move_medium(cells)

    def move_easy(self, x1, x2, y1, y2):
        """
        The most basic algorithm, it chooses random positions xd and hopes to hit a cabin
        :return: two integers (the coordinates)
        """
        # A cabin cannot be placed in such cell, because the plane would outrun the board. trivial_cells stores such
        # cells.
        h = self.__computer_board.size
        trivial_cells = [(0, 0), (0, 1), (1, 0), (1, 1), (0, h - 1), (0, h), (1, h - 1), (1, h),
                         (h - 1, 0), (h - 1, 1), (h, 0), (h, 1), (h - 1, h - 1),
                         (h - 1, h), (h, h - 1), (h, h)]

        x = randint(x2, x1)
        y = randint(y2, y1)
        while (self.__computer_board.data[x][y] == "X") or ((x, y) in trivial_cells):
            x = randint(0, h - 1)
            y = randint(0, h - 1)
        return x, y

    def move_medium(self, cells):
        if self.__computer_board.difficulty == 1:
            """
            If we hit a plane, we restrict our area of choice by a 5x5 square in order to find a cabin
            :return: two integers (the coordinates)
            """
            if len(cells) == 0:
                res_x, res_y = self.move_easy(self.__computer_board.size - 1, 0, self.__computer_board.size - 1, 0)
            else:
                x1 = max(0, cells[-1][0] - 2)
                y1 = max(0, cells[-1][1] - 2)
                x2 = min(self.__computer_board.size - 1, cells[-1][0] + 2)
                y2 = min(self.__computer_board.size - 1, cells[-1][1] + 2)
                res_x, res_y = self.move_easy(x1, x2, y1, y2)

            cells.clear()
            if self.__computer_board.data[res_x][res_y] == "A" or self.__computer_board.data[res_x][res_y] == "C":
                cells.append((res_x, res_y))

            return res_x, res_y
