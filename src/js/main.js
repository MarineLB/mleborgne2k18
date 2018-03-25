import TweenMax from 'gsap';
import Granim from 'granim';
require('./morphing.js')
require('./sections.js')
require('./description.js')
require('./gradient.js')
require('./cursor.js')
require('./works.js')

document.addEventListener('DOMContentLoaded', function () {

  let tlSvg = new TimelineLite();
  //tlSvg.from('svg', 3, {delay: 0.3, opacity: 0, ease: Power2.easeOut})
  tlSvg.from('#corner', 10, {morphSVG: '#cornermove', yoyo:true, repeat: -1})

  let tl = new TimelineLite();
  tl.from('.title__pagetitle', 2, {opacity: 0, ease: Power2.easeOut})
  tl.from('.title__subtitle--left', 0.7, {opacity: 0, bottom: '20px', ease: Power2.easeOut})
  tl.from('.content__link', 0.5, {opacity: 0, top: '5px', ease: Power2.easeOut}, '+=1')

})

