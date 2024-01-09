from Chess_Pieces.Chessman import Chessman
from pathlib import Path

PATH = CRIPT_LOCATION = Path(__file__).absolute().parent.parent

class Castle(Chessman):
    def __init__(self, x, y, enemy, board):
        super().__init__(x, y, enemy, board)

        if self.enemy == 1:
            self.img_src = "https://i.ibb.co/FnHfTqQ/castle1.png"
        else:
            self.img_src = "https://i.ibb.co/0qxBNRw/castle2.png"

        self.enable_coordinates = {(x, y) for x in range(-7, 8) for y in range(-7, 8) if (x == 0 or y == 0) and (x, y) != (0, 0)}

    def move(self, x , y):
        if x >= 0 and x < 8 and y >= 0 and y < 8:
            step_x, step_y = x - self.current_x_y[0], y - self.current_x_y[1]
            if (step_x, step_y) in self.enable_coordinates:
                
                enable_move = True
                if(step_x != 0 and step_y == 0):
                    for x_move in range(self.current_x_y[0], x):
                        if x_move != self.current_x_y[0] and self.boardGame.has_chessman(x_move, self.current_x_y[1]) != 0:
                            print(x_move)
                            enable_move = False
                            break
                elif (step_x == 0 and step_y != 0):
                    for y_move in range(self.current_x_y[1], y):
                        if y_move != self.current_x_y[1] and self.boardGame.has_chessman(self.current_x_y[0], y_move) != 0:
                            enable_move = False
                            break
                if enable_move == True:
                    if self.boardGame.has_chessman(x, y) == 0:
                        self.current_x_y = (x, y)

                        return 1
                    elif self.boardGame.has_chessman(x, y) * self.enemy == -1:
                        self.boardGame.remove_chessman(x, y)
                        self.current_x_y = (x, y)

                        return 1
                    else:
                        print("Destination is not enemy!")
                        return 0
                else: 
                    print("There is chessman on path")
                    return 0
            else:
                print(f"{(x, y)} is invalid")
                return 0
        else:
            print(f"{(x, y)} out of 8x8")
            return 0
