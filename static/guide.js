
const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel{
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
            el.classList.remove('gallery-item-6');
            el.classList.remove('gallery-item-7');
        });

        this.carouselArray.slice(0, 7).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });
    }

    setCurrentState(direction){
        if (direction.className == "gallery-controls-previous") {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
        const allContainers = document.querySelectorAll('.container.mt-5');
        allContainers.forEach(container => {
            container.style.display = 'none';
        });

        const all_detail_chess = document.querySelectorAll('.detail_frame');
        all_detail_chess.forEach(container => {
            container.style.display = 'none';
        });

        const currentGalleryItem = this.carouselArray.find(item => item.classList.contains('gallery-item'));
        // Assuming you want to find the second element with the class 'container' and 'mt-5'
        const myCarousel = document.querySelectorAll('.container.mt-5')[currentGalleryItem.dataset.index - 1];

        if (myCarousel) {
            myCarousel.style.display = (myCarousel.style.display === 'none' || myCarousel.style.display === '') ? 'block' : 'none';
        }

        const detail_chess = document.querySelectorAll('.detail_frame')[currentGalleryItem.dataset.index - 1];
        detail_chess.style.display = (detail_chess.style.display === 'none' || detail_chess.style.display === '') ? 'block' : 'none';
    }

    setControls() {
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
            document.querySelector(`.gallery-controls-${control}`).innerText = control;
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var galleryID = document.getElementById('galleryID');
    if (galleryID) {
        galleryID.style.display = 'none';
    }

    var chessBoard = document.getElementById('chessBoard');
    if (chessBoard) {
        chessBoard.style.display = 'none';
    }
    function guide_click() {
        galleryID.style.display = 'block';
        var videoFrame = document.getElementById('video_screen_id');
        var main_screen = document.getElementById('main_screen_id');
        if (videoFrame) {
            videoFrame.style.flex = '0';
            main_screen.style.flex = '7';
            main_screen.style.background = "url('https://i.ibb.co/HHFv2cL/2301-w062-n005-13-B-p1-13.jpg')";
            main_screen.style.backgroundSize = 'cover';
            // The rest of your code for the Carousel setup goes here
            const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
            exampleCarousel.setControls();
            exampleCarousel.useControls();
        } else {
            console.error("Element with ID 'video_screen_id' not found.");
        }
    }
    var myButton = document.getElementById('guide-btn');
    if (myButton) {
        myButton.onclick = guide_click;
    } else {
        console.error("Button with ID 'my_button_id' not found.");
    }
});



