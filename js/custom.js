// JavaScript Document

/*==========================================================================
-------------------------     Sticky Header    ----------------------------
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
let keys = {32: 1, 38: 1, 33: 1, 40: 1, 34: 1, 35: 1, 36: 1};
let downKeys = [32, 40, 34, 35];

let greyscaleProfileImg = document.getElementById('profile-greyscale').querySelector('img');
let scrolls = 100;
function moveGreyscaleImg (e) {
	if (window.pageYOffset !== 0) {
		enableScroll()
		scrolls
		greyscaleProfileImg.style.clipPath = `inset(${scrolls}% 0 0 0)`;
	} else {
	if (e.wheelDelta < 0 || downKeys.indexOf(e.keyCode) !== -1) {
		if (scrolls > 0) {
			scrolls -= 10
			greyscaleProfileImg.style.clipPath = `inset(${scrolls}% 0 0 0)`;
		}
	} else {
		if (scrolls < 100) {
			scrolls += 10
			greyscaleProfileImg.style.clipPath = `inset(${scrolls}% 0 0 0)`;
		}
	}
	if (scrolls === 0) {
		if (e.wheelDelta < 0 || downKeys.indexOf(e.keyCode) !== -1) {
		enableScroll()
		} else {
			scrolls += 20
			greyscaleProfileImg.style.clipPath = `inset(${scrolls}% 0 0 0)`;
		}
	}
	}

}

function preventDefault(e) {
  e.preventDefault();
  moveGreyscaleImg(e)
}

function preventDefaultForScrollKeys(e) {
	moveGreyscaleImg(e)
	if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

disableScroll()

window.addEventListener('scroll', () => {
	if (window.pageYOffset == 0) {
		disableScroll()
	}
})


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

const downArrow = document.querySelector("#intro-arrow")
if (window.innerWidth < 576) {
	setTimeout(() => downArrow.style.display = "block", 9599)
	setTimeout(() => downArrow.style.right = "17%", 9600)
} else {
	setTimeout(() => downArrow.style.display = "block", 9899)
	setTimeout(() => downArrow.style.right = "17%", 9900)
}

downArrow.addEventListener('click', () => {
  if (greyscaleProfileImg.style.clipPath == `inset(0px)`) {
	window.scroll({
	top: window.innerHeight,
	left: 0,
	behavior: 'smooth'
	}); 
  } else {
	greyscaleProfileImg.style.transitionDuration = "1s"
	greyscaleProfileImg.style.clipPath = `inset(0px)`;
	setTimeout(() => {
	window.scroll({
		top: window.innerHeight,
		left: 0,
		behavior: 'smooth'
	});
	greyscaleProfileImg.style.transitionDuration = "0.3s"
  }, 1000); 
  }
  enableScroll()
  scrolls = 0;
});

/*==========================================================================
-------------------------     More Info Arrow    ---------------------------
============================================================================*/

let projectsContainer = document.getElementById('projects-container');

projectsContainer.addEventListener('click', (e) => {
	if(!(e.target.classList.contains("card-footer") || e.target.parentNode.classList.contains("card-footer"))) {
		let cardContainer = e.target.closest('.card')
		let coverImg = cardContainer.querySelector('img')
		let moreInfoArrow = cardContainer.querySelector('svg')
		if (coverImg.src.includes('-greyscale')) {
			coverImg.src = coverImg.src.replace('-greyscale', '') //change img to color
			coverImg.style.opacity =  "90%"
			moreInfoArrow.style.transform = "rotate(-90deg) translate(0px, -5px)" //tranform SVG
			setTimeout(() => setBackground(), 300)
		} else { //undo all changes on second click\
			coverImg.src = coverImg.src.replace('.png', '-greyscale.png')
			coverImg.style.opacity =  "85%"
			moreInfoArrow.style.transform = "rotate(0deg) translate(0px, 0px)"
			setTimeout(() => setBackground(), 300)
		}
	}
});