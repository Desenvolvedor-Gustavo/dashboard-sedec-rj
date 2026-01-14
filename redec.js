const params = new URLSearchParams(window.location.search);
const redecSelecionada = params.get("redec");

document.getElementById("nome-redec").innerText = `REDEC ${redecSelecionada}`;

const SHEET_ID = "1KOOG5Udj8BeB9MsW5S8Fwdgtj2wvQr8WL42fkEoJuc0";
const ABA = "municipios";

const url = `https://opensheet.elk.sh/${SHEET_ID}/${ABA}`;

fetch(url)
  .then(res => res.json())
  .then(dados => {
    const container = document.getElementById("lista-municipios");

    const municipios = dados.filter(
      m => m.redec.toLowerCase() === redecSelecionada.toLowerCase()
    );

    if (municipios.length === 0) {
      container.innerHTML = "<p>Nenhum município encontrado.</p>";
      return;
    }

    municipios.forEach(m => {
      const card = document.createElement("div");
      card.className = "card resumo";
      card.onclick = () => {
        window.location.href =
          `municipio.html?municipio=${encodeURIComponent(m.municipio)}`;
      };
    
      card.innerHTML = `
        <h3>${m.municipio}</h3>
        <p class="subtitulo">Município da REDEC ${redecSelecionada}</p>
      `;
    
      container.appendChild(card);
    });


  })
  .catch(err => {
    console.error(err);
    alert("Erro ao carregar dados da REDEC.");
  });
