function fetch_boardGame() {
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
}

fetch_boardGame()
function generateChessBoard(data) {
    const chessBoard = document.getElementById("chessBoard");
    chessBoard.innerHTML = ''; // Clear the existing board
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement("div");
            const img = document.createElement("img");

            cell.classList.add("cell");
            cell.classList.add(row % 2 === col % 2 ? 'even-row' : 'odd-row');
            cell.setAttribute("data-row", row);
            cell.setAttribute("data-col", col);
            cell.setAttribute("cell_name", "None")
            
            for (let i = 0; i < 32; i++){
                if (data.chessmans[i].current_x === col && data.chessmans[i].current_y === row) {
                    if (data.chessmans[i]) {
                        img.src = data.chessmans[i].img;
                        img.style.width = "120px";
                        img.style.height = "120px";
                        img.classList.add("img-with-hover");
                        cell.setAttribute("cell_name", data.chessmans[i].type)
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

// Variable to store the dragged piece
let draggedPiece = null;
let need_to_move_cell = null;

// Add mousedown event listener for initiating drag-and-drop
chessBoard.addEventListener("mousedown", (event) => {
    const img = event.target;
    if (draggedPiece !== null) {
        const target_cell = event.target.closest(".cell");
        x0 = need_to_move_cell.getAttribute("data-col"),
        y0 = need_to_move_cell.getAttribute("data-row"),
        x1 = target_cell.getAttribute("data-col"),
        y1 = target_cell.getAttribute("data-row")
        if (x0 != x1 || y0 != y1) {
            move_chess(
                need_to_move_cell.getAttribute("data-col"),
                need_to_move_cell.getAttribute("data-row"),
                target_cell.getAttribute("data-col"),
                target_cell.getAttribute("data-row")
            ).then(response => {
                if (response.status === 1) {
                    if (target_cell.firstChild) {
                        // If the target_cell already has a child, replace it
                        target_cell.replaceChild(draggedPiece, target_cell.firstChild);
                    } else {
                        // If the target_cell is empty, simply append the dragged piece
                        target_cell.appendChild(draggedPiece);
                    }
                    // Change the background color of the target cell
                    if (target_cell.classList.contains('even-row')) {
                        target_cell.style.backgroundColor = "#F4F680";
                    } else if (target_cell.classList.contains('odd-row')) {
                        target_cell.style.backgroundColor = "#BBCC44";
                    }

                    // Implement your logic to update the board state
                    // Example: updateBoardState(sourceRow, sourceCol, cell.dataset.row, cell.dataset.col);

                    // Reset the dragged piece
                    draggedPiece = null;
                    need_to_move_cell = null;

                } else {
                    console.log("Invalid move");
                    const cell = img.closest(".cell");

                    // Check if the clicked element is an image with the class 'img-with-hover'
                    if (img.classList.contains("img-with-hover")) {
                        
                        const allCells = document.querySelectorAll('.cell');
                        allCells.forEach((cell) => {
                            cell.style.backgroundColor = '';
                        });
                        // Set the dragged piece
                        draggedPiece = img;
                        need_to_move_cell = cell;

                        // Change the background color of the target cell
                        if (cell.classList.contains('even-row')) {
                            cell.style.backgroundColor = "#F4F680";
                        } else if (cell.classList.contains('odd-row')) {
                            cell.style.backgroundColor = "#BBCC44";
                        }
                    }
                }
            }).catch(error => {
                console.error("Error:", error);
            });   
        }

    }
    else {
        const cell = img.closest(".cell");

        // Check if the clicked element is an image with the class 'img-with-hover'
        if (img.classList.contains("img-with-hover")) {
            
            const allCells = document.querySelectorAll('.cell');
            allCells.forEach((cell) => {
                cell.style.backgroundColor = '';
            });
            // Set the dragged piece
            draggedPiece = img;
            need_to_move_cell = cell;

            // Change the background color of the target cell
            if (cell.classList.contains('even-row')) {
                cell.style.backgroundColor = "#F4F680";
            } else if (cell.classList.contains('odd-row')) {
                cell.style.backgroundColor = "#BBCC44";
            }
        }
    }
});

function move_chess(x0, y0, x1, y1) {
    return fetch(`/move/${x0}/${y0}/${x1}/${y1}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
        },
        // Add a request body if needed
        // body: JSON.stringify({}),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    });
}