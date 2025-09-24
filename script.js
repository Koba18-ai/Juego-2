const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");
const mensaje = document.getElementById("mensaje");

draggables.forEach(drag => {
  drag.addEventListener("dragstart", () => {
    drag.classList.add("dragging");
  });
  drag.addEventListener("dragend", () => {
    drag.classList.remove("dragging");
  });
});

dropzones.forEach(zone => {
  zone.addEventListener("dragover", e => {
    e.preventDefault();
    zone.classList.add("over");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("over");
  });

  zone.addEventListener("drop", e => {
    e.preventDefault();
    const dragged = document.querySelector(".dragging");
    if (!dragged) return;

    const password = dragged.textContent;
    const type = zone.dataset.type;

    const seguras = ["Password2024!", "!S3gur@Clave99"];
    const inseguras = ["123456", "Qwerty", "Fabian123", "admin"];

    if ((type === "segura" && seguras.includes(password)) ||
        (type === "insegura" && inseguras.includes(password))) {
      zone.appendChild(dragged);
      mensaje.textContent = "🎉 ¡Correcto!";
      mensaje.style.color = "green";
    } else {
      mensaje.textContent = "❌ Incorrecto, inténtalo otra vez.";
      mensaje.style.color = "red";
    }

    zone.classList.remove("over");
  });
});

// --- Mostrar modal al ganar ---
function showModal() {
  const modal = document.getElementById("modal");
  const span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";

  // Efecto máquina de escribir para el acertijo
  const riddleText = "🕵️ Acertijo:\nSoy el lugar donde se gestiona el aprendizaje,\nno soy un aula, pero sin mí nada marcha.\nAquí se toman decisiones para que todos puedan estudiar.\n¿Dónde estoy?";
  let i = 0;
  const speed = 50;
  function typeWriter() {
    if (i < riddleText.length) {
      document.getElementById("riddle").innerHTML += riddleText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();

  // Cerrar modal
  span.onclick = function() { modal.style.display = "none"; }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
