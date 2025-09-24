const passwords = [
  "123456",
  "admin",
  "Qwerty",
  "!S3gur@Clave99",
  "Password2024!"
];

const correctClassification = {
  inseguras: ["123456", "Fabian123", "admin", "Qwerty"],
  seguras: ["!S3gur@Clave99", "Password2024!"]
};

// Inicializar contraseñas
const passwordsContainer = document.getElementById("passwords");
passwords.forEach(pass => {
  const div = document.createElement("div");
  div.className = "password";
  div.textContent = pass;
  div.draggable = true;
  div.addEventListener("dragstart", dragStart);
  passwordsContainer.appendChild(div);
});

function dragStart(e) {
  e.dataTransfer.setData("text", e.target.textContent);
}

const dropzones = document.querySelectorAll(".dropzone");
dropzones.forEach(zone => {
  zone.addEventListener("dragover", e => e.preventDefault());
  zone.addEventListener("drop", drop);
});

function drop(e) {
  e.preventDefault();
  const text = e.dataTransfer.getData("text");
  const passwordDiv = [...document.querySelectorAll(".password")]
    .find(div => div.textContent === text);

  if (passwordDiv) {
    e.target.appendChild(passwordDiv);
    checkGame();
  }
}

function checkGame() {
  const inseguras = [...document.getElementById("inseguras").children]
    .map(div => div.textContent);
  const seguras = [...document.getElementById("seguras").children]
    .map(div => div.textContent);

  const correctInseguras = arraysEqual(inseguras, correctClassification.inseguras);
  const correctSeguras = arraysEqual(seguras, correctClassification.seguras);

  if (correctInseguras && correctSeguras) {
    // 🎉 Mostrar modal con animación y pista
    Swal.fire({
      title: "🎉 ¡Felicidades!",
      html: `
        Has clasificado todas las contraseñas correctamente.<br><br>
        🔑 Fragmento encontrado: <b>S3N4M0</b><br><br>
        📍 Acertijo de la próxima pista:<br>
        <i>"Soy el lugar donde se forman las mentes,<br>
        entre trámites, reglas y planes presentes.<br>
        Si me buscas con paciencia y tino,<br>
        hallarás el siguiente destino."</i><br><br>
        👉 <b>Administración Educativa</b>
      `,
      icon: "success",
      confirmButtonText: "Continuar",
      confirmButtonColor: "#3085d6",
      background: "#f0f9ff",
      color: "#0f172a",
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.giphy.com/media/111ebonMs90YLu/giphy.gif")
        left top
        no-repeat
      `
    });
  }
}

function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
}

