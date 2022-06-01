<script>
  import IconButton, { Icon } from "@smui/icon-button";
  import { getContext } from "svelte";
  import { baseLayers } from "../../config";
 const changeBaseLayer = getContext("changeBaseLayer");
 const removeWmsBaseLayer = getContext("removeWmsBaseLayer");
  let basemap_show = false;

  let mapselected = baseLayers[0];
let wms = baseLayers[2]
let wmsactive = false
// console.log('wms', wms)

var elwms = document.getElementById('wmsid');

// function letwms(){
//   // console.log('kokoko')
//   if ( document.getElementById("wmsid").checked === false){
//     // console.log('era false')
//   wms = { url:
//       "removeestructuralwms",
//   },
//   changeBaseLayer(wms)
//     //remove wms
//   }else{
//     wms = baseLayers[2]
//     // console.log('era true')
//     changeBaseLayer(wms)
//   }
//   // 
// }
// function letwmsfalse (){
//   // console.log('wmsac', wmsactive)
//   wmsactive= false
//   document.getElementById("wmsid").checked = false;
// }
 
</script>

<style>
  /* .container {
    width: 84%;
    left: 15px;
    padding: 10px;
    padding-left: 15px;
    border-radius: 10px !important;
  } */
  .container{
    width: 84%;
    /* left: 15px; */
    padding: 1px 10px 10px 10px;
    border-radius: 10px!important;
    position: relative;
    top: -11px;
  }

  .wrapper {
    display: grid;
    /* grid-template-columns: 90px 90px;
    grid-template-rows: 60px 60px; */
    /* padding: 3px; */
    grid-gap: 10px;
    border-radius: 10px !important;
  }
  label {
    color: black;
    background-color: rgba(255, 255, 255, 1);
    /* text-align: center !important; */
    font-size: 13px !important;
  }
</style>

<div class="container">

  <div id="menu" class="wrapper">

    {#each baseLayers as value}
    {#if value.url === "estructuralwms"}
        <!-- <div style="height:50px;border-width: 1px;border-color: #bdb9b9;border-style: solid; background-image: url('{value.image}')"> -->
          <div >
          <label>
            <input id="wmsid"
              type="checkbox"
              checked={wmsactive}
              {value}
              
              on:click={letwms}
               />
            {value.label}
          </label>
        </div>

    {:else}
        <div >
              <label>
                <input
                  type="radio"
                  checked={value.label === mapselected.label ? true : false}
                  {value}
                  bind:group={mapselected}
                  on:change={() => changeBaseLayer(mapselected)} 
              />
                {value.label}
              </label>
            </div>

    {/if}
    
    {/each}

  </div>
</div>
