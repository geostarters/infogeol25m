<script>
  import { onMount, onDestroy } from "svelte";
  import { keyApp } from "../../config";
  import { getContext } from "svelte";
  import IconButton, { Icon } from "@smui/icon-button";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import { fade } from "svelte/transition";
  import DrawerBottom from "../../Panels/PanelTall/DrawerBottom.svelte";

  import mapbox from "mapbox-gl";
import { getDiffieHellman } from "crypto";
const changePaintProperty = getContext("changePaintProperty");
const changeColorProperty = getContext("changeColorProperty");
const changeInitialColorProperty = getContext("changeInitialColorProperty");
const overLayers = getContext("overLayers");
const { getMap } = getContext(keyApp);
const map = getMap();
//let consulta_show = false;

var tall_show = false
var selectedTall = []
var highliItem =[]

function overlay_click(e) {
    if ("close" in e.target.dataset) show = false;
  }


function changeTallState () {

    tall_show = !tall_show
    changeInitialColorProperty(highliItem[0])
console.log('holaaaaaaaaaa que haces')
 
}
  
function removeLastItem (item){
console.log('lastitem', item)
}

  
onMount(async() => {


     console.log('abans', highliItem)
map.on("click", function(e) {


      var bbox = [
        [e.point.x - 0.8, e.point.y - 0.8],
        [e.point.x + 0.8, e.point.y + 0.8]
      ];
      
     var features = map.queryRenderedFeatures(bbox);
    console.log('info', features)



      let text = '<h3 style="color: #1a4971">Descripció:</h3>';

      var elementsArray = [];
      var episArray = [];
      var idabsArray = [];
      var tallArray = [];
     var highlightedItems = [];
 
    //console.log('tallarray', tallArray)

    highlightedItems.push(features)

//console.log('high', highlightedItems)

// console.log('quehihaabans', highliItem[0])
if (highliItem[0] !== undefined){
  changeInitialColorProperty(highliItem[0])
}

highlightedItems.forEach(highItem => {


  if (highItem[0].source === "infogeo"){
      highliItem = []
     
  

      changeColorProperty(highItem[0])
      highliItem.push(highItem[0]) 
      //console.log('olololo1', highliItem[0])
    //  console.log('olololo2', highliItem[0]._vectorTileFeature._geometry) // poligon individual
     // console.log('despres', highliItem)


  }
})

      features.forEach(element => {

        if (
          element.source === "infogeo" &&
          (element.properties.DESCRIPCIO || element.properties.DESCRIPCIO)
        ) {
          let desc =
            element.properties.DESCRIPCIO || element.properties.DESCRIPCIO;
          //  console.log('DESC', desc)
          //desc = desc.replace("�rea", "Àrea").replace("geomorfol�gic", "geomorfològic").replace("d�esllavissades","d'esllavissades");

          if (elementsArray.includes(desc)){
                  
                 }else{
                 
                   elementsArray.push(desc)
            
                 }


          

             if (element.properties.CODI_CAS != undefined){
               let epigraf_publ = 
                 element.properties.CODI_CAS || element.properties.CODI_CAS;
            
                 if (episArray.includes(epigraf_publ)){
                
                 }else{
               
                        episArray.push(epigraf_publ)
         
                 }
           
                }

                if (element.sourceLayer === "gt1v20sh0qp1r010" || element.sourceLayer === "gt1v20sh0bp1r010"){
                   
                        
                                 let idabs_publ = 
                                        element.properties.IDABS;
                                
                                        if (idabsArray.includes(idabs_publ)){
                                        
                                        }else{
                                      
                                                idabsArray.push(idabs_publ)
                                
                                        }
                  
                      
              }else{
                idabsArray.push(null)
              }

                if (element.sourceLayer === "TRACES_TALLS"){
               let talls_publ = 
                 element.properties.NOM_TALL;
            
                 if (tallArray.includes(talls_publ)){
                
                 }else{
               
                        tallArray.push(talls_publ)
                      selectedTall=talls_publ
                        
                        // getMyFile(talls_publ)
                        
                        
                 }
           
                }




        }
      });
   


         if (elementsArray.length !== 0 && tallArray.length !== 0 ){
               ;
              //  console.log('tall', tallArray)   
               var descarregaTall = `<a href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendesTalls/${tallArray}.zip" style="color: #1a4971">Descarrega el tall</a>`
                var tall = `<button id="view-full" style="color: #1a4971">Veure el tall</button>` + descarregaTall            


                // text =
                //                             text + tall+
                //                                         `<div>
                //                                           <p style="color: #666">TALL: ${tallArray}</p>
                                                          
                                                                                                           
                                                          
                //                                           </div>`;


                  if (elementsArray.length == 1){
                    text =
                                            text + tall+
                                                        `<div>
                                                          <p style="color: #666">TALL: ${tallArray}</p>
                                                          
                                                                                                           
                                                          
                                                          </div>`;
                                                  
                  }
                  if (elementsArray.length == 2){
                    text =
                                            text +  tall+
                                                        `<div>
                                                          <p style="color: #666">TALL: ${tallArray}</p>
                                                         
                                              
                                                          </div>`;
                                                        
                  }
                  if (elementsArray.length == 3){
                    text =
                                            text +  tall+
                                                        `<div>
                                                          <p style="color: #666">TALL: ${tallArray}</p>
                                                          
                                                 
                                                          </div>`;
                                                          
                  }
                  if (elementsArray.length == 4){
                    text =
                                            text + tall+
                                                        `<div>
                                                          <p style="color: #666">TALL: ${tallArray}</p>
                                                         
                                                  
                                                          </div>`;
                                                          
                  }
                  if (elementsArray.length == 5){
                    text =
                                            text + tall+
                                                        `<div>
                                                          <p style="color: #666">TALL: ${tallArray}</p>
                                                          
                                                      
                                                          </div>`;
                                                          
                  }
                  var popup = new mapbox.Popup({ offset: [0, -15], closeOnClick: true })
                            .setHTML(text)
                            .setLngLat(e.lngLat)
                            .addTo(map);  
                            
                  document.getElementById('view-full').addEventListener('click', changeTallState)
      
            } 

            if (elementsArray.length !== 0  && tallArray.length == 0){
                if (idabsArray.length !== null){
                  if (elementsArray.length == 1){
                    text =
                                            text + 
                                                        `<div>
                                                          <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
                                                          
                                                         
                                                          <p style="color: #666">IDABS: ${idabsArray[0]}</p>
                                                          </div>`;
                                                          
                  }
                  if (elementsArray.length == 2){
                    text =
                                            text+ 
                                                        `<div>
                                                          <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
                                                        
                                                          <p style="color: #666">IDABS: ${idabsArray[0]}</p>
                                                          </div>`;
                                                          
                  }
                  if (elementsArray.length == 3){
                    text =
                                            text + 
                                                        `<div>
                                                          <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
                                                       
                                                          <p style="color: #666">IDABS: ${idabsArray[0]}</p>
                                                          </div>`;
                                                          
                  }
                  if (elementsArray.length == 4){
                    text =
                                            text + 
                                                        `<div>
                                                          <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
                                                          <p style="color: #666">IDABS: ${idabsArray[0]}</p>
                                                          </div>`;
                                                          
                  }
                  if (elementsArray.length == 5){
                    text =
                                            text + 
                                                        `<div>
                                                          <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
                                                        
                                                          <p style="color: #666">IDABS: ${idabsArray[0]}</p>
                                                          </div>`;
                                                          
                  }

                                         
                                                            
                    
        
                } else {
              
              // text =
              //                               text + 
              //                                           `<div>
              //                                             <p style="color: #666">${episArray}, ${idabsArray}: ${elementsArray[0]}</p>
                                                          
                                                         
                                                        
              //                                             </div>`;
      // console.log('euqnekhuh000000')

               if (elementsArray.length == 1){
                    text =
                                            text + 
                                                        `<div>
                                                          <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
                                                          
                                                      
                                                          </div>`;
                                                          
                  }
                  if (elementsArray.length == 2){
                    text =
                                            text+ 
                                                        `<div>
                                                          <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
                                                
                                                          </div>`;
                                                          
                  }
                  if (elementsArray.length == 3){
                    text =
                                            text + 
                                                        `<div>
                                                          <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
                                                       
                                                   
                                                          </div>`;
                                                          
                  }
                  if (elementsArray.length == 4){
                    text =
                                            text + 
                                                        `<div>
                                                          <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
                                                 
                                                          </div>`;
                                                          
                  }
                  if (elementsArray.length == 5){
                    text =
                                            text + 
                                                        `<div>
                                                          <p style="color: #666">${episArray[0]}: ${elementsArray[0]}</p>
                                                        
                                                
                                                          </div>`;
                                                          
                  }



                }


                  
                  var popup = new mapbox.Popup({ offset: [0, -15], closeOnClick: true, autoClose: true  })
                            .setHTML(text)
                            .setLngLat(e.lngLat)
                            .addTo(map)
                            .on('close',function(e) {
                              changeInitialColorProperty(highliItem[0])
                            });
                            //document.getElementById('view-full')
                            document.getElementById('view-full').addEventListener('click', changeTallState)
                            
// popup.on('close', function(e) {
//     alert()
// })
            }
            //consulta_show=true
 ////////////////////////////////////////////////////////////////////////


//  if (elementsArray) {
  
//   //popup.remove();
//             var popup = new mapbox.Popup({ offset: [0, -15], closeOnClick: true, closeOnMove: true  })
//                             .setHTML(text)
//                             .setLngLat(e.lngLat)
//                             .addTo(map)
//                             .on('close',function(e) {
//                               changeInitialColorProperty(highliItem[0])
//                             });  
//               //popup.remove()
//               //console.log('eeeeeeeeeeeeee', popup)              
//             document.getElementById('view-full').addEventListener('click', changeTallState)
           
                
//  }    
 
 
 
 
 
 
 
/////////////////////////////////////////////////////////////////
 // var popup = new mapbox.Popup({ offset: [0, -15] })
        //   .setHTML(text)
        //   .setLngLat(e.lngLat)
        //   .addTo(map);

        overLayers.layers.forEach(element => {
          map.on("mouseenter", element.id, function() {
            map.getCanvas().style.cursor = "pointer";
          });

          map.on("mouseleave", element.id, function() {
            map.getCanvas().style.cursor = "";
          });
        });
      





    });

 

    // consulta_show = !consulta_show;
    // if (!consulta_show){
    //   changeInitialColorProperty(highliItem[0])
    // }
  })

</script>

<style>
  .mapbox-popup {
    max-width: 400px;
    font: 12px/20px;
    font-family: "Times New Roman", Times, serif;
    border-radius: 10px !important;
    box-shadow: 0 5px 2px rgba(0, 0, 0, 0.1) !important;
    padding: 5px 8px 4px 8px !important;
  }
  .mapboxgl-popup-content {
    position: relative;
    background: #fff;
    border-radius: 10px !important;
    box-shadow: 0 5px 2px rgba(0, 0, 0, 0.1) !important;
    padding: 5px 8px 4px 8px !important;
    pointer-events: auto;
  }
  .iconoConsulta {
    position: absolute;
    margin-top: 132px;
    right: 17px;
  }
  .containerDiv{
    width:80%,
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
  }
  .textModal{
    font-size: small !important;
  }
</style>
 
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
<IconButton  on:click={changeTallState} style="    position: absolute;
right:50%;
bottom: -14px;
z-index: 10;">
   
<Icon  style="        font-size: 30px;
color: white;
border-style: solid;
border-radius: 17px;
border-width: 1px;
background-color: black;" class=" material-icons  ">close</Icon>  
       
  
</IconButton >
</div>
{/if}
