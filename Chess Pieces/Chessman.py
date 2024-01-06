class Chessman:
    def __init__(self, x, y, color, boardGame):
        self.current_x_y = (x, y)
        self.enemy = color  # b = black, w = white
        self.possible_move = {}  # Store step to move (-1, 0), (1, 0), (0, 1), ...
        self.boardGame = boardGame
    
    # Get the possible move, dont care about checkmate
    def get_possible_move(self):
        pass
    
    # Get the valid move, check checkmate
    def get_valid_move(self):
        pass

    # Move the piece to the given coordinate
    def move(self, end_x, end_y):
        pass
    
    def capture(self, x, y):
        self.move(x, y)
        print(f"Capture at {x, y}")
