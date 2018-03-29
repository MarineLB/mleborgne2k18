import TextScramble from './TextScramble';

const phrases = [
  'I aspire to develop vibrant web interfaces that amaze and impress. For this, I want to bring my little grain of salt from start to finish.',
  'My interests aren\'t limited to front end dev ! I love many other things : Netflix originals, rabbits, music festivals, DIY and of course the Friday night beer !',
  'The preservation of the planet, the fight against inequalities or the protection of animals are important to me. I would like to use my skills to  make the world a better place.'
]

const el = document.querySelector('.adjectives__description');
const adjectivesLinks = document.querySelectorAll('.adjectives__link a');
const fx = new TextScramble(el);

fx.setText(phrases[0]);

adjectivesLinks.forEach(function(link) {
  link.addEventListener('click', changeText);
})

function changeText(event){
  event.preventDefault();

  const textNumber = event.target.dataset.number;

  document.querySelector('.adjectives__link .active').classList.remove('active');
  event.target.classList.add('active');

  fx.setText(phrases[textNumber]).then(()=>{
    console.log("terminé de change !");
  })

}
