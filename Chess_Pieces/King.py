from Chess_Pieces.Chessman import Chessman
from pathlib import Path

PATH = CRIPT_LOCATION = Path(__file__).absolute().parent.parent

class King(Chessman):
    def __init__(self, x, y, enemy, board):
        super().__init__(x, y, enemy, board)

        if self.enemy == 1:
            self.img_src = "https://i.ibb.co/0q2WBqX/king1.png"
        else:
            self.img_src = "https://i.ibb.co/KK340cm/king2.png"
        self.enable_coordinates = {(x, y) for x in range(-1, 2) for y in range(-1, 2) if (x != 0 or y != 0)}

    def move(self, x , y):
        if x >= 0 and x < 8 and y >= 0 and y < 8:
            step_x, step_y = x - self.current_x_y[0], y - self.current_x_y[1]
            if (step_x, step_y) in self.enable_coordinates:
            
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
                print(f"{(x, y)} is invalid")
                return 0
        else:
            print(f"{(x, y)} out of 8x8")
            return 0
