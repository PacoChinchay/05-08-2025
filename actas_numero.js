const actas_bscarPrNmroMesa = async (form) => {
  const nroMesa = form.nroMesa.value.trim();
  const divDetalle = document.getElementById("divDetalle");

  if (!nroMesa) {
    divDetalle.innerHTML = `<div class="tab-info">Debe ingresar un número de mesa</div>`;
    return;
  }

  try {
    const response = await fetch(`http://localhost/onpe_sweb_php/actas/numero/${nroMesa}`);
    const data = await response.json();

    if (!data || data.length === 0) {
      divDetalle.innerHTML = `<div class="tab-info">EL NÚMERO DE MESA QUE HA INGRESADO NO EXISTE</div>`;
      return;
    }

    const acta = data[0];
    const estadoActa = acta.idEstadoActa === "1" ? "ACTA ELECTORAL NORMAL" : "OTRO ESTADO";

    divDetalle.innerHTML = `
      <div class="contenido-resultados">
        <p>&nbsp;</p>
        <div class="row">
          <div class="tab-content">
            <div id="detMesa">
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="presidencial">
                  <div class="tab-info-desc">
                    <div class="row">
                      <div class="col-xs-3 col-md-4">
                        <div class="mesap01">
                          <img src="images/mp-sin.jpg" class="img-responsive">
                          Si requiere la imagen del acta, solicítela a través del procedimiento de acceso a la información pública.
                        </div>
                      </div>
                      <div class="col-xs-9 col-md-8">
                        <div class="row">

                          <div class="col-xs-12">
                            <p class="subtitle1">ACTA ELECTORAL</p>
                            <div id="page-wrap">
                              <table class="table13" cellspacing="0">
                                <thead>
                                  <tr>
                                    <th>Mesa N°</th>
                                    <th>N° Copia</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>${acta.idGrupoVotacion}</td>
                                    <td>${acta.nCopia}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <p class="subtitle1">INFORMACIÓN UBIGEO</p>
                            <div id="page-wrap">
                              <table class="table14" cellspacing="0">
                                <tbody>
                                  <tr class="titulo_tabla">
                                    <td>Departamento</td>
                                    <td>Provincia</td>
                                    <td>Distrito</td>
                                    <td>Local de votación</td>
                                    <td>Dirección</td>
                                  </tr>
                                  <tr>
                                    <td>${acta.Departamento}</td>
                                    <td>${acta.Provincia}</td>
                                    <td>${acta.Distrito}</td>
                                    <td>${acta.RazonSocial}</td>
                                    <td>${acta.Direccion}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <p class="subtitle1">INFORMACIÓN MESA</p>
                            <div id="page-wrap">
                              <table class="table15" cellspacing="0">
                                <tbody>
                                  <tr class="titulo_tabla">
                                    <td>Electores hábiles</td>
                                    <td>Total votantes</td>
                                    <td>Estado del acta</td>
                                  </tr>
                                  <tr>
                                    <td>${acta.ElectoresHabiles}</td>
                                    <td>${acta.TotalVotantes}</td>
                                    <td>${estadoActa}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div class="col-xs-12 pbot30_acta">
                            <p class="subtitle1">LISTA DE RESOLUCIONES</p>
                            <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> No hay resoluciones para el acta seleccionada
                            <div id="page-wrap">
                              <div class="col-md-12 resolu"></div>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <p class="subtitle1">INFORMACIÓN DEL ACTA ELECTORAL</p>
                            <div id="page-wrap" class="cont-tabla1">
                              <table class="table06">
                                <tbody>
                                  <tr class="titulo_tabla">
                                    <td colspan="2">Organización política</td>
                                    <td>Total de Votos</td>
                                  </tr>
                                  <tr>
                                    <td>PERUANOS POR EL KAMBIO</td>
                                    <td><img width="40px" height="40px" src="images/simbolo_pkk.jpg"></td>
                                    <td>${acta.P1}</td>
                                  </tr>
                                  <tr>
                                    <td>FUERZA POPULAR</td>
                                    <td><img width="40px" height="40px" src="images/simbolo_keyko.jpg"></td>
                                    <td>${acta.P2}</td>
                                  </tr>
                                  <tr><td colspan="2">VOTOS EN BLANCO</td><td>${acta.VotosBlancos}</td></tr>
                                  <tr><td colspan="2">VOTOS NULOS</td><td>${acta.VotosNulos}</td></tr>
                                  <tr><td colspan="2">VOTOS IMPUGNADOS</td><td>${acta.VotosImpugnados}</td></tr>
                                  <tr><td colspan="2">TOTAL DE VOTOS EMITIDOS</td><td>${acta.TotalVotantes}</td></tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

  } catch (error) {
    console.error("Error al buscar acta:", error);
    divDetalle.innerHTML = `<div class="tab-info">Error al buscar el acta. Intente nuevamente.</div>`;
  }
};
