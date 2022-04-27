const enterCircleAnimation = () => {
  const enterContainer = document.querySelector('.enter-container');
  const enterContentWrapper = document.querySelector('.enter-content-wrapper');
  const circle = document.querySelector('.enter-circle');
  
  const tl = gsap.timeline();
  tl.to(enterContentWrapper, {duration: .5, opacity: 0})
    .to(enterContainer, {duration: .1, backgroundColor: '#fff'})
    .to(circle, {duration: .1, display: 'block'}, "-=.2")
    .to(circle, {duration: 2, scale: 0})
    .to(enterContainer, {duration: .1, opacity: 0})
    .to(enterContainer, {duration: .1, display: "none"})
}

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector("#enter-start-button");
  startBtn.addEventListener("click", enterCircleAnimation);
});