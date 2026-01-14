const SHEET_ID = "COLE_AQUI_O_ID_DA_PLANILHA";

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
      m.municipio.toLowerCase() === municipioSelecionado.toLowerCase()
    );

    if (!municipio) {
      alert("Município não encontrado.");
      return;
    }

    document.getElementById("titulo").innerText = municipio.municipio;
    document.getElementById("redec").innerText =
      "REDEC: " + municipio.redec;

    document.getElementById("pmrr").innerText = municipio.pmrr || "Não informado";
    document.getElementById("pmrr_data").innerText = municipio.pmrr_data || "—";

    document.getElementById("simulados").innerText = municipio.simulados_2025 || "Não";
    document.getElementById("simulados_qtd").innerText = municipio.simulados_qtd || "0";
    document.getElementById("simulados_tipo").innerText = municipio.simulados_tipo || "—";

    document.getElementById("plano_contingencia").innerText =
      municipio.plano_contingencia || "Não informado";
    document.getElementById("plano_riscos").innerText =
      municipio.plano_contingencia_riscos || "—";
    document.getElementById("plano_data").innerText =
      municipio.plano_contingencia_data || "—";

    document.getElementById("nupdec").innerText = municipio.nupdec || "Não";
    document.getElementById("nupdec_qtd").innerText = municipio.nupdec_qtd || "0";
    document.getElementById("nupdec_datas").innerText = municipio.nupdec_datas || "—";
    document.getElementById("colab_nupdec").innerText = municipio.colab_nupdec || "0";

    document.getElementById("colab_s2id").innerText = municipio.colab_s2id || "0";

    document.getElementById("carta_risco").innerText =
      municipio.carta_risco || "Não";
    document.getElementById("carta_risco_data").innerText =
      municipio.carta_risco_data || "—";
  })
  .catch(err => {
    console.error(err);
    alert("Erro ao carregar dados do município.");
  });
