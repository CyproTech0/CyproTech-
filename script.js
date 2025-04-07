const text = "Não estamos à vista. Estamos no controle.";
let i = 0;
const speed = 55;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function revealOnScroll() {
  const cards = document.querySelectorAll('.reveal');
  cards.forEach(card => {
    const windowHeight = window.innerHeight;
    const elementTop = card.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      card.classList.add('show');
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("typewriter").innerHTML = "";
  typeWriter();
  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);
});
