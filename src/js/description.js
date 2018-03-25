class TextScramble {
  constructor(el){
    this.el = el;
    this.chars = '   abcdefghijklmnopqrstuvy';
    this.update = this.update.bind(this);
  }

  setText(newText){
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length,newText.length);
    const promise = new Promise((resolve)=>this.resolve = resolve);

    this.queue = [];
    for(let i = 0;i<length;i++){
      const from = oldText[i] || '';
      const to  = newText[i] || '';
      const start = Math.floor(Math.random()*40);
      const end = Math.floor(Math.random()*40) + start;
      this.queue.push({from,to,start,end});
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update(){
    let output = '';
    let complete = 0;
    for(let i=0,n=this.queue.length;i<n;i++){
      let {from,to,start,end,char} = this.queue[i];

      if(this.frame >= end){
        complete++;
        output += to;
      }else if(this.frame >= start){
        if(!char || Math.random() < 0.28){char = this.randomChar();this.queue[i].char = char;}
        output += `<span class='dud'>${char}</span>`;
      }else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if(complete === this.queue.length){this.resolve();}else{
      this.frameRequest = requestAnimationFrame(this.update);this.frame++;}
  }

  randomChar(){
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const phrases = [
  'J’aspire à développer des interfaces web vivantes, vibrantes, qui étonnent et impressionnent. ' +
  'Pour cela, je souhaite apporter mon petit grain de sel de la réflexion jusqu’à la réalisation.',
  'Beaucoup d’autres choses me passionnent dans la vie. En vrac : les créations originales Netflix, les lapins, les festivals de musiques, le DIY, la Bretagne et enfin la bière du vendredi soir',
  'La préservation de la planète, la lutte contre les inégalités ou la protection des animaux sont des sujets qui me tiennent à coeur. J’aimerais mettre mes compétences au service de ces causes'
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
