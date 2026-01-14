const SHEET_ID = "1KOOG5Udj8BeB9MsW5S8Fwdgtj2wvQr8WL42fkEoJuc0";

const params = new URLSearchParams(window.location.search);
const municipioSelecionado = params.get("municipio");

if (!municipioSelecionado) {
  alert("Município não informado na URL.");
}

const url = `https://opensheet.elk.sh/${SHEET_ID}/municipios`;

fetch(url)
  .then(res => res.json())
  .then(dados => {

    const municipio = dados.find(m =>
      m.municipio &&
      m.municipio.toLowerCase() === municipioSelecionado.toLowerCase()
    );

    if (!municipio) {
      alert("Município não encontrado.");
      return;
    }

    // Cabeçalho
    document.getElementById("titulo").innerText = municipio.municipio;
    document.getElementById("redec").innerText = "REDEC: " + municipio.redec;

    // PMRR
    document.getElementById("pmrr").innerText = municipio.pmrr || "Não";
    document.getElementById("pmrr_data").innerText = municipio.pmrr_data || "—";

    // Simulados
    document.getElementById("simulados").innerText = municipio.simulado || "Não";
    document.getElementById("simulados_qtd").innerText = municipio.qnt_simulado || "0";
    document.getElementById("simulados_tipo").innerText = municipio.tipo_simulado || "—";

    // Plano de Contingência
    document.getElementById("plano_contingencia").innerText =
      municipio.plano_contingencia || "Não informado";
    document.getElementById("plano_riscos").innerText =
      municipio.plano_contingencia || "—";
    document.getElementById("plano_data").innerText = "—";

    // NUPDEC
    document.getElementById("nupdec").innerText =
      municipio.nupdec && municipio.nupdec !== "0" ? "Sim" : "Não";
    document.getElementById("nupdec_qtd").innerText = municipio.nupdec || "0";
    document.getElementById("nupdec_datas").innerText = "—";
    document.getElementById("colab_nupdec").innerText = municipio.colab_nupdec || "0";

    // S2ID
    document.getElementById("colab_s2id").innerText = municipio.colab_s2id || "0";

    // Carta de Risco
    document.getElementById("carta_risco").innerText = municipio.carta_risco || "Não";
    document.getElementById("carta_risco_data").innerText = "—";
  })
  .catch(err => {
    console.error(err);
    alert("Erro ao carregar dados do município.");
  });
