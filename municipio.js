const SHEET_ID = "1KOOG5Udj8BeB9MsW5S8Fwdgtj2wvQr8WL42fkEoJuc0";

const params = new URLSearchParams(window.location.search);
const municipioSelecionado = decodeURIComponent(params.get("municipio") || "").trim();

if (!municipioSelecionado) {
  alert("Município não informado na URL.");
}

const url = `https://opensheet.elk.sh/${SHEET_ID}/municipios`;

fetch(url)
  .then(res => {
    if (!res.ok) throw new Error("Erro ao acessar planilha");
    return res.json();
  })
  .then(dados => {

    const m = dados.find(d =>
      d.municipio &&
      d.municipio.toLowerCase().trim() === municipioSelecionado.toLowerCase()
    );

    if (!m) {
      alert("Município não encontrado na planilha.");
      return;
    }

    document.getElementById("titulo").innerText = m.municipio;
    document.getElementById("redec").innerText = "REDEC: " + m.redec;

    document.getElementById("pmrr").innerText = m.pmrr || "Não";
    document.getElementById("pmrr_data").innerText = m.pmrr_data || "—";

    document.getElementById("simulado").innerText = m.simulado || "Não";
    document.getElementById("qnt_simulado").innerText = m.qnt_simulado || "0";
    document.getElementById("tipo_simulado").innerText = m.tipo_simulado || "—";

    document.getElementById("plano_contingencia").innerText =
      m.plano_contingencia || "Não informado";

    document.getElementById("nupdec").innerText = m.nupdec || "0";
    document.getElementById("colab_nupdec").innerText = m.colab_nupdec || "0";

    document.getElementById("colab_s2id").innerText = m.colab_s2id || "0";
    document.getElementById("carta_risco").innerText = m.carta_risco || "Não";
  })
  .catch(err => {
    console.error(err);
    alert("Erro ao carregar dados do município.");
  });
