from flask import Flask, render_template
from Chess_Pieces.BoardGame import BoardGame

app = Flask(__name__)

@app.route('/')
def start_game():
    boardGame = BoardGame()
    return render_template('index.html', boardGame = boardGame)

if __name__ == "__main__":
    app.run(debug=True)