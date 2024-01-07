
fetch('http://127.0.0.1:5000/get_board')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        generateChessBoard(data);
    })
    .catch(error => console.error('Error fetching board state:', error));

function generateChessBoard(data) {
    const chessBoard = document.getElementById("chessBoard");
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement("div");
            const img = document.createElement("img");

            cell.classList.add("cell");
            cell.classList.add(row % 2 === col % 2 ? 'even-row' : 'odd-row');
            cell.setAttribute("data-row", row);
            cell.setAttribute("data-col", col);
            
            
            for (let i = 0; i < 32; i++){
                if (data.chessmans[i].current_x === col && data.chessmans[i].current_y === row) {
                    if (data.chessmans[i]) {
                        img.src = data.chessmans[i].img;
                        img.style.width = "120px";
                        img.style.height = "120px";
                        img.classList.add("img-with-hover");
                        cell.appendChild(img);
                    }
                }
            }

            chessBoard.appendChild(cell);
        }
    }
}

// Add event listener for hovering over images
chessBoard.addEventListener("mouseover", (event) => {
    const img = event.target;
    if (img.classList.contains("img-with-hover")) {
        img.style.cursor = "pointer"; // Change cursor style
    }
});

// Add event listener for leaving images
chessBoard.addEventListener("mouseout", (event) => {
    const img = event.target;
    if (img.classList.contains("img-with-hover")) {
        img.style.cursor = "default"; // Restore default cursor style
    }
});

function getCellAtPosition(x, y) {
    const chessBoard = document.getElementById("chessBoard");
    const boardRect = chessBoard.getBoundingClientRect();

    const cellSize = boardRect.width / 8;
    const row = Math.floor((y - boardRect.top) / cellSize);
    const col = Math.floor((x - boardRect.left) / cellSize);

    return {
        row,
        col
    };
}

// Add event listener for clicking on images
chessBoard.addEventListener("click", (event) => {
    const img = event.target;
    const cell = img.closest(".cell");

    if (img.classList.contains("img-with-hover")) {
        // Reset the background color of all cells
        const allCells = document.querySelectorAll('.cell');
        allCells.forEach((cell) => {
            cell.style.backgroundColor = "";
        });

        // Change the background color based on the row class
        if (cell.classList.contains('even-row')) {
            cell.style.backgroundColor = "#F4F680";
        } else if (cell.classList.contains('odd-row')) {
            cell.style.backgroundColor = "#BBCC44";
        }
    }
});


function enableDragAndDrop() {
    let draggedPiece = null;

    function handleDragStart(event) {
        draggedPiece = event.target;
        event.dataTransfer.setData("text/plain", draggedPiece.parentElement.dataset.row + ',' + draggedPiece.parentElement.dataset.col);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain").split(',');
        const sourceRow = parseInt(data[0]);
        const sourceCol = parseInt(data[1]);
        const targetCell = event.target.closest(".cell");

        // Implement your logic to check if the move is valid
        // and update the board state accordingly

        // Move the piece to the target cell
        targetCell.innerHTML = "";
        targetCell.appendChild(draggedPiece);

        // Change the background color of the target cell
        if (targetCell.classList.contains('even-row')) {
            targetCell.style.backgroundColor = "#F4F680";
        } else if (targetCell.classList.contains('odd-row')) {
            targetCell.style.backgroundColor = "#BBCC44";
        }
        // Update the board state (you need to implement this part)
        // Example: updateBoardState(sourceRow, sourceCol, targetCell.dataset.row, targetCell.dataset.col);

        // Reset the dragged piece
        draggedPiece = null;
    }

    // Add event listeners to enable dragging and dropping
    const chessBoard = document.getElementById("chessBoard");
    chessBoard.addEventListener("dragstart", handleDragStart);
    chessBoard.addEventListener("dragover", handleDragOver);
    chessBoard.addEventListener("drop", handleDrop);
}

// Call the function to enable drag-and-drop
enableDragAndDrop();
