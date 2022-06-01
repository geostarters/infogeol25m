<script>
  import { onMount, onDestroy } from "svelte";
  import { keyApp } from "../../config";
  import { getContext } from "svelte";
  import IconButton, { Icon } from "@smui/icon-button";

  import mapbox from "mapbox-gl";

  const overLayers = getContext("overLayers");
  const { getMap } = getContext(keyApp);
  const map = getMap();
  let consulta_show = false;

  function changeConsultaState() {

    map.on("click", function(e) {
      var bbox = [
        [e.point.x - 0.5, e.point.y - 0.5],
        [e.point.x + 0.5, e.point.y + 0.5]
      ];


      var features = map.queryRenderedFeatures(bbox);

      let text = '<h3 style="color: #1a4971">Descripció:</h3>';

      var elementsArray = [];
      var episArray = [];

      features.forEach(element => {
        if (
          element.source === "mprg" &&
          (element.properties.Descripcio || element.properties.descripcio)
        ) {
          let desc =
            element.properties.Descripcio || element.properties.descripcio;
    
          desc = desc.replace("�rea", "Àrea").replace("geomorfol�gic", "geomorfològic").replace("d�esllavissades","d'esllavissades");

          if (elementsArray.includes(desc)){
                  
                 }else{
                 
                   elementsArray.push(desc)
            
                 }


          

             if (element.properties.TXT != undefined){
               let epigraf = 
                 element.properties.TXT || element.properties.txt;
            
                 if (episArray.includes(epigraf)){
                
                 }else{
               
                        episArray.push(epigraf)
         
                 }
           
                }


        }
      });
      if (consulta_show) { 


            if (elementsArray.length !== 0 && episArray.length !== 0){
            ;
            
if (elementsArray.length == 1){
  text =
                          text +
                                       `<div>
                                         <p style="color: #666">${elementsArray[0]}</p>
                                         
                                         
                                        <p style="color: #666">Epigraf: ${episArray}</p>
                                        </div>`;
}
if (elementsArray.length == 2){
  text =
                          text +
                                       `<div>
                                         <p style="color: #666">${elementsArray[0]}</p>
                                         <p style="color: #666">${elementsArray[1]}</p>
                                        
                                         
                                        <p style="color: #666">Epigraf: ${episArray}</p>
                                        </div>`;
}
if (elementsArray.length == 3){
  text =
                          text +
                                       `<div>
                                         <p style="color: #666">${elementsArray[0]}</p>
                                         <p style="color: #666">${elementsArray[1]}</p>
                                         <p style="color: #666">${elementsArray[2]}</p>
                                 
                                         
                                        <p style="color: #666">Epigraf: ${episArray}</p>
                                        </div>`;
}
if (elementsArray.length == 4){
  text =
                          text +
                                       `<div>
                                         <p style="color: #666">${elementsArray[0]}</p>
                                         <p style="color: #666">${elementsArray[1]}</p>
                                         <p style="color: #666">${elementsArray[2]}</p>
                                         <p style="color: #666">${elementsArray[3]}</p>
                                    
                                        <p style="color: #666">Epigraf: ${episArray}</p>
                                        </div>`;
}
if (elementsArray.length == 5){
  text =
                          text +
                                       `<div>
                                         <p style="color: #666">${elementsArray[0]}</p>
                                         <p style="color: #666">${elementsArray[1]}</p>
                                         <p style="color: #666">${elementsArray[2]}</p>
                                         <p style="color: #666">${elementsArray[3]}</p>
                                         <p style="color: #666">${elementsArray[4]}</p>
                                        
                                         
                                        <p style="color: #666">Epigraf: ${episArray}</p>
                                        </div>`;
}
var popup = new mapbox.Popup({ offset: [0, -15] })
          .setHTML(text)
          .setLngLat(e.lngLat)
          .addTo(map);  
            } 
       
            
            
            
            
            
            if (elementsArray.length !== 0 && episArray.length == 0){

        if (elementsArray.length == 1){
  text =
                          text +
                                       `<div>
                                         <p style="color: #666">${elementsArray[0]}</p>
                                         
                                         
                                      
                                        </div>`;
}
if (elementsArray.length == 2){
  text =
                          text +
                                       `<div>
                                         <p style="color: #666">${elementsArray[0]}</p>
                                         <p style="color: #666">${elementsArray[1]}</p>
                                        
                                         
                                      
                                        </div>`;
}
if (elementsArray.length == 3){
  text =
                          text +
                                       `<div>
                                         <p style="color: #666">${elementsArray[0]}</p>
                                         <p style="color: #666">${elementsArray[1]}</p>
                                         <p style="color: #666">${elementsArray[2]}</p>
                                 
                                         
                                        
                                        </div>`;
}
if (elementsArray.length == 4){
  text =
                          text +
                                       `<div>
                                         <p style="color: #666">${elementsArray[0]}</p>
                                         <p style="color: #666">${elementsArray[1]}</p>
                                         <p style="color: #666">${elementsArray[2]}</p>
                                         <p style="color: #666">${elementsArray[3]}</p>
                                    
                                       
                                        </div>`;
}
if (elementsArray.length == 5){
  text =
                          text +
                                       `<div>
                                         <p style="color: #666">${elementsArray[0]}</p>
                                         <p style="color: #666">${elementsArray[1]}</p>
                                         <p style="color: #666">${elementsArray[2]}</p>
                                         <p style="color: #666">${elementsArray[3]}</p>
                                         <p style="color: #666">${elementsArray[4]}</p>
                                        
                                         
                                       
                                        </div>`;
}
var popup = new mapbox.Popup({ offset: [0, -15] })
          .setHTML(text)
          .setLngLat(e.lngLat)
          .addTo(map);
            }


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
      }
    });

 

    consulta_show = !consulta_show;
  }
</script>

<style>
  .mapbox-popup {
    max-width: 400px;
    font: 12px/20px;
    font-family: Arial, Helvetica, sans-serif;
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

</style>
 
<div class="iconoConsulta">
  <IconButton class="" on:click={changeConsultaState}>
    {#if consulta_show}
    <Icon style="font-size: 38px;color: blue;" class=" material-icons iconoConsulta">edit_location</Icon>
        {:else}
    <Icon style="font-size: 38px;color: black;" class=" material-icons iconoConsulta">edit_location</Icon>

    {/if}
  </IconButton>
</div>