from errors.errors import ServiceError
from random import randint

data_set_easy = [['A3N', 'A7N', 'G4E'], ['B3W', 'G3S', 'H6S'], ['A3N', 'D5W', 'E4N'],
                 ['B5W', 'D5E', 'G4E'], ['D3S', 'D4E', 'F1E'], ['F1W', 'E8E', 'B4W']]

data_set_normal = [['A3N', 'B5N', 'G9S', 'I3W'], ['A3N', 'B5N', 'G9S', 'I3W'], ['A3N', 'B5N', 'G9S', 'I3W'],
                   ['A3N', 'B5N', 'G9S', 'I3W'], ['A3N', 'B5N', 'G9S', 'I3W'], ['A3N', 'B5N', 'G9S', 'I3W']]

data_set_hard = [['A1N', 'A5N', 'A9N'], ['B2E', 'B6E', 'B10E'], ['C3S', 'C7S', 'C11S'],
                 ['D4W', 'D8W', 'D12W'], ['E1N', 'E5N', 'E9N'], ['F2E', 'F6E', 'F10E'],
                 ['G3S', 'G7S', 'G11S'], ['H4W', 'H8W', 'H12W'], ['I1N', 'I5N', 'I9N'],
                 ['J2E', 'J6E', 'J10E'], ['K3S', 'K7S', 'K11S'], ['L4W', 'L8W', 'L12W']]
class PlayerService:
    def __init__(self, player_board):
        self.__player_board = player_board

    @property
    def board(self):
        # getter function for the board class
        return self.__player_board

    def add_plane(self, x, y, orientation):
        """
        This function adds a plane into the board and validates the coordinates
        :param x:
        :param y:
        :param orientation:
        :return:
        """
        if orientation.upper() not in ['N', 'S', 'E', 'W']:
            raise ServiceError("Wrong orientation!")

        self.__player_board.validate_positions(x, y, orientation)
        self.__player_board.add_plane(x, y, orientation)

    def get_hit(self, x, y):
        """
        This function registers if a given input coordinates are crashes, hits or /
        nothing's and also marks the hit spot with X
        :param x:
        :param y:
        :return:
        """
        return self.__player_board.get_hit(x, y)

    def generate_planes(self):

        """
        This function generates planes for the computer
        :return:
        """

        data_set = []

        if self.__player_board.difficulty == 0:
            data_set = data_set_easy[randint(0, 5)]
        elif self.__player_board.difficulty == 1:
            data_set = data_set_normal[randint(0, 5)]
        elif self.__player_board.difficulty == 2:
            data_set = data_set_hard[randint(0, 5)]

        for item in data_set:
            x, y, orientation = 0, 0, 0
            items = list(item)
            if len(items) == 3:
                x, y, orientation = ord(items[0]) - 65, int(items[1]), items[2]
            elif len(items) == 4:
                x, y, orientation = ord(items[0]) - 65, int(items[1]) * 10 + int(items[2]), items[3]

            self.__player_board.board.add_plane(x, y - 1, orientation)
