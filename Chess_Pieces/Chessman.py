class Chessman:
    def __init__(self, x, y, enemy, boardGame):
        self.current_x_y = (x, y)
        self.enemy = enemy  #Check if chessman is enemy or not, if it is enemy, value is 1, if not value is -1
        self.enable_coordinates = {}  # Store step to move (-1, 0), (1, 0), (0, 1), ...
        self.boardGame = boardGame
        self.img_src = ""
    
    def set_enable_coordinates(self):
        pass
    
    def move(self, x, y):
        pass
    
    def beat(self, x, y):
        self.move(x, y)
        print(f"Beat at {x, y}")

    
