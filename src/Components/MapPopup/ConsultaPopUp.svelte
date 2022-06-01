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
  var tallbutton = false
  var colbutton = false
  var talltoshow = []
  var coltoshow = []
  var linkjpg = '';
  var linkzip = '';
  var tall_show = false;

  var selectedTall = [];
  var selectedCol = [];
  var selectedTallnom = [];
  var highliItem = [];
  var typedata = '';
  let exportarshow = false
function esborra () {
// console.log('es aquiwww??')
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
          // console.log("estic entrant??", highliItem[0]);
          // console.log('es aqui??')
          // changeInitialColorProperty(highliItem[0]);    ///he borrador esto
        }
        // "click", changeTallState
      );

      var bbox = [
        [e.point.x - 6.0, e.point.y - 6.0],
        [e.point.x + 6.0, e.point.y + 6.0],
      ];

      var features = map.queryRenderedFeatures(bbox);
      // console.log("info", features[0]);

// console.log("info", features);

if (features[0].layer.id.includes('Basament') || features[0].layer.id.includes('quaternaris')){
  features.forEach((capa) => {
    // console.log('kpa', capa)
    if (features[0].layer.id.includes('PATT')){

       if (capa.sourceLayer.includes('FILL')) {
          // console.log('kpafill', capa)
             features = [capa]
            //  console.log('capa', capa.layer.id)
          }
    }
       
       
    })

  
}
// if (features[0].layer.id.includes('quaternaris')){
//   features.forEach((capa) => {
//         if (capa.sourceLayer === 'FILLq') {
//           console.log('kpafillq', capa)
//              features = capa
//           }
       
//     })

  
// }
else{
  features=[features[0]]  
}
                 //nomès pasa el de més amunt. 
