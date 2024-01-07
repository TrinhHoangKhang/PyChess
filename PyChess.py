from flask import Flask, render_template, jsonify
from Chess_Pieces.BoardGame import BoardGame
from Chess_Pieces.Chessman import Chessman

app = Flask(__name__)
boardGame = BoardGame()

@app.route('/')
def home():
    # Render the HTML template
    return render_template('index.html')

@app.route('/get_board', methods=['GET'])
def get_board():
    # Example: Return the board state as JSON
    board_state = {
        'height': boardGame.height,
        'width': boardGame.width,
        'chessmans': [
            {
                'type': type(chessman).__name__,
                'current_x': chessman.current_x_y[0],
                'current_y': chessman.current_x_y[1],
                'enemy': chessman.enemy,
                'img': str(chessman.img_src),
                'enable_coordinates': list(chessman.enable_coordinates),
            }
            for chessman in boardGame.chessmans
        ]
    }
    return jsonify(board_state)

if __name__ == "__main__":
    app.run(debug=True)