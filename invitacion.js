/* =========================
   CONFIGURA AQUÍ
========================= */
const RSVP_ENDPOINT = "https://docs.google.com/spreadsheets/d/1CSSFSz8b-A2fUXY3wJH5u8YJQ3JF_t-9LOa2bRawVsE/edit?gid=0#gid=0/exec"; // .../exec
const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=Hotel+Santa+Barbara+Puente+Nacional+Santander";
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe5VAzH_yyNsF51FdPsryz-qVxZHWcQFKEHL8rEtyoPLndb5g/viewform";
const ENTRY_NOMBRE = "entry..877086558"; // <-- aquí pegamos el real


/* Datos editables (si quieres cambiarlos rápido) */
const EVENTO = {
  cumple: "Sandra Patricia",
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

async function enviarRSVP(respuesta, nombreInvitado){
  const status = $("status");
  if(status) status.textContent = "Enviando...";

  if(!RSVP_ENDPOINT || RSVP_ENDPOINT.includes("PEGA_AQUI")){
    if(status) status.textContent = "⚠️ Falta configurar RSVP_ENDPOINT (Apps Script).";
    return;
  }

  const nombreFinal = nombreInvitado || prompt("Escribe tu nombre para registrar la confirmación:") || "";
  if(!nombreFinal.trim()){
    if(status) status.textContent = "⚠️ El nombre es obligatorio.";
    return;
  }

  const payload = {
    nombre: nombreFinal.trim(),
    respuesta: respuesta, // "SI" / "NO"
    telefono: ($("telefono")?.value || "").trim(),
    nota: ($("notaInv")?.value || "").trim(),
    source: "web"
  };

  try{
    const r = await fetch(RSVP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const out = await r.json().catch(() => ({ ok:false, error:"Respuesta no JSON" }));

    if(out.ok){
      if(status) status.textContent = "✅ ¡Confirmación registrada! Gracias.";
      setTimeout(closeModal, 1200);
    }else{
      if(status) status.textContent = "❌ No se pudo guardar: " + (out.error || "error");
    }
  }catch(err){
    if(status) status.textContent = "❌ Error de conexión: " + String(err);
  }
}

function main(){
  // sparkles
  createSparkles();

  // set data
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

  // personalización por URL
  const invitado = parseNombreInvitado();
 if(invitado){
  if(topLine) topLine.textContent = `HOLA ${invitado.toUpperCase()}, TE INVITO A MIS`;
  if(modalHola) modalHola.textContent = `Hola ${invitado}, ¿asistirás a la celebración?`;
}else{
  if(topLine) topLine.textContent = "TE INVITO A MIS";
  if(modalHola) modalHola.textContent = "Hola, ¿asistirás a la celebración?";
}
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe5VAzH_yyNsF51FdPsryz-qVxZHWcQFKEHL8rEtyoPLndb5g/viewform";
const ENTRY_NOMBRE = "entry.987654321"; // <-- aquí pegamos el real
const ENTRY_ASISTE = "entry.987654321";

url.searchParams.set(ENTRY_ASISTE, "Sí");

function abrirFormulario(nombre){
  const url = new URL(FORM_URL);
  if(nombre) url.searchParams.set(ENTRY_NOMBRE, nombre);
  window.location.href = url.toString(); // funciona mejor en WhatsApp que window.open
}

  // events
  const btnMapa = $("btnMapa");
  if(btnMapa) btnMapa.addEventListener("click", () => window.location.href = MAPS_URL;

  //const btnConfirmar = $("btnConfirmar");
  //if(btnConfirmar) btnConfirmar.addEventListener("click", openModal);
  document.getElementById("btnConfirmar").addEventListener("click", () => {
  const p = new URLSearchParams(location.search);
  const nombre = (p.get("nombre") || "").trim();
  abrirFormulario(nombre);
});

  const cerrar = $("cerrar");
  if(cerrar) cerrar.addEventListener("click", closeModal);

  const modal = $("modal");
  if(modal){
    modal.addEventListener("click", (e) => {
      if(e.target === modal) closeModal();
    });
  }

  $("si")?.addEventListener("click", () => enviarRSVP("SI", invitado));
  $("no")?.addEventListener("click", () => enviarRSVP("NO", invitado));
}

document.addEventListener("DOMContentLoaded", main);