// console.log("info2", features);
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
      var colArray = [];
      var inclinArray = [];
      var dirArray = [];
      var relArray = [];
      var antroArray = [];
      var estructArray = [];
      var tallnomArray = [];
      var tipusArray = [];

      highlightedItems.push(features);

      if (highliItem[0] !== undefined) {
        // console.log('hello', highliItem[0])
        changeInitialColorProperty(highliItem[0]);
      }

      highlightedItems.forEach((highItem) => {
      
        if (highItem.source === "infogeo" || highItem[0].source === "infogeo") {
          highliItem = [];
        
if (highItem[0].layer.id.includes('FILL')){  //BS/QT


      changeColorProperty(highItem[0]);
      highliItem.push(highItem[0]);

}
else{
          changeColorProperty(highItem[0]);
          highliItem.push(highItem[0]);
        }}
      });

      // ELEMENTS A MOSTRAR AL POPUP //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      features.forEach((element) => {
        // console.log('elem', element)
    
        if (
          element.source === "infogeo" &&
          element.properties.DESCRIPCIO //importem descripcio
        ) {
          let desc = element.properties.DESCRIPCIO;
          // console.log('oooooooo', element)
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
          if (element.properties.CODI_CAS == undefined && element.properties.ID_MAPA != undefined) {
            let epigraf_publ = element.properties.ID_MAPA;

            if (episArray.includes(epigraf_publ)) {
            } else {
              episArray.push(epigraf_publ);
            }
          }
          if (element.properties.CODI_CAS == undefined && element.properties.EPIGRAF != undefined) {
            let epigraf_publ = element.properties.EPIGRAF;

            if (episArray.includes(epigraf_publ)) {
            } else {
              episArray.push(epigraf_publ);
            }
          }

    

          if (
            element.sourceLayer === "FILLq" ||
            element.sourceLayer === "FILL" 
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





          if (element.sourceLayer === "Traces de talls geològics") {
            //importem nom talls
            // console.log('tallarryay',)
            let talls_publ = element.properties.DESCRIPCIO;
            let talls_nom = element.properties.ID_MAPA;

            if (tallArray.includes(talls_publ)) {
              // console.log('tallarrassy')
            } else {
              tallArray.push(talls_publ);
              tallnomArray.push(talls_nom)
              
              // console.log('tallarray', element)
              selectedTall = element.properties.NOM_TALL;
              talltoshow = element.properties.ID_MAPA
              linkzip = element.properties.LINK_ZIP
              tallbutton=true
              colbutton=false
              typedata='talls'
              // getMyFile(talls_publ)
            }
            // if (tallnomArray.includes(talls_nom)) {
            // } else {
            //   tallnomArray.push(talls_nom);
            //   selectedTallnom = talls_nom;

            //   // getMyFile(talls_publ)
            // }
          }

         
        if (element.sourceLayer === "Paleozoic NO LINK"  ||
            element.sourceLayer === "Paleozoic LINK"  ||
            element.sourceLayer === "Mesozoic NO LINK"  ||
            element.sourceLayer === "Mesozoic LINK"  ||
            element.sourceLayer === "Paleogen LINK"  ||
            element.sourceLayer === "Paleogen NO LINK"  ||
            element.sourceLayer === "Neogen LINK"  ||
            element.sourceLayer === "Neogen NO LINK") {
          //  console.log('consulta columnes ', colArray)
            let cols_publ = element.properties.DESCRIPCIO;
              let idabs_publ = element.properties.ID_MAPA;
            let cols_jpg = element.properties.LINK_COL;
            let cols_zip = element.properties.LINK_ZIP;
            if (colArray.includes(cols_publ)) {
            } else {
              colArray.push(cols_publ);
              idabsArray.push(idabs_publ)
              selectedTall = element.properties.NOM_COL;
              // coltoshow = element.properties.NOM_COL
              linkjpg = element.properties.LINK_COL
              linkzip = element.properties.LINK_ZIP
              colbutton=true
              tallbutton=false
              typedata='cols'
              // getMyFile(talls_publ)
            }
            // if (tallnomArray.includes(talls_nom)) {
            // } else {
            //   tallnomArray.push(talls_nom);
            //   selectedTallnom = talls_nom;

            //   // getMyFile(talls_publ)
            // }
          }

          if (element.sourceLayer === "Esquemes de relacions estratigràfiques") {
          //  console.log('consulta relacions ')
            let cols_publ = element.properties.DESCRIPCIO;
            let idabs_publ = element.properties.ID_MAPA;
            if (relArray.includes(cols_publ)) {
            } else {
              relArray.push(cols_publ);
              idabsArray.push(idabs_publ)
              selectedTall = element.properties.IDABS;
           
              linkjpg = element.properties.LINK_REL
              linkzip = element.properties.LINK_ZIP
              colbutton=true
              tallbutton=false
              typedata='relacions'
         
                 }
          }

          if (element.layer.id.includes('Terrenys antropitzats')) {
          //  console.log('consulta ANTROPICS ')
            let cols_publ = element.properties.DESCRIPCIO;
            let idabs_publ = element.properties.CODI_CAS;
            let tipus = element.properties.TIPUS;
            let edat = element.properties.EDAT;


            if (antroArray.includes(cols_publ)) {
            } else {
              antroArray.push(cols_publ);
              idabsArray.push(idabs_publ);
              tipusArray.push(tipus);
              edatArray.push(edat);
              selectedTall = element.properties.EPIGRAF;
           
              colbutton=false
              tallbutton=false
              typedata='antropics'
              // console.log('consulta ANTROPICS ', colbutton, tallbutton)
                 }
          }
          if (element.layer.id.includes(`Mesures d'estructures`)) {
          //  console.log('consulta estructures ')
            let cols_publ = element.properties.DESCRIPCIO;
            let cols_incl = element.properties.INCLIN;
            let cols_dir = element.properties.DIR;
            if (estructArray.includes(cols_publ)) {
            } else {
              estructArray.push(cols_publ);
              inclinArray.push(cols_incl);
              dirArray.push(cols_dir);
              selectedTall = element.properties.EPIGRAF;
           
              colbutton=false
              tallbutton=false
              typedata='estructures'
              // console.log('consulta estructuress ', colbutton, tallbutton)
                 }
          }

        }
      });

      // iniciem exportacio dades segons contingut al clic////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      if (elementsArray.length !== 0) {
        // console.log('talld', elementsArray)
        if (tallArray.length !== 0) {
          //  console.log('tall', tallArray)
          var descarregaTall = `<a href="${linkzip}" style="color: #1a4971">Descarrega el tall</a>`;
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
         
        let ep =  tallnomArray[0]+` :  `+ tallArray[0];
                                                                       
                                                                          exportartext = [
                                                                            {'ep': ep}, 
                                                                          ]
        }
