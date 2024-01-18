from Chess_Pieces.Chessman import Chessman
from Chess_Pieces.Castle import Castle
from Chess_Pieces.King import King
from Chess_Pieces.Knight import Knight
from Chess_Pieces.Queen import Queen
from Chess_Pieces.Pawn import Pawn
from Chess_Pieces.Bishop import Bishop
       
HEIGHT = 8
WIDTH = 8
class BoardGame:
    def __init__(self):
        self.height = HEIGHT
        self.width = WIDTH
        self.chessmans = []  #Store chessmans in list
        self.turn = -1
        # Store pawn into chessmans
        for x in range(8):
            chessman = Pawn(x, 1, 1, self)
            self.chessmans.append(chessman)
            chessman = Pawn(x, 6, -1, self)
            self.chessmans.append(chessman)
        
        # Store castle into chessmans
        for x in [0, 7]:
            chessman = Castle(x, 0, 1, self)
            self.chessmans.append(chessman)
            chessman = Castle(x, 7, -1, self)
            self.chessmans.append(chessman)

        # Store knight into chessmans
        for x in [1, 6]:
            chessman = Knight(x, 0, 1, self)
            self.chessmans.append(chessman)
            chessman = Knight(x, 7, -1, self)
            self.chessmans.append(chessman)
        
        # Store bishop into chessmans
        for x in [2, 5]:
            chessman = Bishop(x, 0, 1, self)
            self.chessmans.append(chessman)
            chessman = Bishop(x, 7, -1, self)
            self.chessmans.append(chessman)
        
        # Store queen into chessmans
        chessman = Queen(3, 0, 1, self)
        self.chessmans.append(chessman)
        chessman = Queen(3, 7, -1, self)
        self.chessmans.append(chessman)

        # Store king into chessmans
        chessman = King(4, 0, 1, self)
        self.chessmans.append(chessman)
        chessman = King(4, 7, -1, self)
        self.chessmans.append(chessman)
        
    
    def add_chessman(self, chessman):
        self.chessmans.append(chessman)
    
    def has_chessman(self, x, y):
        for chessman in self.chessmans:
            if(chessman.current_x_y == (x, y)):
                return chessman.enemy
        return 0

    def remove_chessman(self, x, y):
        print("Remove")
        for chessman in self.chessmans:
            if(chessman.current_x_y == (x, y)):
                self.chessmans.remove(chessman)
