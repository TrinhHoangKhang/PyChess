from flask import Flask, render_template, jsonify
from Chess_Pieces.BoardGame import BoardGame
from Chess_Pieces.Chessman import Chessman

app = Flask(__name__)
boardGame = BoardGame()

@app.route('/')
def intro_page():
    # Render the HTML template
    return render_template('intro.html')

@app.route('/home')
def home():
    return render_template('home.html')


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

@app.route('/delete_chess/<int:x>/<int:y>', methods=['GET'])
def delete_chess(x, y):
    boardGame.remove_chessman(x, y)


@app.route('/move/<int:x0>/<int:y0>/<int:x1>/<int:y1>', methods=['POST'])
def move_chess(x0, y0, x1, y1):
    need_to_move_chess = boardGame.chessmans[0]
    for chessman in boardGame.chessmans:
        if chessman.current_x_y[0] == x0 and chessman.current_x_y[1] == y0:
            need_to_move_chess = chessman
    
    result = boardGame.chessmans[boardGame.chessmans.index(need_to_move_chess)].move(x1, y1)
    if result == [1, 0]:
        return jsonify({'status': [1, 0]})
    elif result == [1, 1]:
        return jsonify({'status': [1, 1]})
    return jsonify({'status': [0, 0]})

if __name__ == "__main__":
    app.run(debug=True)