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
    document.getElementById("pmrr_data").innerText =
      municipio.pmrr_data && municipio.pmrr_data !== ""
        ? municipio.pmrr_data
        : "Não informado";

    // Simulados
    document.getElementById("simulados").innerText = municipio.simulado || "Não";
    document.getElementById("simulados_qtd").innerText =
      municipio.qnt_simulado && municipio.qnt_simulado !== ""
        ? municipio.qnt_simulado
        : "0";
    document.getElementById("simulados_tipo").innerText =
      municipio.tipo_simulado && municipio.tipo_simulado !== ""
        ? municipio.tipo_simulado
        : "—";

    // Plano de Contingência (mostrar texto completo)
    document.getElementById("plano_contingencia").innerText =
      municipio.plano_contingencia && municipio.plano_contingencia.trim() !== ""
        ? municipio.plano_contingencia
        : "Não informado";

    // NUPDEC
    document.getElementById("nupdec_qtd").innerText = municipio.nupdec || "0";
    document.getElementById("colab_nupdec").innerText =
      municipio.colab_nupdec || "0";

    // S2ID
    document.getElementById("colab_s2id").innerText =
      municipio.colab_s2id || "0";

    // Carta de Risco
    document.getElementById("carta_risco").innerText =
      municipio.carta_risco || "Não";
  })
  .catch(err => {
    console.error(err);
    alert("Erro ao carregar dados do município.");
  });
