function generateChessBoard() {
    const chessBoard = document.getElementById("chessBoard");

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement("div");

            cell.classList.add("cell");
            cell.classList.add(row % 2 === col % 2 ? 'even-row' : 'odd-row');
            cell.setAttribute("data-row", row);
            cell.setAttribute("data-col", col);
            chessBoard.appendChild(cell);
        }
    }
}

function getCellAtPosition(x, y) {
    const cellSize = 50;
    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    return {
        row,
        col
    };
}

generateChessBoard();

document.addEventListener("click", (event) => {
    const { clientX, clientY } = event;
    const chessCell = getCellAtPosition(clientX, clientY);
    console.log("Clicked on cell:", chessCell);
});
