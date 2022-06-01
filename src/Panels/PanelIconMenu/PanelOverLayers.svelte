<script>
  import { onMount, getContext } from "svelte";
  import LayerGroup from "./LayerGroup.svelte";
  import PanelSearchBar from "../PanelSearchBar/PanelSearchBar.svelte";
  import { layerTree } from "../../config";
import PanelBaseMap from "./PanelBaseMap.svelte";
let labelArray = ''
</script>

<style>
  #fitcontent{
    font-family: Arial, Helvetica, sans-serif;
  }
   /* #capaselect {
    /* width: 215px;
    background-color: white; 
    left: 10px;
    padding-left: 15px;
    padding-top: 15px;
    /*border-radius: 10px !important; 
    max-height: 700px;
    overflow: auto;
  }  */
  #capaselect{
    left: -5px;
    padding-left: 15px;
    position: relative;
    padding-top: 0px;
    max-height: 700px;
    /* overflow: auto; */
    top: -17px;
  }
  h2{
    /* color: white; */
    padding-left: 10px;
    /* font-weight: 200; */
    font-size: larger;
    position: relative;
    top: -10px;
  }
  .headerImage2{
/* position: relative;
top: -27px; */
  }

  @media (max-width: 624px) {
    h2 {
      font-size: 1rem !important;
    }  
  
  }
  @media (max-width: 500px) {
    h2 {
      font-size: 1rem !important;
    }  

  }
  @media (max-width: 321px) {
    h2 {
      font-size: 1rem !important;
    }  

  }
</style>
<div class="fitcontent">
 
<div>

    <div class="headerImage">
      <!-- <h2>Cercador:</h2> -->
    <PanelSearchBar />
 <div>
     <div class="headerImage2">
      
      <h2>Selector de mapa base:</h2>
    <PanelBaseMap />


    </div>
</div>
        <h2>Selector de capes:</h2>
    </div>
    <div id="capaselect" class="container list">



      {#each layerTree as layer, index}
    <LayerGroup {layer} {labelArray}/>
      {/each}

    </div>
</div>
  


 


 </div>