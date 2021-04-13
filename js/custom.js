// JavaScript Document

/*==========================================================================
---------------------     Fixed Header On Scroll  ------------------------
============================================================================*/

let nav = document.querySelector("nav");
let sticky = nav.offsetTop;
let viewportHeader = document.getElementById("viewport-header");

function stickyHeader() {
    if (window.pageYOffset > sticky) {
        nav.classList.add("sticky"); //Fix nav to top of screen after viewport header
        viewportHeader.style.marginBottom = `${nav.offsetHeight}px`;
    } else {
        nav.classList.remove("sticky");
        viewportHeader.style.marginBottom = '0px';
    }
}

if (window.innerWidth < 768) {
	window.onresize = () => sticky = nav.offsetTop;
	window.onscroll = () => stickyHeader();
}

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
/*let previousPosition = 0;*/

function moveGreyscaleImg(e) { //move greyscale img for keyboard and mouse
	let checkScrollDown = e.wheelDelta < 0 || /*most browsers scroll*/
		downKeys.indexOf(e.keyCode) !== -1 || /*keyboard*/
		e.deltaY > 0; /*firefox scroll*/
	if (window.pageYOffset !== 0) { //allow scroll if not at top of page
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

//Working on a function to allow touch scroll of grey scale img | it works but is not fluid enough for it to be a pleasurable experience for users yet
/*function touchMoveGreyscaleImg (e) {
	e.preventDefault();
	greyscaleProfileImg.style.transition = 'clip-path 250ms ease-out';
	let screenHeight = window.innerHeight;
	let currentPosition = ((1 - (e.changedTouches[0].pageY / screenHeight)) * 100);
	let ScrollDirection = Math.floor(previousPosition) - Math.floor(currentPosition);
		if (window.pageYOffset !== 0) { //allow scroll if user is not at top of page
			enableScroll();
			scrollGreyscaleImg(-scrolls);
			scrolls = 0;
		} else {
			if (scrolls === 0) { //if scroll location is at top of page
				if ((ScrollDirection) < 0) {
					enableScroll();
					greyscaleProfileImg.style.transition = 'clip-path .3s ease-out';
				} else if ((ScrollDirection) == -1 || (ScrollDirection) == 1) {
						scrollGreyscaleImg(ScrollDirection * 4);
				}
			} else if ((ScrollDirection) == -1 || (ScrollDirection) == 1) {
						scrollGreyscaleImg(ScrollDirection * 4);
			}
		}
	previousPosition = currentPosition;
}*/

function scrollGreyscaleImg(length) {
	scrolls += length;
	greyscaleProfileImg.style.clipPath = `inset(${scrolls}% 0 0)`;
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
	/*    window.addEventListener('touchmove', touchMoveGreyscaleImg, wheelOpt); // mobile*/
	window.addEventListener('keydown', keyboardMoveGreyscaleImg, false);
}

function enableScroll() {
	window.removeEventListener('DOMMouseScroll', MouseMoveGreyscaleImg, false);
	window.removeEventListener(wheelEvent, MouseMoveGreyscaleImg, wheelOpt);
	/*    window.removeEventListener('touchmove', touchMoveGreyscaleImg, wheelOpt);*/
	window.removeEventListener('keydown', keyboardMoveGreyscaleImg, false);
}

disableScroll();

window.addEventListener('scroll', () => {
	if (window.pageYOffset == 0) {
		disableScroll();
	}
});


window.addEventListener('load', function () {
	let vidContainer = document.querySelector('.video-container');
	let vid = vidContainer.querySelector('video');
		vid.play();
    if (window.innerWidth < 768) { //show greyscale profile img when video has finished on screens less then 768px - touch
        greyscaleProfileImg.style.transitionDuration = "0s";
        greyscaleProfileImg.style.clipPath = 'inset(0 50%)';
		greyscaleProfileImg.style.opacity = '0.1';
        setTimeout(() => {
            greyscaleProfileImg.style.transitionDuration = "0.9s";
            greyscaleProfileImg.style.clipPath = `inset(0 0 0)`;
			greyscaleProfileImg.style.opacity = '1';
        }, 9000);
    } else { // show color profile img on larger screen when video has finished to increase img quality
		let vidContainer = document.querySelector('.video-container');
		let profileImage = `	  
			<div id="profile-img">
				<img src="images/profile-cover.png" alt="Profile Cover image of harrison peace in color" loading="lazy">
			</div>`
		vidContainer.insertAdjacentHTML('afterend', profileImage);
		let profileImg = document.getElementById('profile-img').querySelector('img');
        profileImg.style.transitionDuration = "0s";
        profileImg.style.clipPath = 'inset(0 50%)';
		profileImg.style.opacity = '0.1';
        setTimeout(() => {
            profileImg.style.transitionDuration = "0.9s";
            profileImg.style.clipPath = `inset(0 0 0)`;
			profileImg.style.opacity = '1';
        }, 9200);
    }
})



/*==========================================================================
---------------------     Main Content Background   ------------------------
============================================================================*/

//add height to background based on screen size
let mainBackground = document.getElementById("background");
let setBackground = () => mainBackground.style.height = `${document.body.clientHeight - window.innerHeight}px`;

window.onload = () => setBackground();
window.onresize = () => setBackground();

/*==========================================================================
---------------------------     Intro Arrow    ------------------------------
============================================================================*/

// animation of intro arrow
const downArrow = document.querySelector("#intro-arrow");
if (window.innerWidth < 576) {
	setTimeout(() => downArrow.style.display = "block", 9599);
	setTimeout(() => downArrow.style.right = "17%", 9600);
} else {
	setTimeout(() => downArrow.style.display = "block", 9899);
	setTimeout(() => downArrow.style.right = "17%", 9900);
}

//smooth scroll on click | disabled for touch screen as smooth scroll behaviour isn't supported
if (window.innerWidth >= 768) {
	downArrow.addEventListener('click', () => {
		if (greyscaleProfileImg.style.clipPath == `inset(0px)`) {
			greyscaleProfileImg.style.transitionDuration = "0s";
			window.scroll({
				top: window.innerHeight,
				left: 0,
				behavior: 'smooth'
			});
		} else {
			greyscaleProfileImg.style.clipPath = `inset(0px)`;
			setTimeout(() => {
				window.scroll({
					top: window.innerHeight,
					left: 0,
					behavior: 'smooth'
				});
			}, 1000);
		}
		enableScroll();
		scrolls = 0;
	});
}

//remove display of arrow on touch screens after scroll so it doesnt appear at bottom of page
window.addEventListener('touchmove', () => {
	if (window.innerHeight < window.pageYOffset) {
		downArrow.style.display = "none";
	} else {
		downArrow.style.display = "block";
	}
});

/*==========================================================================
-------------------------    Project More Info   ---------------------------
============================================================================*/

let projectsContainer = document.getElementById('projects-container');
let moreInfoSvg = document.getElementById('more-info-svg');

projectsContainer.addEventListener('click', (e) => {
	//only register clicks for clicks on cards
	if (!(e.target.classList.contains("card-footer") || e.target.parentNode.classList.contains("card-footer"))) {
		if (moreInfoSvg.style.display !== "none") {
			moreInfoSvg.style.display = "none";
		}
		let cardContainer = e.target.closest('.card');
		let coverImg = cardContainer.querySelectorAll('img')[1];
		let moreInfoArrow = cardContainer.querySelector('svg');
		if (coverImg.classList.contains('clicked')) { //undo all changes on second click
			coverImg.style.clipPath = 'inset(100% 0px 0px)';
			moreInfoArrow.style.transform = "rotate(0deg) translate(0px, 0px)";
			coverImg.classList.remove("clicked");
			setTimeout(() => setBackground(), 300);
		} else {
			coverImg.style.clipPath = 'inset(0px 0px 0px)'; //change img to color
			moreInfoArrow.style.transform = "rotate(-90deg) translate(0px, -5px)";
			coverImg.classList.add("clicked");
			setTimeout(() => setBackground(), 300);
		}
	}
});

/*==========================================================================
------------------------    Animated GIF Favicon   -------------------------
============================================================================*/

let image_counter = 0; // To keep track of the current image

setInterval(function() {
    // remove current favicon
	if(document.querySelector("link[rel='icon']") !== null) {
		document.querySelector("link[rel='icon']").remove();
	}
    if(document.querySelector("link[rel='shortcut icon']") !== null) {
		document.querySelector("link[rel='shortcut icon']").remove();
	}
        
    // add new favicon image
	if (image_counter < 10) {
		document.querySelector("head").insertAdjacentHTML('beforeend', `<link rel="shortcut icon" href="images/favicons/favicon_000${image_counter}_P--H.png" type="image/png">`);
	} else {
		document.querySelector("head").insertAdjacentHTML('beforeend', `<link rel="shortcut icon" href="images/favicons/favicon_00${image_counter}_H--P.png" type="image/png">`);
	}
	
    // If last image then goto first image
    if(image_counter == 30) {
		image_counter = 0;
	}
    else { // Else go to next image 
		image_counter++;
	}  
}, 100);