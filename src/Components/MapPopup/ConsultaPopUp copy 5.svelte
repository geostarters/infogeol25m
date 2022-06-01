<script>
  import { onMount, onDestroy } from "svelte";
  import { keyApp } from "../../config";
  import { getContext } from "svelte";
  import IconButton, { Icon } from "@smui/icon-button";
import InfoBox from "./InfoBox.svelte";
  import DrawerBottom from "../../Panels/PanelTall/DrawerBottom.svelte";

  import mapbox from "mapbox-gl";

  const changePaintProperty = getContext("changePaintProperty");
  const changeColorProperty = getContext("changeColorProperty");
  const changeInitialColorProperty = getContext("changeInitialColorProperty");
  const overLayers = getContext("overLayers");
  const { getMap } = getContext(keyApp);
  const map = getMap();
  //let consulta_show = false;

  var tall_show = false;
  var selectedTall = [];
  var highliItem = [];
  let exportarshow = false
function esborra () {
  changeInitialColorProperty(highliItem[0]);
  exportarshow = false
}

  function changeTallState() {
    tall_show = !tall_show;
    // changeInitialColorProperty(highliItem[0]);
  }

  function removeLastItem(item) {
    //console.log('lastitem', item)
  }
let exportartextok = '';
let exportartext = '';
  onMount(async () => {
    var popup = new mapbox.Popup({
      offset: [0, -15],
      closeOnClick: false,
      closeButton: true,
    });

    //     console.log('abans', highliItem)
    map.on("click", function (e) {
      popup.addTo(map).on(
        "close",
        function (e) {
          //console.log("estic entrant??");
          changeInitialColorProperty(highliItem[0]);
        }
        // "click", changeTallState
      );

      var bbox = [
        [e.point.x - 1.0, e.point.y - 1.0],
        [e.point.x + 1.0, e.point.y + 1.0],
      ];

      var features = map.queryRenderedFeatures(bbox);
      //console.log("info", features);

      let text = '';
      let exportartext = '';
      // let text = '<h3 style="color: #1a4971">Descripció:</h3>';
      var elementsArray = [];
      var highlightedItems = [];

      var episArray = [];
      var idabsArray = [];
      var edatArray = [];
      var edatMetArray = [];
      var epocaArray = [];
      var eraArray = [];
      var metArray = [];
      var obsEdatArray = [];
      var periodeArray = [];
      var tallArray = [];

      highlightedItems.push(features);

      if (highliItem[0] !== undefined) {
        changeInitialColorProperty(highliItem[0]);
      }

      highlightedItems.forEach((highItem) => {
        if (highItem[0].source === "infogeo") {
          highliItem = [];

          changeColorProperty(highItem[0]);
          highliItem.push(highItem[0]);
        }
      });

      // ELEMENTS A MOSTRAR AL POPUP //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      features.forEach((element) => {
        if (
          element.source === "infogeo" &&
          element.properties.DESCRIPCIO //importem descripcio
        ) {
          let desc = element.properties.DESCRIPCIO;
          //console.log('oooooooo', element)
          if (elementsArray.includes(desc)) {
          } else {
            elementsArray.push(desc);
          }

          if (element.properties.CODI_CAS != undefined) {
            //importem CODI_CAS
            let epigraf_publ = element.properties.CODI_CAS;

            if (episArray.includes(epigraf_publ)) {
            } else {
              episArray.push(epigraf_publ);
            }
          }

//son poligons... importar totes les dades

          if (
            element.sourceLayer === "Unitats geològiques del quaternari" ||
            element.sourceLayer === "Unitats geològiques del basament"
          ) {
            //importem codi IDABS dels poligons

            let idabs_publ = element.properties.IDABS;
            let edat_publ = element.properties.EDAT;
            let epoca_publ = element.properties.EPOCA;
            let era_publ = element.properties.ERA;
            let periode_publ = element.properties.PERIODE;
            let edatMet_publ = element.properties.EDAT_MET;
            let met_publ = element.properties.MET;
            let obsEdat_publ = element.properties.OBS_EDAT;

            if (idabsArray.includes(idabs_publ)) {
            } else {
              idabsArray.push(idabs_publ);
            }
            if (edatArray.includes(edat_publ)) {
            } else {
              edatArray.push(edat_publ)
            }
            if (epocaArray.includes(epoca_publ)) {
            } else {
              epocaArray.push(epoca_publ)
            }
            if (eraArray.includes(era_publ)) {
            } else {
              eraArray.push(era_publ)
            }
            if (periodeArray.includes(periode_publ)) {
            } else {
              periodeArray.push(periode_publ)
            }
            if (edatMetArray.includes(edatMet_publ)) {
            } else {
              edatMetArray.push(edatMet_publ)
            }
            if (metArray.includes(met_publ)) {
            } else {
              metArray.push(met_publ)
            }
            if (obsEdatArray.includes(obsEdat_publ)) {
            } else {
              obsEdatArray.push(obsEdat_publ)
            }


          } else {
            idabsArray.push(null);
          }





          if (element.sourceLayer === "Talls Geològics") {
            //importem nom talls
            let talls_publ = element.properties.DESCRIPCIO;

            if (tallArray.includes(talls_publ)) {
            } else {
              tallArray.push(talls_publ);
              selectedTall = talls_publ;

              // getMyFile(talls_publ)
            }
          }
        }
      });

      // iniciem exportacio dades segons contingut al clic////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      if (elementsArray.length !== 0) {
        if (tallArray.length !== 0) {
          // console.log('tall', tallArray)
          var descarregaTall = `<a href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendesTalls/${tallArray}.zip" style="color: #1a4971">Descarrega el tall</a>`;
          var tall =
            `<button id="view-full" style="color: #1a4971">Veure el tall</button>` 

          text =
            text +
            tall +
            `<div>
                                                          <p style="color: #666">TALL: ${tallArray}</p>
                                                          
                                                                                                           
                                                          
                                                          </div>` +
                                                          descarregaTall;
        exportartext = text
        }
if (edatArray[0] === " "){
  if (metArray[0]===undefined || metArray[0]== " "){
                if (idabsArray[0] !== null && tallArray.length == 0 ) {
     
                          text =
                            text +
                            `<div>
                                                                          <p style="color: #666"><b>${episArray[0]}:</b> ${elementsArray[0]}</p>
                                                                          <p style="color: #666">Era: ${eraArray[0]}</p>
                                                                          <p style="color: #666">Període: ${periodeArray[0]}</p>
                                                                          <p style="color: #666">Època: ${epocaArray[0]}</p>
                                                                         
                                                                          <p style="color: #666">Full25m: ${idabsArray[0]}</p>
                                                                          </div>`;
                                                                          exportartext = [
                                                                            {'episArray': episArray[0]},
                                                                            {'elementsArray': elementsArray[0]},
                                                                            {'eraArray': eraArray[0]},
                                                                            {'periodeArray': periodeArray[0]},
                                                                            {'epocaArray': epocaArray[0]},
                                                                            {'idabsArray': idabsArray[0]}

                                                                          ]
                        }
          } else{
          
           
                if (idabsArray[0] !== null && tallArray.length == 0 ) {
                  //SI TE CODI IDABS (POLIGON)
              
                  text =
                    text +
                    `<div>
                                                                  <p style="color: #666"><b>${episArray[0]}:</b> ${elementsArray[0]}</p>
                                                                  <p style="color: #666">Era: ${eraArray[0]}</p>
                                                                  <p style="color: #666">Període: ${periodeArray[0]}</p>
                                                                  <p style="color: #666">Època: ${epocaArray[0]}</p>
                                                                  <p style="color: #666">Edat: ${edatArray[0]}</p>

                                                                  <p style="color: #666">Edat Met.: ${edatMetArray[0]}</p>
                                                                  <p style="color: #666">Metamorfisme: ${metArray[0]}</p>
                                                                  <p style="color: #666">Full25m: ${idabsArray[0]}</p>
                                                                  </div>`;
                                                                  exportartext = text
                }
          
          
          }


}else{
  if (metArray[0]===undefined || metArray[0]== " "){
                if (idabsArray[0] !== null && tallArray.length == 0 ) {
     
                          text =
                            text +
                            `<div>
                                                                          <p style="color: #666"><b>${episArray[0]}:</b> ${elementsArray[0]}</p>
                                                                          <p style="color: #666">Era: ${eraArray[0]}</p>
                                                                          <p style="color: #666">Període: ${periodeArray[0]}</p>
                                                                          <p style="color: #666">Època: ${epocaArray[0]}</p>
                                                                          <p style="color: #666">Edat: ${edatArray[0]}</p>
                                                                          <p style="color: #666">Full25m: ${idabsArray[0]}</p>
                                                                          </div>`;
                                                                          exportartext = text
                        }
          } else{
          
           
                if (idabsArray[0] !== null && tallArray.length == 0 ) {
                  //SI TE CODI IDABS (POLIGON)
              
                  text =
                    text +
                    `<div>
                                                                  <p style="color: #666"><b>${episArray[0]}:</b> ${elementsArray[0]}</p>
                                                                  <p style="color: #666">Era: ${eraArray[0]}</p>
                                                                  <p style="color: #666">Període: ${periodeArray[0]}</p>
                                                                  <p style="color: #666">Època: ${epocaArray[0]}</p>
                                                                  <p style="color: #666">Edat: ${edatArray[0]}</p>

                                                                  <p style="color: #666">Edat Met.: ${edatMetArray[0]}</p>
                                                                  <p style="color: #666">Metamorfisme: ${metArray[0]}</p>
                                                                  <p style="color: #666">Full25m: ${idabsArray[0]}</p>
                                                                  </div>`;
                                                                  exportartext = text
                }
          
          
          }


}
          // if (metArray[0]===undefined || metArray[0]== " "){
          //       if (idabsArray[0] !== null && tallArray.length == 0 ) {
     
          //                 text =
          //                   text +
          //                   `<div>
          //                                                                 <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
          //                                                                 <p style="color: #666">Era: ${eraArray[0]}</p>
          //                                                                 <p style="color: #666">Període: ${periodeArray[0]}</p>
          //                                                                 <p style="color: #666">Època: ${epocaArray[0]}</p>
          //                                                                 <p style="color: #666">Edat: ${edatArray[0]}</p>
          //                                                                 <p style="color: #666">IDABS: ${idabsArray[0]}</p>
          //                                                                 </div>`;
          //               }
          // } else{
          
           
          //       if (idabsArray[0] !== null && tallArray.length == 0 ) {
          //         //SI TE CODI IDABS (POLIGON)
              
          //         text =
          //           text +
          //           `<div>
          //                                                         <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
          //                                                         <p style="color: #666">Era: ${eraArray[0]}</p>
          //                                                         <p style="color: #666">Període: ${periodeArray[0]}</p>
          //                                                         <p style="color: #666">Època: ${epocaArray[0]}</p>
          //                                                         <p style="color: #666">Edat: ${edatArray[0]}</p>

          //                                                         <p style="color: #666">Edat Met.: ${edatMetArray[0]}</p>
          //                                                         <p style="color: #666">Metamorfisme: ${metArray[0]}</p>
          //                                                         <p style="color: #666">IDABS: ${idabsArray[0]}</p>
          //                                                         </div>`;
          //       }
          
          
          // }

       
        if (idabsArray[0] === null && tallArray.length == 0 ) {
          //SI NO TE CODI IDABS (LINE/SYMBOL)

          text =
            text +
            `<div>
                                                          <p style="color: #666"><b>${episArray[0]}:</b> ${elementsArray[0]}</p>
                                                          
                                                      
                                                          </div>`;
                                                          exportartext = text
        }
      
//  console.log('text', exportartext)   
  exportartextok = exportartext    
  exportarshow = true
  // console.log('textok', exportartextok)
        // popup.setHTML(icono).setLngLat(e.lngLat);

        document
          .getElementById("view-full")
          .addEventListener("click", changeTallState);
      }

    });
    // console.log('oooooooooooooooooooooooo')
   


  });
