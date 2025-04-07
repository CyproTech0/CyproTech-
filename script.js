document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("commandInput");
  const output = document.getElementById("output");
  const beep = document.getElementById("sound");
  const errorSound = document.getElementById("error");
  const loginPanel = document.getElementById("loginPanel");
  const loginInput = document.getElementById("loginInput");
  const loginStatus = document.getElementById("loginStatus");

  const responses = {
    help: "Comandos:\nhelp\nabout\ncontact\nmanifesto\nlogs\nclear\nscan\ntrace\ninject\ncd\nls",
    about: "CyproTech: rede subterrânea de inteligência digital.",
    contact: "Email: ops@cyprotech.black\nChave pública: ghostchain://drop/CYPROTECH",
    manifesto: "Somos silêncio. Somos código. A ruptura está em curso.",
    logs: "[+] Conexão interceptada\n[+] Root acessado\n[!] Logs em tempo real ativados",
    scan: "Scanner de rede:\n• 192.168.0.1 [OPEN]\n• 192.168.0.105 [FIREWALLED]\n• 10.0.0.99 [EXPLOITABLE]",
    trace: "Rastreando...\nCamada 1 OK\nCamada 2 OK\nIP real mascarado via GhostProtocol.",
    inject: "Injetando payload...\nStatus: SUCESSO\nOverride em kernel virtual.",
    cd: "Permissão negada: ambiente isolado.",
    ls: "profile.sys\naccess.log\nexploit.bat\n",
    clear: () => { output.innerHTML = ''; return ''; }
  };

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      let cmd = input.value.trim().toLowerCase();
      if (cmd.startsWith("/")) cmd = cmd.slice(1);

      output.innerHTML += `<div><span class="prompt">root@cyprotech:~#</span> ${cmd}</div>`;
      beep.play();
      typeResponse(cmd);
      input.value = "";
    }

    if (e.ctrlKey && e.key === "l") {
      loginPanel.classList.toggle("show");
      loginInput.focus();
    }
  });

  function typeResponse(cmd) {
    const response = typeof responses[cmd] === "function" ? responses[cmd]() : (responses[cmd] || "Comando não reconhecido.");
    if (!response) return;

    const lines = response.split("\n");
    let lineIndex = 0;
    let charIndex = 0;

    function typeNextChar() {
      if (lineIndex >= lines.length) return;

      if (charIndex === 0) {
        const line = document.createElement("div");
        line.id = `line-${lineIndex}`;
        output.appendChild(line);
      }

      const lineElem = document.getElementById(`line-${lineIndex}`);
      lineElem.textContent += lines[lineIndex].charAt(charIndex);
      charIndex++;

      if (charIndex < lines[lineIndex].length) {
        setTimeout(typeNextChar, 15);
      } else {
        charIndex = 0;
        lineIndex++;
        setTimeout(typeNextChar, 100);
      }
    }

    typeNextChar();
  }
});

function validateLogin() {
  const input = document.getElementById("loginInput").value;
  const status = document.getElementById("loginStatus");
  const errorSound = document.getElementById("error");

  status.innerHTML = "Logando...";
  setTimeout(() => {
    if (input === "cyproghost") {
      status.innerHTML = "Acesso concedido.";
    } else {
      status.innerHTML = "Acesso negado.";
      errorSound.play();
    }
  }, 1000);
}
