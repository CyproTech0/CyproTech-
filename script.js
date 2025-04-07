document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("commandInput");
  const output = document.getElementById("output");

  const commands = {
    help: "Comandos disponíveis:<br>• help<br>• about<br>• contact<br>• manifesto<br>• clear",
    about: "CyproTech é uma organização digital que opera nas sombras, com foco em infiltração, contra-medidas e anonimato.",
    contact: "E-mail: ops@cyprotech.black<br>Chave pública: ghostchain://drop/CYPROTECH",
    manifesto: "Somos silêncio. Somos código. Somos ruptura.<br>Não precisamos ser vistos. Só causar impacto.",
    clear: () => { output.innerHTML = ''; return ''; }
  };

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      let cmd = input.value.trim().toLowerCase();
      if (cmd.startsWith("/")) cmd = cmd.slice(1);  // remove a barra

      output.innerHTML += `<div><span class="prompt">root@cyprotech:~#</span> ${cmd}</div>`;

      const response = typeof commands[cmd] === "function"
        ? commands[cmd]()
        : (commands[cmd] || "Comando não reconhecido.");

      if (response) output.innerHTML += `<div>${response}</div>`;
      input.value = "";
      window.scrollTo(0, document.body.scrollHeight);
    }
  });
});
