const text = "\"Não estamos à vista. Estamos no controle.\"";
let i = 0;
const speed = 60;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

document.getElementById("typewriter").innerHTML = "";
typeWriter();