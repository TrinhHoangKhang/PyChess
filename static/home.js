const EVENCOLOR = "#FDF172"
const ODDCOLOR = "#E8E305"
var timerInterval;
document.addEventListener('DOMContentLoaded', function () {
    function play_online_click() {
        var winAnnounce = document.getElementById("card-notification");
        winAnnounce.style.display = 'none';

        var videoFrame = document.getElementById('video_screen_id');
        videoFrame.style.display = 'block';
        var timer = document.getElementById("accordionExample");
        timer.style.display = 'block';
        var main_screen = document.getElementById('main_screen_id');
        videoFrame.style.flex = '3';
        main_screen.style.flex = '4';
        main_screen.style.boxSizing = 'border-box';
        main_screen.style.backgroundColor  = "#302E2B";
        main_screen.style.position = "relative";
        // The rest of your code for the Carousel setup goes here
        var galleryID = document.getElementById('galleryID');
        galleryID.style.display = 'none';

        var chessBoard = document.getElementById('chessBoard');
        if (chessBoard) {
            chessBoard.style.display = 'block';
            chessBoard.style.display = "grid";
            chessBoard.style.gridTemplateColumns = "repeat(8, 1fr)"; // Use camelCase for property names, and enclose values in quotes
            chessBoard.style.border = '5px solid white'; // Enclose the value in quotes
            chessBoard.style.position = 'absolute'; // Enclose the value in quotes
        }


        var guideID = document.getElementById("guide_frame");
        guideID.style.display = 'none';

        fetch_boardGame();
    }
    var myButton = document.getElementById('play-online-btn');
    if (myButton) {
        myButton.onclick = play_online_click;
    }

    function replay() {
        fetch('/replay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers as needed
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            else {
                startGame = 0;
                play_online_click();
            }
        });
    }
    var myButton = document.getElementById('replay-btn');
    if (myButton) {
        myButton.onclick = replay;
    }
});



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