</script>

<style>
  .mapbox-popup {
    max-width: 400px;
    font: 12px/20px;
    font-family: "Times New Roman", Times, serif;
    border-radius: 10px !important;
    box-shadow: 0 5px 2px rgba(0, 0, 0, 0.1) !important;
    padding: 5px 8px 4px 8px !important;
    font-family: 'Fira Sans', sans-serif;
  }
  .mapboxgl-popup-content {
    position: relative;
    background: #fff;
    border-radius: 10px !important;
    box-shadow: 0 5px 2px rgba(0, 0, 0, 0.1) !important;
    padding: 5px 8px 4px 8px !important;
    pointer-events: auto;
    font-family: 'Fira Sans', sans-serif;
  }
  .iconoConsulta {
    position: absolute;
    margin-top: 132px;
    right: 17px;
  }
  .containerDiv {
    width: 80%;
  }
  .modal-overlay {
    z-index: 2000;
    font-size: 10px !important;
    /* overflow: auto;
display: flex;
 position: fixed;
    top: 35%;
    left: 30%;
    transform: translate(-23%,-23%); */
  }
  .modal-container {
    overflow: auto;
    display: block;
    position: fixed;
    top: 36%;
    left: 26%;
    bottom: 0;
    transform: translate(-23%, -23%);
    font-family: 'Fira Sans', sans-serif;
  }
  .textModal {
    font-size: small !important;
    font-family: 'Fira Sans', sans-serif;
  }
  .hola{
  
    background-color: #ffffff;
    position: absolute;
    top: 4.5em;
    right: 0%;
    width: 20em;
  }
</style>

{#if exportarshow}
<div class='hola'>
  
    <Icon style="    font-size: 28px; float: right;    color: black;    top: 0.23em;    position: relative;" class=" material-icons iconoConsulta" on:click={esborra}>close</Icon>

      <InfoBox {exportartextok}  />


</div>


{/if}
<!-- <div class="iconoConsulta">
  <IconButton class="" on:click={changeConsultaState}>
    {#if consulta_show}
    <Icon style="font-size: 38px;color: darkgreen;" class=" material-icons iconoConsulta">not_listed_location</Icon>
        {:else}
    <Icon style="font-size: 38px;color: black;" class=" material-icons iconoConsulta">not_listed_location</Icon>

    {/if}
  </IconButton >


</div> -->
{#if tall_show}
  <div class="containerDiv">
    <DrawerBottom selected={selectedTall} />
    <IconButton
      on:click={changeTallState}
      style="    position: absolute;
right:50%;
bottom: -14px;
z-index: 10;">
      <Icon
        style="        font-size: 30px;
color: white;
border-style: solid;
border-radius: 17px;
border-width: 1px;
background-color: black;"
        class=" material-icons  ">
        close
      </Icon>
    </IconButton>
  </div>
{/if}
