const params = new URLSearchParams(window.location.search);
const redec = params.get("redec");

if (!redec) {
  alert("REDEC não informada na URL");
} else {
  document.getElementById("nome-redec").innerText = redec;
  document.getElementById("titulo-redec").innerText = `REDEC ${redec}`;
}
