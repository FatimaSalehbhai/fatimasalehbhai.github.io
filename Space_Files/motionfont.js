// Wrap every letter in a span
var textWrapper = document.querySelector('.ml9 .letter-a');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
var textWrapper = document.querySelector('.ml9 .letter-b');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter2'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml9 .letter',
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => 45 * (i+1)
  })
  .add({
    targets: '.ml9 .letter',
    opacity: [1, 0],
    duration: 100,
    delay: 700
  })
  .add({
    targets: '.ml9 .letter2',
    opacity: [0,1],
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => 45 * (i+1),
  })
  .add({
    targets: '.ml9 .letter2',
    opacity: [1, 0],
    duration: 100,
    delay: 700
  })
  .add({
    targets: '.ml9',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });