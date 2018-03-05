import TweenMax from 'gsap'
require('./morphing.js');

document.addEventListener('DOMContentLoaded', function () {

  var tlSvg = new TimelineLite();
  tlSvg.from('svg', 3, {delay: 0.3, opacity: 0, ease: Power2.easeOut})
  tlSvg.from('#corner', 10, {morphSVG: '#cornermove', yoyo:true, repeat: -1})

  var tl = new TimelineLite();
  tl.from('.title__pagetitle', 2, {opacity: 0, ease: Power2.easeOut})
  tl.from('.title__subtitle--left', 0.7, {opacity: 0, bottom: '20px', ease: Power2.easeOut})
  tl.from('.title__subtitle--right', 0.7, {opacity: 0, top: '20px', ease: Power2.easeOut})
  tl.from('.content__link', 0.5, {opacity: 0, top: '5px', ease: Power2.easeOut}, '+=1')

})
