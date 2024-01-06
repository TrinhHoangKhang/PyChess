from Chessman import Chessman

class BoardGame:
    def __init__(self, height, width):
        self.height = height
        self.width = width
        self.chessmans = []  # Store chessmans in list
        self.movelog = []
    
    # Add a chess piece to the board
    def add_chessman(self, chessman):
        self.chessmans.append(chessman)
    
    # Check if there is a piece in x, y location
    def has_chessman(self, x, y):
        for chessman in self.chessmans:
            if chessman.current_x_y == (x, y):
                return True
        return False

    # Remove the piece from x, y location
    def remove_chessman(self, x, y):
        for chessman in self.chessmans:
            if chessman.current_x_y == (x, y):
                self.chessmans.remove(chessman)
                break