import TweenMax from 'gsap'

document.addEventListener('DOMContentLoaded', function () {
  TweenMax.from('svg', 3, {delay: 0.3, opacity: 0, ease: Power2.easeOut})
  TweenMax.from('.title__pagetitle', 2, {delay: 0.3, opacity: 0, ease: Power2.easeOut})
  TweenMax.from('.title__subtitle--left', 0.5, {delay: 1.5, opacity: 0, bottom: '30px', ease: Power2.easeOut})
  TweenMax.from('.title__subtitle--right', 0.7, {delay: 2, opacity: 0, top: '50px', ease: Power2.easeOut})
  TweenMax.from('.content__link', 0.3, {delay: 3, opacity: 0, ease: Power2.easeOut})

  TweenMax.from('#corner', 0.3, {delay: 1, morphSVG: "#cornermove"})

})
