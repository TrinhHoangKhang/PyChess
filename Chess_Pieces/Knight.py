from Chess_Pieces.Chessman import Chessman
from pathlib import Path

PATH = CRIPT_LOCATION = Path(__file__).absolute().parent.parent

class Knight(Chessman):
    def __init__(self, x, y, enemy, board):
        super().__init__(x, y, enemy, board)

        if self.enemy == 1:
            self.img_src = "https://i.ibb.co/4spsF3M/knight1.webp"
        else:
            self.img_src = "https://i.ibb.co/nzw9wL1/knight2.webp"
            
        self.enable_coordinates = {(x, y) for x in (-1, -2, 1, 2) for y in (-1, -2, 1, 2) if abs(x) != abs(y)}

    def move(self, x , y):
        if self.boardGame.turn * self.enemy != 1:
            print(f"{(x, y)} is  invalid")
            return 0
        if x >= 0 and x < 8 and y >= 0 and y < 8:
            step_x, step_y = x - self.current_x_y[0], y - self.current_x_y[1]
            if (step_x, step_y) in self.enable_coordinates:
            
                if self.boardGame.has_chessman(x, y) == 0:
                    self.current_x_y = (x, y)

                    self.boardGame.turn = self.boardGame.turn * -1
                    return [1, 0]
                elif self.boardGame.has_chessman(x, y) * self.enemy == -1:
                    self.boardGame.remove_chessman(x, y)
                    self.current_x_y = (x, y)

                    self.boardGame.turn = self.boardGame.turn * -1
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
