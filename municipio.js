const urlParams = new URLSearchParams(window.location.search);
const nomeMunicipio = urlParams.get("municipio");

const SHEET_ID = "1KOOG5Udj8BeB9MsW5S8Fwdgtj2wvQr8WL42fkEoJuc0";
const ABA = "municipios";

const url = `https://opensheet.elk.sh/${SHEET_ID}/${ABA}`;

fetch(url)
  .then(response => response.json())
  .then(dados => {
    const municipio = dados.find(
      m => m.municipio.toLowerCase() === nomeMunicipio.toLowerCase()
    );

    if (!municipio) {
      alert("Município não encontrado");
      return;
    }

    document.getElementById("nome_municipio").innerText = municipio.municipio;
    document.getElementById("redec").innerText = municipio.redec;

    document.getElementById("pmrr").innerText = municipio.pmrr || "Não informado";
    document.getElementById("pmrr_data").innerText = municipio.pmrr_data || "—";

    document.getElementById("simulado").innerText = municipio.simulado || "Não";
    document.getElementById("qnt_simulado").innerText = municipio.qnt_simulado || "—";
    document.getElementById("tipo_simulado").innerText = municipio.tipo_simulado || "—";

    document.getElementById("plano_contingencia").innerText =
      municipio.plano_contingencia || "Não informado";

    document.getElementById("nupdec").innerText = municipio.nupdec || "0";
    document.getElementById("colab_nupdec").innerText = municipio.colab_nupdec || "0";

    document.getElementById("colab_s2id").innerText = municipio.colab_s2id || "0";

    document.getElementById("carta_risco").innerText = municipio.carta_risco || "Não";
  })
  .catch(err => {
    console.error(err);
    alert("Erro ao carregar dados do município.");
  });
