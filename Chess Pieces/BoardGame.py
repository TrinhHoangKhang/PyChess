from Chessman import Chessman

class BoardGame:
    def __init__(self, height, width):
        self.height = height
        self.width = width
        self.chessmans = []  #Store chessmans in list
    
    def add_chessman(self, chessman):
        self.chessmans.append(chessman)
    
    def has_chessman(self, x, y):
        for chessman in self.chessmans:
            if(chessman.current_x == x and chessman.current_y == y):
                return chessman.enemy
        return 0

    def remove_chessman(self, x, y):
        for chessman in self.chessmans:
            if(chessman.current_x == x and chessman.current_y == y):
                self.chessmans.remove(chessman)
