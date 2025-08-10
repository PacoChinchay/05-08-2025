const getVotos = async () => {
  try {
    const id = new URLSearchParams(window.location.search).get("id");

    if (id) {
      const parametros = id.split("/");
      const mAmbito = [
        ["Nacional", "Provincia", "Distrito"],
        ["Continente", "País", "Ciudad"],
      ];

      const bNacional = parametros[0] === "Nacional";
      const length = parametros.length;
      let ambitoHTML = `<strong>Ámbito:</strong> ${parametros[0]}`;

      if (length > 1)
        ambitoHTML += `<br><strong>${mAmbito[bNacional ? 0 : 1][0]}:</strong> ${parametros[1]}`;
      if (length > 2)
        ambitoHTML += `<br><strong>${mAmbito[bNacional ? 0 : 1][1]}:</strong> ${parametros[2]}`;
      if (length > 3)
        ambitoHTML += `<br><strong>${mAmbito[bNacional ? 0 : 1][2]}:</strong> ${parametros[3]}`;

      const ambitoDiv = document.getElementById("ambito");
      if (ambitoDiv) {
        ambitoDiv.innerHTML = ambitoHTML;
      }
    }

    const response = await fetch(`http://localhost/onpe_sweb_php/participacion/${id}`);
    const data = await response.json();

    if (data && Array.isArray(data)) {
      const resultadosBody = document.getElementById("resultados");

      resultadosBody.innerHTML = `
        <tr class="titulo_tabla">
          <td>cambiar</td>
          <td>TOTAL ASISTENTES</td>
          <td>% TOTAL ASISTENTES</td>
          <td>TOTAL AUSENTES</td>
          <td>% TOTAL AUSENTES</td>
          <td>ELECTORES HÁBILES</td>
        </tr>
      `;

      let totalTV = 0;
      let totalTA = 0;
      let totalEH = 0;

      for (const dep of data) {
        const tv = parseInt(dep.TV.replace(/,/g, ""));
        const ta = parseInt(dep.TA.replace(/,/g, ""));
        const eh = parseInt(dep.EH.replace(/,/g, ""));

        totalTV += tv;
        totalTA += ta;
        totalEH += eh;

        const row = document.createElement("tr");
        row.setAttribute("onclick", `location.href='./participacion_total.html?id=${id}/${dep.DPD}'`);
        row.setAttribute("onmouseover", "this.style.cursor='pointer'; this.style.color='grey'");
        row.setAttribute("onmouseout", "this.style.color='black'");
        row.setAttribute("style", "cursor: pointer; color: black;");

        row.innerHTML = `
          <td>${dep.DPD}</td>
          <td>${dep.TV}</td>
          <td>${dep.PTV}</td>
          <td>${dep.TA}</td>
          <td>${dep.PTA}</td>
          <td>${dep.EH}</td>
        `;

        resultadosBody.appendChild(row);
      }

      const ptvTotal = ((totalTV / totalEH) * 100).toFixed(3) + "%";
      const ptaTotal = ((totalTA / totalEH) * 100).toFixed(3) + "%";

      const rowTotales = document.createElement("tr");
      rowTotales.innerHTML = `
        <td><strong>TOTALES</strong></td>
        <td>${totalTV.toLocaleString()}</td>
        <td>${ptvTotal}</td>
        <td>${totalTA.toLocaleString()}</td>
        <td>${ptaTotal}</td>
        <td>${totalEH.toLocaleString()}</td>
      `;

      resultadosBody.appendChild(rowTotales);
    } else {
      console.error("No se pudo cargar la data correctamente.");
    }
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
};

getVotos();
