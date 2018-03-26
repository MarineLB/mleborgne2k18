import TweenLite from 'gsap';
import * as br from './blockReveal';
const worksLinks = document.querySelectorAll('.work__link');

worksLinks.forEach(function(link) {
  link.addEventListener('mouseenter', changeWork);
})

function changeWork(event){
  event.preventDefault();
  const workName = event.target.id;
  const allWorkElements = document.querySelectorAll('.work__link, .openwork, .detail__content');
  const selectedWorkElements = document.querySelectorAll('.'+workName);

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

  selectedWorkElements.forEach(function(el) {
    el.classList.add('active');
  });
  event.target.classList.add('active');


}