//fetch_boardGame()
function generateChessBoard(data) {
    const chessBoard = document.getElementById("chessBoard");
    chessBoard.innerHTML = ''; // Clear the existing 
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement("div");
            const img = document.createElement("img");

            cell.classList.add("cell");
            cell.classList.add(row % 2 === col % 2 ? 'even-row' : 'odd-row');
            cell.setAttribute("data-row", row);
            cell.setAttribute("data-col", col);
            cell.setAttribute("cell_name", "None")
            
            for (let i = 0; i < data.chessmans.length; i++){
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

let startGame = 0;

// Add event listener for hovering over images
chessBoard.addEventListener("mouseover", (event) => {
    if (startGame === 1){
        const img = event.target;
        if (img.classList.contains("img-with-hover")) {
            img.style.cursor = "pointer"; // Change cursor style
        }
    }
    
});

// Add event listener for leaving images
chessBoard.addEventListener("mouseout", (event) => {
    if (startGame === 1) {
        const img = event.target;
        if (img.classList.contains("img-with-hover")) {
            img.style.cursor = "default"; // Restore default cursor style
        }
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
    if (startGame === 1) {
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
                    if (response.status[2] == 1) {
                        
                    }
                    else if (response.status[2] == -1) {
                        var winAnnounce = document.getElementById("card-notification");
                        winAnnounce.style.display = 'block';
                        var win_game_audio = document.getElementById("win-game-sound");
                        win_game_audio.play();
                        clearInterval(timerInterval);
                    }
                    else if (response.status[0] === 1 && response.status[1] == 1) {
                        var audio = document.getElementById("capture-sound");
                        audio.play();

                        // If the target_cell already has a child, replace it
                        target_cell.replaceChild(draggedPiece, target_cell.firstChild);
                        // Change the background color of the target cell
                        if (target_cell.classList.contains('even-row')) {
                            target_cell.style.backgroundColor = EVENCOLOR;
                        } else if (target_cell.classList.contains('odd-row')) {
                            target_cell.style.backgroundColor = ODDCOLOR;
                        }

                        // Implement your logic to update the board state
                        // Example: updateBoardState(sourceRow, sourceCol, cell.dataset.row, cell.dataset.col);

                        // Reset the dragged piece
                        draggedPiece = null;
                        need_to_move_cell = null;

                    }
                    else if (response.status[0] === 1 && response.status[1] == 0) {
                        var audio = document.getElementById("move-self-sound");
                        audio.play();

                        target_cell.appendChild(draggedPiece);
                        // Change the background color of the target cell
                        if (target_cell.classList.contains('even-row')) {
                            target_cell.style.backgroundColor = EVENCOLOR;
                        } else if (target_cell.classList.contains('odd-row')) {
                            target_cell.style.backgroundColor = ODDCOLOR;
                        }

                        draggedPiece = null;
                        need_to_move_cell = null;

                    }
                    else {
                        console.log("Invalid move");
                        const cell = img.closest(".cell");

                        // Check if the clicked element is an image with the class 'img-with-hover'
                        if (img.classList.contains("img-with-hover")) {
                            var audio = document.getElementById("click-sound");
                            audio.play();
                        
                            const allCells = document.querySelectorAll('.cell');
                            allCells.forEach((cell) => {
                                cell.style.backgroundColor = '';
                            });
                            // Set the dragged piece
                            draggedPiece = img;
                            need_to_move_cell = cell;

                            // Change the background color of the target cell
                            if (cell.classList.contains('even-row')) {
                                cell.style.backgroundColor = EVENCOLOR;
                            } else if (cell.classList.contains('odd-row')) {
                                cell.style.backgroundColor = ODDCOLOR;
                            }
                        }
                        else {
                            var audio = document.getElementById("notify-sound");
                            audio.play();
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

                var audio = document.getElementById("click-sound");
                audio.play();

                const allCells = document.querySelectorAll('.cell');
                allCells.forEach((cell) => {
                    cell.style.backgroundColor = '';
                });
                // Set the dragged piece
                draggedPiece = img;
                need_to_move_cell = cell;

                // Change the background color of the target cell
                if (cell.classList.contains('even-row')) {
                    cell.style.backgroundColor = EVENCOLOR;
                } else if (cell.classList.contains('odd-row')) {
                    cell.style.backgroundColor = ODDCOLOR;
                }
            }
            else {
                var audio = document.getElementById("notify-sound");
                audio.play();
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

function toggleDropdown() {
    var dropdown = document.getElementById("selectorDropdown");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

function selectOption(option) {
    document.getElementById("selectorDropdown").style.display = "none";
    document.querySelector(".selector-button").textContent = option;
}

document.addEventListener("click", function (event) {
    var dropdown = document.getElementById("selectorDropdown");
    var button = document.querySelector(".selector-button");

    if (event.target !== button && !button.contains(event.target) && event.target !== dropdown && !dropdown.contains(event.target)) {
        dropdown.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Get all the buttons inside the accordion
    var buttons = document.querySelectorAll('.btn-group button');

    // Add click event listener to each button
    buttons.forEach(function(button) {
        button.addEventListener('click', function () {
            var accordionItem = button.closest('.accordion-item');

            // Get the centered-content div inside the accordion-item
            var centeredContent = accordionItem.querySelector('.centered-content');

            // Get the label div inside the accordion-item
            var labelDiv = accordionItem.querySelector('.label');

            // Get the image source from the clicked button's label
            var labelImageSrc = button.closest('.accordion-body').querySelector('.label img').getAttribute('src');
            console.log(labelImageSrc);

            // Get the text content from the button
            var buttonTextContent = button.textContent;

            // Set the image and text content in the centered-content
            centeredContent.innerHTML = '<div class="centered-content">' +
                                         '<img src="' + labelImageSrc + '" style="height: 40px; width: auto; margin-right: 10px; margin-bottom: 5px;">' +
                                         '<h3>' + buttonTextContent + '</h3>' +
                                         '</div>';
        });
    });
});

function selectButton(button) {
    var audio = document.getElementById("notify-sound");
    audio.play();

    // Remove border from all buttons
    var buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(function(btn) {
      btn.style.backgroundColor = '#3DD1E7';
    });
    

    // Add border to the clicked button
    button.style.backgroundColor = "#1FC2FF"; // You can customize the border style here
}

function startPlayGame() {
    startGame = 1;
    setTime();
    var timer1 = document.getElementById("timer1");
    timer1.style.display = 'flex';
    var timer2 = document.getElementById("timer2");
    timer2.style.display = 'flex';

    var timer_frame = document.getElementById("accordionExample");
    timer_frame.style.display = 'none';
    var audio = document.getElementById("notify-sound");
    audio.play();
    var audioFrame = document.getElementById("video_screen_id");
    audioFrame.style.flex = 2.3;
    var main_screen = document.getElementById("main_screen_id");
    main_screen.style.flex = 4.7;
}

function setTime() {
    // Set the countdown time in seconds
    var countdownTime = 600; // 5 minutes

    function updateTimer() {
        var minutes = Math.floor(countdownTime / 60);
        var seconds = countdownTime % 60;

        // Add leading zeros if needed
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Update the timer display
        document.getElementById("timer1").innerHTML = minutes + ":" + seconds;
        document.getElementById("timer2").innerHTML = minutes + ":" + seconds;
        // Decrement the countdown time
        countdownTime--;

        // Check if the countdown has reached zero
        if (countdownTime < 0) {
            clearInterval(timerInterval); // Stop the timer
        }
    }

    // Update the timer every second
    timerInterval = setInterval(updateTimer, 1000);
}

function clickEffect(e){
    var d=document.createElement("div");
    d.className="clickEffect";
    d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
    document.body.appendChild(d);
    d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
}
document.addEventListener('click',clickEffect);