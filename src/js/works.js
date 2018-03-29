import TweenLite from 'gsap';
import * as br from './blockReveal';
import TextScramble from './TextScramble';

const worksLinks = document.querySelectorAll('.work__link');
const role = document.querySelector('.detail__role');
const why = document.querySelector('.detail__context');
const tech = document.querySelector('.detail__tech');

worksLinks.forEach(function(link) {
  link.addEventListener('mouseenter', changeWork);
})

function changeWork(event){
  event.preventDefault();
  if(event.target.classList.contains('active')) {
    return;
  }

  const workName = event.target.id;
  const allWorkElements = document.querySelectorAll('.work__link, .openwork');
  const selectedWorkElements = document.querySelectorAll('a.'+workName);

  const targetRole = document.querySelector('.detail__role.'+workName)
  const targetContext = document.querySelector('.detail__context.'+workName)
  const targetTech = document.querySelector('.detail__tech.'+workName)

  allWorkElements.forEach(function(el) {
    el.classList.remove('active');
  });

  let rev1 = new br.RevealFx(document.querySelector('.openwork.'+workName), {
    revealSettings : {
      backgroundColor: 'white',
      onCover: function(contentEl, revealerEl) {
        contentEl.style.opacity = 1;
      }
    }
  });
  rev1.reveal();

  const fxRole = new TextScramble(role);
  const fxWhy = new TextScramble(why);
  const fxTech = new TextScramble(tech);

  fxRole.setText(targetRole.innerHTML);
  fxWhy.setText(targetContext.innerHTML);
  fxTech.setText(targetTech.innerHTML);

  selectedWorkElements.forEach(function(el) {
    el.classList.add('active');
  });
  event.target.classList.add('active');


}


