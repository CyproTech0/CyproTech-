document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("commandInput");
  const output = document.getElementById("output");
  const beep = document.getElementById("sound");
  const loginPanel = document.getElementById("loginPanel");
  const loginInput = document.getElementById("loginInput");
  const loginStatus = document.getElementById("loginStatus");

  const commands = {
    help: "Comandos disponíveis:<br>• help<br>• about<br>• contact<br>• manifesto<br>• logs<br>• clear",
    about: "CyproTech: organização de infiltração e inteligência cibernética.",
    contact: "Email seguro: ops@cyprotech.black<br>Chave pública: ghostchain://drop/CYPROTECH",
    manifesto: "Somos silêncio. Somos ruptura. O mundo não precisa saber que existimos — só sentir os efeitos.",
    logs: "[+] Conexão interceptada de 192.168.0.254<br>[+] Acesso root concedido<br>[!] Monitoramento ativado<br>[+] Upload de exploits bem-sucedido",
    clear: () => { output.innerHTML = ''; return ''; }
  };

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      let cmd = input.value.trim().toLowerCase();
      if (cmd.startsWith("/")) cmd = cmd.slice(1);

      output.innerHTML += `<div><span class="prompt">root@cyprotech:~#</span> ${cmd}</div>`;
      const response = typeof commands[cmd] === "function" ? commands[cmd]() : (commands[cmd] || "Comando não reconhecido.");
      if (response) output.innerHTML += `<div>${response}</div>`;

      input.value = "";
      beep.play();
      window.scrollTo(0, document.body.scrollHeight);
    }

    if (e.ctrlKey && e.key === "l") {
      loginPanel.classList.toggle("hidden");
      loginInput.focus();
    }
  });
});

function validateLogin() {
  const input = document.getElementById("loginInput").value;
  const status = document.getElementById("loginStatus");
  if (input === "cyproghost") {
    status.innerHTML = "Acesso concedido.";
  } else {
    status.innerHTML = "Chave inválida.";
  }
}