const links = document.querySelectorAll('a');
const cursor = document.getElementsByClassName('cursor')[0];

document.body.style.cursor = "none";

document.addEventListener("mousemove", function(e){
    let ancho = cursor.offsetWidth,
    alto = cursor.offsetHeight,
    W = ancho/2,
    H = alto/2;
    cursor.style.top = e.pageY - W+'px';
    cursor.style.left = ''+e.pageX - H+'px';
});

links.forEach(function(link) {
  link.style.cursor = "none";
  link.addEventListener('mouseover', function(e){
    cursor.classList.add('hover');

  });
  link.addEventListener('mouseout', function(e){
    cursor.classList.remove('hover');
  });
})

document.addEventListener("mouseleave", function(event){

  if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight))
  {
    cursor.classList.add('hide');
  }
});
document.addEventListener("mouseenter", function(event){

  if(event.clientY >= 0 || event.clientX >= 0 || (event.clientX <= window.innerWidth || event.clientY <= window.innerHeight))
  {
    cursor.classList.remove('hide');
  }
});