if (edatArray[0] === " "){
  if (epocaArray[0]===undefined || epocaArray[0]== " "){
                if (idabsArray[0] !== null && epocaArray.length == 0 ) {
                  // console.log('entro axxxxxddddddddddddddquia', idabsArray)
                  tallbutton = false
                  colbutton = false
                          text =
                            text +
                            `<div>
                                                                          <p style="color: #666"><b>${episArray[0]}:</b> ${elementsArray[0]}</p>
                                                                          <p style="color: #666">Era: ${eraArray[0]}</p>
                                                                          <p style="color: #666">Període: ${periodeArray[0]}</p>
                                                                          <p style="color: #666">Època: ${epocaArray[0]}</p>
                                                                         
                                                                          <p style="color: #666">Full25m: ${idabsArray[0]}</p>
                                                                          </div>`;
                                                                          
                                                                          let ep =  episArray[0]+` :  `+ elementsArray[0];
                                                                          // console.log('ep', ep)
                                                                          exportartext = [
                                                                            {'ep':ep},
                                                                            {'Era': eraArray[0]},
                                                                            {'Període': periodeArray[0]},
                                                                            {'Època': epocaArray[0]},
                                                                            {'Full MGC25m-GTI': idabsArray[0]}

                                                                          ]
                        }
          }
  if (metArray[0]===undefined || metArray[0]== " "){
    if (idabsArray[0] !== null && tallArray.length == 0 && epocaArray[0] === " ") {
                  // console.log('entro axxxxxquia', epocaArray[0]) //aqui entra si nomes epoca es ''
                  tallbutton = false
                  colbutton = false
                          text =
                            text +
                            `<div>
                                                                          <p style="color: #666"><b>${episArray[0]}:</b> ${elementsArray[0]}</p>
                                                                          <p style="color: #666">Era: ${eraArray[0]}</p>
                                                                          <p style="color: #666">Període: ${periodeArray[0]}</p>
                                                                       
                                                                         
                                                                          <p style="color: #666">Full25m: ${idabsArray[0]}</p>
                                                                          </div>`;
                                                                          
                                                                          let ep =  episArray[0]+` :  `+ elementsArray[0];
                                                                          // console.log('ep', ep)
                                                                          exportartext = [
                                                                            {'ep':ep},
                                                                            {'Era': eraArray[0]},
                                                                            {'Període': periodeArray[0]},
                                                                          
                                                                            {'Full MGC25m-GTI': idabsArray[0]}

                                                                          ]
                        }
                if (idabsArray[0] !== null && tallArray.length == 0 && epocaArray[0].length > 1) {
                  // console.log('entro axxxxddxquia', epocaArray[0]) //aqui entra si nomes epoca es ''
                  tallbutton = false
                  colbutton = false
                          text =
                            text +
                            `<div>
                                                                          <p style="color: #666"><b>${episArray[0]}:</b> ${elementsArray[0]}</p>
                                                                          <p style="color: #666">Era: ${eraArray[0]}</p>
                                                                          <p style="color: #666">Període: ${periodeArray[0]}</p>
                                                                          <p style="color: #666">Època: ${epocaArray[0]}</p>
                                                                         
                                                                          <p style="color: #666">Full25m: ${idabsArray[0]}</p>
                                                                          </div>`;
                                                                          
                                                                          let ep =  episArray[0]+` :  `+ elementsArray[0];
                                                                          // console.log('ep', ep)
                                                                          exportartext = [
                                                                            {'ep':ep},
                                                                            {'Era': eraArray[0]},
                                                                            {'Període': periodeArray[0]},
                                                                            {'Època': epocaArray[0]},
                                                                            {'Full MGC25m-GTI': idabsArray[0]}

                                                                          ]
                        }
          } else{
          
           
                if (idabsArray[0] !== null && tallArray.length == 0 ) {
                  //SI TE CODI IDABS (POLIGON)
                  // console.log('entro aaaaaquia', epocaArray, edatArray) // aqui entra si epoc i edat es ''
                  tallbutton = false
                  colbutton = false
                  
                  if (epocaArray[0]=== " " && edatArray[0]=== " "){
// epoca i edat no declarada


text =
                    text +
                    `<div>
                                                                  <p style="color: #666"><b>${episArray[0]}:</b> ${elementsArray[0]}</p>
                                                                  <p style="color: #666">Era: ${eraArray[0]}</p>
                                                                  <p style="color: #666">Període: ${periodeArray[0]}</p>
                                                                  <p style="color: #666">Edat del metamorfisme.: ${edatMetArray[0]}</p>
                                                                  <p style="color: #666">Metamorfisme: ${metArray[0]}</p>
                                                                  <p style="color: #666">Full25m: ${idabsArray[0]}</p>
                                                                  </div>`;
                                                                  
                                                                  let ep =  episArray[0]+` :  `+ elementsArray[0];
                                                                          exportartext = [
                                                                            {'ep':ep},
                                                                            {'Era': eraArray[0]},
                                                                            {'Període': periodeArray[0]},
                                                                            {'Edat del metamorfisme.': edatMetArray[0]},
                                                                            {'Metamorfisme': metArray[0]},
                                                                            {'Full MGC25m-GTI': idabsArray[0]}

                                                                          ]





                  } else{
                  // si epoca i edat
                  
                  text =
                    text +
                    `<div>
                                                                  <p style="color: #666"><b>${episArray[0]}:</b> ${elementsArray[0]}</p>
                                                                  <p style="color: #666">Era: ${eraArray[0]}</p>
                                                                  <p style="color: #666">Període: ${periodeArray[0]}</p>
                                                                  <p style="color: #666">Època: ${epocaArray[0]}</p>
                                                                  <p style="color: #666">Edat: ${edatArray[0]}</p>

                                                                  <p style="color: #666">Edat del metamorfisme.: ${edatMetArray[0]}</p>
                                                                  <p style="color: #666">Metamorfisme: ${metArray[0]}</p>
                                                                  <p style="color: #666">Full25m: ${idabsArray[0]}</p>
                                                                  </div>`;
                                                                  
                                                                  let ep =  episArray[0]+` :  `+ elementsArray[0];
                                                                          exportartext = [
                                                                            {'ep':ep},
                                                                            {'Era': eraArray[0]},
                                                                            {'Període': periodeArray[0]},
                                                                            {'Època': epocaArray[0]},
                                                                            {'Edat': edatArray[0]},
                                                                            {'Edat del metamorfisme.': edatMetArray[0]},
                                                                            {'Metamorfisme': metArray[0]},
                                                                            {'Full MGC25m-GTI': idabsArray[0]}

                                                                          ]
                }
              }
          
          
          }


}else{
  if (metArray[0]===undefined || metArray[0]== " "){
                if (idabsArray[0] !== null && tallArray.length == 0 ) {
                  // console.log('entro aqssuia', idabsArray)
                  tallbutton = false
                  colbutton = false
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
                                                                          let ep =  episArray[0]+` :  `+ elementsArray[0];
                                                                          exportartext = [
                                                                            {'ep':ep},
                                                                            {'Era': eraArray[0]},
                                                                            {'Període': periodeArray[0]},
                                                                            {'Època': epocaArray[0]},
                                                                            {'Edat': edatArray[0]},
                                                                            {'Full MGC25m-GTI': idabsArray[0]}

                                                                          ]
                        }
          } else{
          
           
                if (idabsArray[0] !== null && tallArray.length == 0 ) {
                  //SI TE CODI IDABS (POLIGON)
                  // console.log('entro aquia', idabsArray)
                  tallbutton = false
                  colbutton = false
                  text =
                    text +
                    `<div>
                                                                  <p style="color: #666"><b>${episArray[0]}:</b> ${elementsArray[0]}</p>
                                                                  <p style="color: #666">Era: ${eraArray[0]}</p>
                                                                  <p style="color: #666">Període: ${periodeArray[0]}</p>
                                                                  <p style="color: #666">Època: ${epocaArray[0]}</p>
                                                                  <p style="color: #666">Edat: ${edatArray[0]}</p>

                                                                  <p style="color: #666">Edat del metamorfisme.: ${edatMetArray[0]}</p>
                                                                  <p style="color: #666">Metamorfisme: ${metArray[0]}</p>
                                                                  <p style="color: #666">Full25m: ${idabsArray[0]}</p>
                                                                  </div>`;
                                                                  let ep =  episArray[0]+` :  `+ elementsArray[0];
                                                                          exportartext = [
                                                                            {'ep':ep},
                                                                            {'Era': eraArray[0]},
                                                                            {'Període': periodeArray[0]},
                                                                            {'Època': epocaArray[0]},
                                                                            {'Edat': edatArray[0]},
                                                                            {'Edat del metamorfisme.': edatMetArray[0]},
                                                                            {'Metamorfisme': metArray[0]},
                                                                            {'Full MGC25m-GTI': idabsArray[0]}

                                                                          ]
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

          //                                                         <p style="color: #666">Edat del metamorfisme.: ${edatMetArray[0]}</p>
          //                                                         <p style="color: #666">Metamorfisme: ${metArray[0]}</p>
          //                                                         <p style="color: #666">IDABS: ${idabsArray[0]}</p>
          //                                                         </div>`;
          //       }
          
          
          // }

       
        if (idabsArray[0] === null && tallArray.length == 0 && inclinArray.length == 0 ) {
          
          //SI NO TE CODI IDABS (LINE/SYMBOL)
          if (colArray[0] !== null && inclinArray.length == 0 && idabsArray[0] !== null) {    // columnes estrati
          // console.log('entro col estraEEEEti', colArray, idabsArray)
          //SI NO TE CODI IDABS (LINE/SYMBOL)

          text =
            idabsArray[1] +elementsArray[0]
                                                          
                                               
                                                          
            let ep =  idabsArray[1]+` :  `+ elementsArray[0];
                                                                          exportartext = [
                                                                            {'ep':ep},]
        }

        if (colArray[0] !== null && inclinArray.length == 0 &&  tipusArray[0] !== null) {    // contactes i antropic
          // console.log('entro antropic',idabsArray, colArray[0],edatArray[0] )
          //SI NO TE CODI IDABS (LINE/SYMBOL)

          text =
            idabsArray[1] +elementsArray[0]
            let ep
                                                if (idabsArray[1] !== undefined && colArray[0] !== undefined ){ //antropic
                                                  // console.log('antropiiiiiii')
                                                   ep =   idabsArray[1]+` :  `+ elementsArray[0];   

                                                }     else{  //contactes fallles
                                                  // console.log('antropffffffiiiiiii')
                                                  if (edatArray[0] !== undefined && edatArray[0].length !== 1 && elementsArray[0].includes('Contacte')){
                                                        // console.log('contacte', edatArray[0].length)
                                                        ep =  elementsArray[0]; 
                                                      }
                                                      if (edatArray[0] !== undefined && edatArray[0].length !== 1 && !elementsArray[0].includes('Contacte')){
                                                        // console.log('edat', edatArray[0].length)
                                                        ep =   elementsArray[0]; 
                                                      }else{
                                                        // console.log('jjj')
                                                       
                                                        if (elementsArray[0].includes('Esquema')){
                                                          ep =   idabsArray[1]+` :  `+ elementsArray[0]; 
                                                        }else{
                                                           ep =    elementsArray[0];
                                                        }
                                                      }
                                                   
                                                }     
                                                
                                               
            // let ep =   idabsArray[1]+` :  `+ elementsArray[0];                                            
            // let ep =    elementsArray[0];
                                                                          exportartext = [
                                                                            {'ep':ep},
                                                                            {'Tipus': tipusArray[0]},
                                                                            // {'Edat': edatArray[0]},
                                                                          ]
        }
        if (colArray[0] !== null && inclinArray.length == 0 && tipusArray[0]=== null && idabsArray[1] === null && idabsArray[1] === undefined) {    // contactes
          // console.log('entro cONTACTES', colArray,idabsArray, elementsArray )
          //SI NO TE CODI IDABS (LINE/SYMBOL)

          text =
            idabsArray[1] +elementsArray[0]
                                                          
                                               
                                                          
            let ep =   elementsArray[0];
                                                                          exportartext = [
                                                                            {'ep':ep},
                                                                          ]
        }

        if (colArray[0] !== null && inclinArray.length == 0 && idabsArray[0] === null && idabsArray[1] !== undefined &&  tipusArray[0] === null ) {    // ESQUEMES RELACIONS
          // console.log('entro col estrati', tipusArray,edatArray,idabsArray, elementsArray )
          //SI NO TE CODI IDABS (LINE/SYMBOL)

          text =
            idabsArray[1] +elementsArray[0]
                                                          
                                               
                                                          
            let ep =   idabsArray[1]+` :  `+ elementsArray[0];
                                                                          exportartext = [
                                                                            {'ep':ep},]
        }


      }



        if (idabsArray[0] !== null && tallArray.length !== 0 && inclinArray.length == 0){
          // console.log('entro aquia', idabsArray)
          text =
            episArray[0] +elementsArray[0]
                                                          
                                               
                                                          
            let ep =  episArray[0]+` :  `+ elementsArray[0];
                                                                          exportartext = [
                                                                            {'ep':ep},]







                                                                            
        }
      
        if (colArray.length== 0 && inclinArray.length !== 0) {    // mesures
          // console.log('entro mesures', colArray,inclinArray, dirArray,elementsArray)
          //SI NO TE CODI IDABS (LINE/SYMBOL)


          text =
                            text +
                            `<div>
                                                                          
                                                                          <p style="color: #666">${elementsArray[0]}</p>
                                                                          <p style="color: #666">Inclinació: ${inclinArray[0]}</p>
                                                                          <p style="color: #666">Direcció: ${dirArray[0]}</p>
                                                                         
                                                                          
                                                                          </div>`;
                                                                          
                                                                          let ep =  episArray[0]+` :  `+ elementsArray[0];
                                                                          // console.log('ep', ep)
                                                                          exportartext = [
                                                                            {'':elementsArray[0]},
                                                                            {'Inclinació': inclinArray[0]},
                                                                            {'Direcció': dirArray[0]},
                                                                        
                                                                          ]





                                                                        


////
          // text =
          //   idabsArray[1] +elementsArray[0]
                                                          
                                               
                                                          
          //   let ep =  idabsArray[1]+` :  `+ elementsArray[0];
          //                                                                 exportartext = [
          //                                                                   {'ep':ep},]
        }
      
      

        
      
//  console.log('text', exportartext)   
 let showthatText = [];
    exportartext.forEach(element => {
      let str = JSON.stringify(element)
      // console.log('e', str)
      str = str.replace('"":', '').replace('"',' ').replace('{','').replace('}','').replace('":"',': ').replace('"', '').replace('ep:', '')
      showthatText.push(str)
      // console.log(showthatText)
    });
  exportartextok = showthatText    
  exportarshow = true
  // console.log('textok', exportartextok)
        // popup.setHTML(icono).setLngLat(e.lngLat);

        // document
        //   .getElementById("view-full")
        //   .addEventListener("click", changeTallState);
      }

    });
    // console.log('oooooooooooooooooooooooo')
   


  });
