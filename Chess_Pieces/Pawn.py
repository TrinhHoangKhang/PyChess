from Chess_Pieces.Chessman import Chessman
from pathlib import Path

PATH = CRIPT_LOCATION = Path(__file__).absolute().parent.parent

class Pawn(Chessman):
    def __init__(self, x, y, enemy, board):
        super().__init__(x, y, enemy, board)

        if self.enemy == 1:
            self.img_src = "https://i.ibb.co/mBTT6Nv/pawn1.png"
        else:
            self.img_src = "https://i.ibb.co/qsKFHff/pawn2.png"
        self.enable_coordinates = {(x * self.enemy, y * self.enemy) for x, y in {(0, 1), (-1, 1), (1, 1), (0, 2)}}

    def move(self, x , y):
        if x >= 0 and x < 8 and y >= 0 and y < 8:
            step_x, step_y = x - self.current_x_y[0], y - self.current_x_y[1]
            if (step_x, step_y) in self.enable_coordinates:  # Pawn can move 
                if self.boardGame.has_chessman(x, y) == 0:   # Destination doesn't have chessman
                    if ((step_x, step_y) == (0, 2) and self.current_x_y[1] == 1 and self.enemy == 1):
                        if self.boardGame.has_chessman(self.current_x_y[0], self.current_x_y[1] + 1) == 0:
                            self.current_x_y = (self.current_x_y[0], self.current_x_y[1] + 2)
                            return 1
                        else:
                            print("There is a chessman in front of pawn!")
                            return 0

                    elif ((step_x, step_y) == (0, -2) and self.current_x_y[1] == 6 and self.enemy == -1):
                        if self.boardGame.has_chessman(self.current_x_y[0], self.current_x_y[1] - 1) == 0:
                            self.current_x_y = (self.current_x_y[0], self.current_x_y[1] - 2)
                            return 1
                        else:
                            print("There is a chessman in front of pawn!")
                            return 0
                    elif (((step_x, step_y) == (0, -1) and self.enemy == -1) or ((step_x, step_y) == (0, 1) and self.enemy == 1)):
                        self.current_x_y = (x, y)
                        return 1
                    
                elif self.boardGame.has_chessman(x, y) * self.enemy == -1:
                    if step_x != 0:
                        self.boardGame.remove_chessman(x, y)
                        self.current_x_y = (x, y)
                        return 1
                    else:
                        print("Enemy is front of pawn")
                        return 0
                else:
                    print("Destination is not enemy")
                    return 0
            else:
                print(f"{(x, y)} is invalid")
                return 0
        else:
            print(f"{(x, y)} out of 8x8")
            return 0
    
