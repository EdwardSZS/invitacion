/* =========================
   CONFIGURA AQUÍ
========================= */

// 1) Google Maps
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Hotel+Santa+Barbara+Puente+Nacional+Santander";

// 2) Google Form (tu link)
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe5VAzH_yyNsF51FdPsryz-qVxZHWcQFKEHL8rEtyoPLndb5g/viewform";
// 3) IDs reales del formulario (DEBES PONERLOS BIEN)
// ✅ Ejemplo: "entry.877086558"  (SIN DOBLE PUNTO)
const ENTRY_NOMBRE = "entry.877086558";     // <-- CAMBIA por tu entry real
const ENTRY_ASISTE = "entry.123456789";     // <-- CAMBIA por tu entry real (pregunta Sí/No)

/* Datos editables del evento */
const EVENTO = {
  cumple: "Patricia",
  dia: "Sábado",
  numDia: "21",
  mes: "FEBRERO",
  hora: "2:00 pm",
  hotel: "HOTEL SANTA BARBARA",
  ciudad: "Puente Nacional\nSantander",
  phoneText: "(57) 3213837355"
};

/* ========================= */

function $(id){ return document.getElementById(id); }

function setText(id, text){
  const el = $(id);
  if(el) el.textContent = text;
}

function createSparkles(){
  const box = $("sparkles");
  if(!box) return;
  for(let i=0;i<24;i++){
    const s = document.createElement("i");
    s.style.left = (Math.random()*100) + "%";
    s.style.top  = (60 + Math.random()*35) + "%";
    s.style.animationDelay = (Math.random()*4) + "s";
    s.style.animationDuration = (3.2 + Math.random()*2.8) + "s";
    box.appendChild(s);
  }
}

function parseNombreInvitado(){
  const params = new URLSearchParams(location.search);
  return (params.get("nombre") || "").trim();
}

function openModal(){
  const modal = $("modal");
  if(modal) modal.style.display = "block";
}

function closeModal(){
  const modal = $("modal");
  if(modal) modal.style.display = "none";
}

function abrirFormulario({ nombre, asiste }) {
  // Validaciones básicas para que no falle silencioso
  if(!FORM_URL) return alert("Falta FORM_URL");
  if(!ENTRY_NOMBRE || !ENTRY_NOMBRE.startsWith("entry.")) return alert("ENTRY_NOMBRE inválido. Debe ser entry.XXXX");
  if(!ENTRY_ASISTE || !ENTRY_ASISTE.startsWith("entry.")) return alert("ENTRY_ASISTE inválido. Debe ser entry.XXXX");

  const url = new URL(FORM_URL);

  // Prefill (si no hay nombre en URL, preguntamos)
  let nombreFinal = (nombre || "").trim();
  if(!nombreFinal){
    nombreFinal = (prompt("Escribe tu nombre:") || "").trim();
  }
  if(!nombreFinal) return;

  // Prellenar campos
  url.searchParams.set(ENTRY_NOMBRE, nombreFinal);
  url.searchParams.set(ENTRY_ASISTE, asiste); // Debe coincidir EXACTO con la opción del formulario: "Sí" o "No"

  // En WhatsApp/ móvil es mejor redirigir así:
  window.location.href = url.toString();
}

function main(){
  createSparkles();

  // pintar datos si existen ids en tu HTML
  setText("cumple", EVENTO.cumple);
  setText("dia", EVENTO.dia);
  setText("numDia", EVENTO.numDia);
  setText("mes", EVENTO.mes);
  setText("hora", EVENTO.hora);
  setText("hotel", EVENTO.hotel);

  const ciudadEl = $("ciudad");
  if(ciudadEl) ciudadEl.innerHTML = EVENTO.ciudad.replace(/\n/g, "<br/>");

  const confirmInfo = $("confirmInfo");
  if(confirmInfo){
    confirmInfo.innerHTML = `Confirmar asistencia al: <span class="phone">${EVENTO.phoneText}</span>`;
  }

  // saludo personalizado
  const invitado = parseNombreInvitado();
  //const topLine = $("topLine");
  const topLine = document.getElementById("topLine");
  const modalHola = $("modalHola");

  if(invitado){
    if(topLine) topLine.textContent = `${invitado.toUpperCase()}, queremos invitarle a compartir un almuerzo con motivo de celebrar los:`;
    if(modalHola) modalHola.textContent = `Hola ${invitado}, ¿asistirás a la celebración?`;
  } else {
    if(topLine) topLine.textContent = "queremos invitarle a compartir un almuerzo con motivo de celebrar los:  ";
    if(modalHola) modalHola.textContent = "Hola, ¿asistirás a la celebración?";
  }

  // MAPA
  const btnMapa = $("btnMapa");
  if(btnMapa){
    btnMapa.addEventListener("click", () => {
      window.location.href = MAPS_URL;
    });
  }

  // Confirmar -> abre modal
  const btnConfirmar = $("btnConfirmar");
  if(btnConfirmar){
    btnConfirmar.addEventListener("click", openModal);
  }

  // Cerrar modal
  $("cerrar")?.addEventListener("click", closeModal);

  // Click fuera del modal para cerrar
  const modal = $("modal");
  if(modal){
    modal.addEventListener("click", (e) => {
      if(e.target === modal) closeModal();
    });
  }

  // Botones Sí/No -> abren Google Form prellenado
  $("si")?.addEventListener("click", () => abrirFormulario({ nombre: invitado, asiste: "Sí" }));
  $("no")?.addEventListener("click", () => abrirFormulario({ nombre: invitado, asiste: "No" }));
}

document.addEventListener("DOMContentLoaded", main);
