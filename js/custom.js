// JavaScript Document

/*==========================================================================
---------------------------     Video Source  ------------------------------
============================================================================*/

const LSvideoSource = document.querySelector('#video-container').querySelector('source');
function changeVideoSource () {
	if (window.innerWidth < 767) {
		LSvideoSource.src = "video/profile-video-mobile.mp4";
	}
}

changeVideoSource();

window.onresize = () => changeVideoSource();

/*==========================================================================
---------------------     Sticky Header On Scroll  ------------------------
============================================================================*/

let nav = document.querySelector("nav");
let sticky = nav.offsetTop;
let viewportHeader = document.getElementById("viewport-header");

function stickyHeader() {
    if (window.pageYOffset > sticky) {
        nav.classList.add("sticky");
        viewportHeader.style.marginBottom = `${nav.offsetHeight}px`;
    } else {
        nav.classList.remove("sticky");
        viewportHeader.style.marginBottom = '0px';
    }
}

window.onresize = () => sticky = nav.offsetTop;
window.onscroll = () => stickyHeader();

/*==========================================================================
---------------------     Greyscale Img Scroll   ------------------------
============================================================================*/

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = {
    32: 1,
    38: 1,
    33: 1,
    40: 1,
    34: 1,
    35: 1,
    36: 1
};
let downKeys = [32, 40, 34, 35];
let greyscaleProfileImg = document.getElementById('profile-greyscale').querySelector('img');
let scrolls = 100;
let previousPosition = 0;

function moveGreyscaleImg (e) {
	let checkScrollDown = e.wheelDelta < 0 || downKeys.indexOf(e.keyCode) !== -1;
    if (window.pageYOffset !== 0) { //allow scroll if user isnt at top of page
        enableScroll();
		scrollGreyscaleImg(-scrolls);
        scrolls = 0;
    } else {
		if (scrolls === 0) { //if scroll location is at top of page
            if (checkScrollDown) {
                enableScroll();
            } else {
				scrollGreyscaleImg(20);
            }
        } else if (checkScrollDown) { //scrolling down
            if (scrolls > 0) {
                scrollGreyscaleImg(-10);
            }
        } else { //scrolling up
            if (scrolls < 100) {
                scrollGreyscaleImg(10);
            }
        }
    }
}

function touchMoveGreyscaleImg (e) {
	e.preventDefault();
	greyscaleProfileImg.style.transition = 'clip-path .05s ease-out';
	let screenHeight = window.innerHeight;
	let currentPosition = ((1 - (e.changedTouches[0].pageY / screenHeight)) * 100);
	let ScrollDirection = Math.floor(previousPosition) - Math.floor(currentPosition);
			if (scrolls === 0) { //if scroll location is at top of page
				if ((ScrollDirection) < 0) {
					enableScroll();
					greyscaleProfileImg.style.transition = 'clip-path .3s ease-out';
				} else {
					scrollGreyscaleImg(ScrollDirection);
				}
			} else {
				scrollGreyscaleImg(ScrollDirection);
			}
	previousPosition = currentPosition;
}

function scrollGreyscaleImg (length) {
	scrolls += length;
    greyscaleProfileImg.style.clipPath = `inset(${scrolls}% 0 0 0)`;
}

function MouseMoveGreyscaleImg(e) {
    e.preventDefault();
    moveGreyscaleImg(e);
}

function keyboardMoveGreyscaleImg(e) {
    if (keys[e.keyCode]) {
		moveGreyscaleImg(e);
        e.preventDefault();
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;

try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function() {
            supportsPassive = true;
        }
    }));
} catch (e) {}

let wheelOpt = supportsPassive ? {
    passive: false
} : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
    window.addEventListener('DOMMouseScroll', MouseMoveGreyscaleImg, false); // older FF
    window.addEventListener(wheelEvent, MouseMoveGreyscaleImg, wheelOpt); // modern desktop
    window.addEventListener('touchmove', touchMoveGreyscaleImg, wheelOpt); // mobile
    window.addEventListener('keydown', keyboardMoveGreyscaleImg, false);
}

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', MouseMoveGreyscaleImg, false);
    window.removeEventListener(wheelEvent, MouseMoveGreyscaleImg, wheelOpt);
    window.removeEventListener('touchmove', touchMoveGreyscaleImg, wheelOpt);
    window.removeEventListener('keydown', keyboardMoveGreyscaleImg, false);
}

window.addEventListener('scroll', () => {
    if (window.pageYOffset == 0) {
        disableScroll();
    }
});

disableScroll();

/*==========================================================================
---------------------     Main Content Background   ------------------------
============================================================================*/

let mainBackground = document.getElementById("background");
let setBackground = () => mainBackground.style.height = `${document.body.clientHeight - window.innerHeight}px`;

setTimeout(() => setBackground(), 100);
window.onresize = () => setBackground();

/*==========================================================================
---------------------------     Intro Arrow    ------------------------------
============================================================================*/

const downArrow = document.querySelector("#intro-arrow");
if (window.innerWidth < 576) {
    setTimeout(() => downArrow.style.display = "block", 9599);
    setTimeout(() => downArrow.style.right = "17%", 9600);
} else {
    setTimeout(() => downArrow.style.display = "block", 9899);
    setTimeout(() => downArrow.style.right = "17%", 9900);
}

downArrow.addEventListener('click', () => {
    if (greyscaleProfileImg.style.clipPath == `inset(0px)`) {
        window.scroll({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        greyscaleProfileImg.style.transitionDuration = "1s";
        greyscaleProfileImg.style.clipPath = `inset(0px)`;
        setTimeout(() => {
            window.scroll({
                top: window.innerHeight,
                left: 0,
                behavior: 'smooth'
            });
            greyscaleProfileImg.style.transitionDuration = "0.3s";
        }, 1000);
    }
    enableScroll();
    scrolls = 0;
});

/*==========================================================================
-------------------------     More Info Arrow    ---------------------------
============================================================================*/

let projectsContainer = document.getElementById('projects-container');

projectsContainer.addEventListener('click', (e) => {
    if (!(e.target.classList.contains("card-footer") || e.target.parentNode.classList.contains("card-footer"))) {
        let cardContainer = e.target.closest('.card');
        let coverImg = cardContainer.querySelector('img');
        let moreInfoArrow = cardContainer.querySelector('svg');
        if (coverImg.src.includes('-greyscale')) {
            coverImg.src = coverImg.src.replace('-greyscale', ''); //change img to color
            coverImg.style.opacity = "90%";
            moreInfoArrow.style.transform = "rotate(-90deg) translate(0px, -5px)"; //tranform SVG
            setTimeout(() => setBackground(), 300);
        } else { //undo all changes on second click\
            coverImg.src = coverImg.src.replace('.png', '-greyscale.png');
            coverImg.style.opacity = "85%";
            moreInfoArrow.style.transform = "rotate(0deg) translate(0px, 0px)";
            setTimeout(() => setBackground(), 300);
        }
    }
});