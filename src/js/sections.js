import granimInstance from './gradient';
import * as hjs from 'hammerjs';
import * as br from './blockReveal';

//Only links that starts with #
//var $navButtons = $("nav a").filter("[href^=#]");
let navButtons = document.querySelectorAll('.pagination__link, .site-title');
const scrollIndication = document.querySelector('.scroll__indication');
//var $navGoPrev = $(".go-prev");
//var $navGoNext = $(".go-next");
const slidesContainer = document.querySelector('.section__container');
//const $slides = $(".section");
const slides = slidesContainer.getElementsByClassName('section');
const slidesArray = Array.prototype.slice.call( slidesContainer.children );
const pagination = document.querySelector('#pagination');
//let $currentSlide = $slides.first();
let currentSlide = slides[0];
let previousSlide;

let hammer    = new Hammer(slidesContainer);

//Animating flag - is our app animating
let isAnimating = false;

//The height of the window
//let pageHeight = $window.innerHeight();
let pageHeight = window.innerHeight;

//Key codes for up and down arrows on keyboard. We'll be using this to navigate change slides using the keyboard
const keyCodes = {
  UP  : 38,
  DOWN: 40,
  SPACE: 32
}

//Going to the first slide
goToSlide(currentSlide);

// add swipe recognizer
hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });


/*
*   Adding event listeners
* */

//$window.on("resize", onResize).resize();
window.addEventListener('resize', onResize);
//$window.on("mousewheel DOMMouseScroll", onMouseWheel);
window.addEventListener('mousewheel', onMouseWheel);
window.addEventListener('DOMMouseScroll', onMouseWheel);
//document.on("keydown", onKeyDown);
window.addEventListener('keydown', onKeyDown);
//navButtons.on("click", onNavButtonClick);
hammer.on('swiperight swipebottom', goToPrevSlide);
hammer.on('swipeleft swipeup', goToNextSlide);


//ajouter un foreach
navButtons.forEach(function(button) {
  button.addEventListener('click', onNavButtonClick);
});
//$navGoPrev.on("click", goToPrevSlide);
//$navGoNext.on("click", goToNextSlide);

/*
*   Internal functions
* */


/*
*   When a button is clicked - first get the button href, and then slide to the container, if there's such a container
* */
function onNavButtonClick(event)
{
  //The clicked button
  const button = this;
  event.preventDefault();

  //The slide the button points to
  const slide = document.querySelector(this.getAttribute('href'));
  //If the slide exists, we go to it
  if(slide)
  {
    goToSlide(slide);
    event.preventDefault();
  }
}

/*
*   Getting the pressed key. Only if it's up or down arrow, we go to prev or next slide and prevent default behaviour
*   This way, if there's text input, the user is still able to fill it
* */
function onKeyDown(event)
{
  let PRESSED_KEY = event.keyCode;

  if(PRESSED_KEY === keyCodes.UP)
  {
    goToPrevSlide();
    event.preventDefault();
  }
  else if(PRESSED_KEY === keyCodes.DOWN || PRESSED_KEY === keyCodes.SPACE)
  {
    goToNextSlide();
    event.preventDefault();
  }

}

/*
*   When user scrolls with the mouse, we have to change slides
* */
function onMouseWheel(event)
{
  event.preventDefault();
  //Normalize event wheel delta
  const delta = event.wheelDelta / 30 || -event.detail;

  //If the user scrolled up, it goes to previous slide, otherwise - to next slide
  if(delta < -1)
  {
    goToNextSlide();
  }
  else if(delta > 1)
  {
    goToPrevSlide();
  }


}

/*
*   If there's a previous slide, slide to it
* */
function goToPrevSlide()
{
  if (currentSlide.previousElementSibling)
  {
    goToSlide(currentSlide.previousElementSibling);
  } else {
    goToSlide(slides[slides.length-1])
  }
}

/*
*   If there's a next slide, slide to it
* */
function goToNextSlide()
{
  if (currentSlide.nextElementSibling)
  {
    goToSlide(currentSlide.nextElementSibling);
  } else {
    goToSlide(slides[0])
  }
}

/*
*   Actual transition between slides
* */
function goToSlide(slide)
{
  //If the slides are not changing and there's such a slide
  if(!isAnimating && slide)
  {
    //setting animating flag to true
    isAnimating = true;
    document.getElementsByTagName('body')[0].classList.add('animating');

    let tlTransition = new TimelineLite();
    let content = currentSlide.querySelector('.section__content-wrapper');

    tlTransition.to(content, 0.5, {opacity: 0, ease: Power2.easeOut});

    previousSlide = currentSlide;
    currentSlide = slide;
    content = currentSlide.querySelector('.section__content-wrapper');

    changeGradient(slide);
    if(currentSlide === slides[3]){
      let rev1 = new br.RevealFx(document.querySelector('.openwork.active'), {
        revealSettings : {
          backgroundColor: 'white',
          delay:1,
          onCover: function(contentEl, revealerEl) {
            contentEl.style.opacity = 1;
          }
        }
      });
      rev1.reveal();
    }


    tlTransition.to(slidesContainer, 0.3, {scrollTo: {y: pageHeight * slidesArray.indexOf(currentSlide) }});
    if(previousSlide === currentSlide) {
        // premier chargement
    }else if (currentSlide === slides[0])  {
        // retour sur accueil
      } else if ( previousSlide === slides[0]){
        // vers une autre slide que l'accueil
      }

    tlTransition.to(content, 0.5, {opacity: 1, ease: Power2.easeOut, onComplete: onSlideChangeEnd, onCompleteScope: this});


    //Animating menu items
    //TweenLite.to(navButtons.filter(".active"), 0.5, {className: "-=active"});
    //TweenLite.to(navButtons.filter("[href=#" + currentSlide.attr("id") + "]"), 0.5, {className: "+=active"});

  }
}

/*
*   Once the sliding is finished, we need to restore "isAnimating" flag.
*   You can also do other things in this function, such as changing page title
* */
function onSlideChangeEnd()
{
  isAnimating = false;
  document.getElementsByTagName('body')[0].classList.remove('animating');

}

/*
*   When user resize it's browser we need to know the new height, so we can properly align the current slide
* */
function onResize(event)
{

  //This will give us the new height of the window
  let newPageHeight = window.innerHeight;

  /*
  *   If the new height is different from the old height ( the browser is resized vertically ), the slides are resized
  * */
  if(pageHeight !== newPageHeight)
  {
    pageHeight = newPageHeight;

    //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
    TweenLite.set([slidesContainer, slides], {height: pageHeight + "px"});

    //The current slide should be always on the top
    TweenLite.set(slidesContainer, {scrollTo: {y: pageHeight * slidesArray.indexOf(currentSlide) }});
  }

}

function changeGradient(slide){
  const stateName = ''+slide.id+'-state';
  //change gradient param = "section1-state"
  granimInstance.changeState(stateName);
  //remove active class from old pagination link
    document.querySelector('.pagination__link.active').classList.remove('active');

  //add active class to new pagination link
  document.querySelector('#'+stateName).classList.add('active');
  //add current slide class to pagination wrapper (to handle colors)
  pagination.className = stateName;
}

function test(){
  console.log("je suis passé dans la fonction test")
}