</script>

<style>
  .mapbox-popup {
    max-width: 400px;
    font: 12px/20px;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 10px !important;
    box-shadow: 0 5px 2px rgba(0, 0, 0, 0.1) !important;
    padding: 5px 8px 4px 8px !important;
    font-family: Arial, Helvetica, sans-serif;
  }
  .mapboxgl-popup-content {
    position: relative;
    background: #fff;
    border-radius: 10px !important;
    box-shadow: 0 5px 2px rgba(0, 0, 0, 0.1) !important;
    padding: 5px 8px 4px 8px !important;
    pointer-events: auto;
    font-family: Arial, Helvetica, sans-serif;
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
    font-family: Arial, Helvetica, sans-serif;
  }
  .textModal {
    font-size: small !important;
    font-family: Arial, Helvetica, sans-serif;
  }
  .hola{
  
    background-color: #fff;
    position: absolute;
    top: 4.5em;
    right: 0.51em;
    width: 17em;
    border-radius: 19px;
    border-color: black;
    border-style: solid;
    border-width: 1px;
    box-shadow: black;
    padding-left: 15px;
    padding-right: 10px;
    padding-top: 5px;
    
  }
</style>

{#if exportarshow}
<div class='hola'>
  
    <Icon style="        cursor: pointer;font-size: 28px; float: right;    color: black;    top: 0.23em;    position: relative;" class=" material-icons iconoConsulta" on:click={esborra}>close</Icon>

<InfoBox {exportartextok}  />
      {#if tallbutton}
      <button id="view-full" style="color: #1a4971" on:click={changeTallState}>Visualitza</button>
      <a href={linkzip} style="color: #1a4971">Descarrega</a>
      

      {/if}
      {#if colbutton}
      <button id="view-full" style="color: #1a4971" on:click={changeTallState}>Visualitza</button>
      <a href={linkzip} style="color: #1a4971">Descarrega</a>
     
      {/if}


</div>


{/if}

{#if tall_show}
  <div class="containerDiv">
  <DrawerBottom selected={selectedTall} {linkjpg} {linkzip} typedata={typedata}/>
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
