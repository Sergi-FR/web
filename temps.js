document.addEventListener('DOMContentLoaded', iniciar);

let temps = document.getElementById('temps');

function iniciar() {

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {

    console.log(`readyState: ${this.readyState} status: ${this.status}`);

    if (this.readyState == 4 && this.status == 200) {
      infotemps(this);

    }
  };

  xhttp.open("GET", "https://static-m.meteo.cat/content/opendata/ctermini_comarcal.xml", true);
  xhttp.send();

}

function infotemps(xml) {

  var xmlDoc;

  xmlDoc = xml.responseXML;

  var infocomarca = xmlDoc.getElementsByTagName('comarca');
  var infotemps = xmlDoc.getElementsByTagName('variable');
  var precipitacio = xmlDoc.getElementsByTagName('precipitacio');
  var acumulacio = xmlDoc.getElementsByTagName('acumulacio');
  var intensitat = xmlDoc.getElementsByTagName('intensitat');
  var calamarsa = xmlDoc.getElementsByTagName('calamarsa');

  var f;

  var i;



  for (i = 0; i < infotemps.length; i++) {
    if (infocomarca[i].getAttribute('nomCOMARCA') == "L'Alt Camp") {
      document.getElementById("temps").innerHTML +=
        `<div class="temps">
      <p>${infocomarca[i].getAttribute('nomCOMARCA')} </p>
      <p>${infocomarca[i].getAttribute('nomCAPITALCO')} </p>
      <p><span>Dia: </span> ${infotemps[0].getAttribute('data')} ${infotemps[1].getAttribute('data')} </p>
      <p>${infotemps[i].getAttribute('tempmax')} ${infotemps[i].getAttribute('tempmin')}</p>
      <img src="${infotemps[i].getAttribute('simbolmati')}" alt="simbol-temps"/>`;

      for (f = 0; f < precipitacio.length; f++) {
        if (infotemps[i].getAttribute('probprecipitaciomati') == f && precipitacio[i].getAttribute('nomprobprecipitaciomati') != null) {

          document.getElementById("temps").innerHTML += `<p><span>Precipitacions: </span>${precipitacio[i].getAttribute('nomprobprecipitaciomati')} </p>`;

        }
      }

      for (f = 0; f < acumulacio.length; f++) {
        if (infotemps[i].getAttribute('precipitacioacumuladamati') == f && acumulacio[i].getAttribute('nomprecipitacioacumuladamati') == null) {

          document.getElementById("temps").innerHTML += `<p><span>Acumulació: </span>${acumulacio[i].getAttribute('nomprecipitacioacumuladamati')} </p>`;

        }
      }

      for (f = 0; f < intensitat.length; f++) {
        if (infotemps[i].getAttribute('intensitatprecimati') == f && intensitat[i].getAttribute('nomintensitatprecimati') == null) {

          document.getElementById("temps").innerHTML += `<p><span>Probalilitat Precipitacio mati: </span>${intensitat[i].getAttribute('nomintensitatprecimati')} </p>`;

        }
      }

      for (f = 0; f < calamarsa.length; f++) {
        if (infotemps[i].getAttribute('probcalamati') == f && calamarsa[i].getAttribute('nomintensitatprecimati') == null) {

          document.getElementById("temps").innerHTML += `<p><span>Calamarsa: </span>${calamarsa[i].getAttribute('nomintensitatprecimati')} </p>`;

        }
      }

      `</div>`;

    }

  }

}

