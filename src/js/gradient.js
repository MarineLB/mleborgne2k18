import Granim from 'granim';

let granimInstance = new Granim({
  element: '#canvas-interactive',
  name: 'interactive-gradient',
  elToSetClassOn: '.canvas-interactive-wrapper',
  direction: 'diagonal',
  opacity: [1, 1],
  isPausedWhenNotInView: true,
  stateTransitionSpeed: 500,
  states : {
    "default-state": {
      gradients: [ ['#FFF', '#FFF'] ],
      loop: false
    },
    "section-1-state": {
      gradients: [ ['#fff', '#fff'] ],
      loop: false
    },
    "section-2-state": {
      gradients: [ ['#FAEAAB', '#F3ADAD'] ],
      loop: false
    },
    "section-3-state": {
      gradients: [ ['#F3ADAD', '#8377D7'] ],
      loop: false
    },
    "section-4-state": {
      gradients: [ ['#8377D7', '#1432DA'] ],
      loop: false
    }
  }
});

export default granimInstance;