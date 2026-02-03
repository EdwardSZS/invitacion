const SHEET_ID = "1CSSFSz8b-A2fUXY3wJH5u8YJQ3JF_t-9LOa2bRawVsE";
const TAB_NAME = "Hoja 1"; // si tu pestaña se llama distinto, cámbiala

function setupHeaders() {
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_NAME);
  const headers = ["timestamp", "nombre", "respuesta", "telefono", "nota", "source"];
  const firstRow = sh.getRange(1,1,1,headers.length).getValues()[0];
  if (firstRow.join("") === "") sh.getRange(1,1,1,headers.length).setValues([headers]);
}

function doPost(e) {
  try {
    setupHeaders();
    const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_NAME);

    const data = JSON.parse(e.postData.contents || "{}");
    const nombre = (data.nombre || "").toString().trim();
    const respuesta = (data.respuesta || "").toString().trim(); // "SI" o "NO"
    const telefono = (data.telefono || "").toString().trim();
    const nota = (data.nota || "").toString().trim();
    const source = (data.source || "").toString().trim(); // opcional: "whatsapp"

    if (!nombre || !respuesta) {
      return ContentService.createTextOutput(JSON.stringify({ ok:false, error:"Falta nombre o respuesta" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sh.appendRow([new Date(), nombre, respuesta, telefono, nota, source]);

    return ContentService.createTextOutput(JSON.stringify({ ok:true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok:false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
// ==== SPOTIFY MUSICA ====
const SPOTIFY_LINK = "https://open.spotify.com/intl-es/track/5kWzM5dWoG54dGyFb5uMuX?si=60924efa86814a06"; 
// Ej: https://open.spotify.com/track/xxxxxxxxxxxxxxxx

const overlay = document.getElementById("musicOverlay");
const openSpotify = document.getElementById("openSpotify");
const skipMusic = document.getElementById("skipMusic");

// Abre Spotify y deja la tarjeta visible
openSpotify.href = SPOTIFY_LINK;
openSpotify.addEventListener("click", () => {
  // Guardar preferencia (para que si vuelve a abrir no moleste)
  localStorage.setItem("music_prompt_done", "1");
  // Oculta overlay (Spotify abre en otra pestaña/app)
  overlay.style.display = "none";
});

// Continuar sin música
skipMusic.addEventListener("click", () => {
  localStorage.setItem("music_prompt_done", "1");
  overlay.style.display = "none";
});

// Mostrar overlay solo la primera vez
if (localStorage.getItem("music_prompt_done") === "1") {
  overlay.style.display = "none";
}

