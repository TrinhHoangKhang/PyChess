from Chess_Pieces.Chessman import Chessman
from pathlib import Path

PATH = CRIPT_LOCATION = Path(__file__).absolute().parent.parent

class Queen(Chessman):
    def __init__(self, x, y, enemy, board):
        super().__init__(x, y, enemy, board)

        if self.enemy == 1:
            self.img_src = "https://i.ibb.co/wKgDDdk/queen1.png"
        else:
            self.img_src = "https://i.ibb.co/0msmLhq/queen2.png"
            
        self.enable_coordinates = {(x, y) for x in range(-7, 8) for y in range(-7, 8) if (x != 0 or y != 0) and (abs(x) == abs(y) or x == 0 or y == 0)}

    def move(self, x , y):
        if x >= 0 and x < 8 and y >= 0 and y < 8:
            step_x, step_y = x - self.current_x_y[0], y - self.current_x_y[1]
            if (step_x, step_y) in self.enable_coordinates:
                
                enable_move = True
                if x > self.current_x_y[0] and y < self.current_x_y[1]:
                    for x_move, y_move in zip(range(self.current_x_y[0], x), range(self.current_x_y[1], y, -1)):
                        if (self.current_x_y[0], self.current_x_y[1]) != (x_move, y_move) and self.boardGame.has_chessman(x_move, y_move) != 0:
                            enable_move = False
                            break
                elif x > self.current_x_y[0] and y > self.current_x_y[1]:
                    for x_move, y_move in zip(range(self.current_x_y[0], x), range(self.current_x_y[1], y)):
                        if (self.current_x_y[0], self.current_x_y[1]) != (x_move, y_move) and self.boardGame.has_chessman(x_move, y_move) != 0:
                            enable_move = False
                            break
                elif x < self.current_x_y[0] and y > self.current_x_y[1]:
                    for x_move, y_move in zip(range(self.current_x_y[0], x, -1), range(self.current_x_y[1], y)):
                        if (self.current_x_y[0], self.current_x_y[1]) != (x_move, y_move) and self.boardGame.has_chessman(x_move, y_move) != 0:
                            enable_move = False
                            break
                elif x < self.current_x_y[0] and y < self.current_x_y[1]:
                    for x_move, y_move in zip(range(self.current_x_y[0], x, -1), range(self.current_x_y[1], y, -1)):
                        if (self.current_x_y[0], self.current_x_y[1]) != (x_move, y_move) and self.boardGame.has_chessman(x_move, y_move) != 0:
                            enable_move = False
                            break
                elif (x > self.current_x_y[0] and y == self.current_x_y[1]) or (x < self.current_x_y[0] and y == self.current_x_y[1]):
                    for x_move in range(self.current_x_y[0], x):
                        if (self.current_x_y[0] != x_move and self.boardGame.has_chessman(x_move, self.current_x_y[1]) != 0):
                            enable_move = False
                            break
                elif (x == self.current_x_y[0] and y > self.current_x_y[1]) or (x == self.current_x_y[0] and y < self.current_x_y[1]):
                    for y_move in range(self.current_x_y[1], y):
                        if (self.current_x_y[1] != y_move and self.boardGame.has_chessman(self.current_x_y[0], y_move) != 0):
                            enable_move = False
                            break
                
                if enable_move == True:
                    if self.boardGame.has_chessman(x, y) == 0:
                        self.current_x_y = (x, y)

                        return [1, 0]
                    elif self.boardGame.has_chessman(x, y) * self.enemy == -1:
                        self.boardGame.remove_chessman(x, y)
                        self.current_x_y = (x, y)

                        return [1, 1]
                    else:
                        print("Destination is not enemy")
                        return 0
                else:
                    print("There is chessman on path")
                    return 0
            else:
                print(f"{(x, y)} is  invalid")
                return 0
        else:
            print(f"{(x, y)} out of 8x8")
            return 0
