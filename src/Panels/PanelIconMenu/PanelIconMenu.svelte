<script>
  import IconButton, { Icon } from "@smui/icon-button";
  import { slide, fade } from "svelte/transition";

  import PanelOverLayers from "./PanelOverLayers.svelte";
  //import PanelCompareBaseMap from "./PanelCompareBaseMap.svelte";
  import PanelBaseMap from "./PanelBaseMap.svelte";
  import mapbox from "mapbox-gl";
  import LeftMenu from "../PanelDrawLeft/PanelLayers/LeftMenu.svelte"

  let starred = false;
  let capes_show = false;
  //let compare_show = false;
  let basemap_show = false;
  let switchLayer = true;
  let llegenda_show = false;
  let perillositat_selected;
  let despreniments_selected;
  let dense = false;
  let prominent = false;
  let variant = "fixed";
  let collapsed = false;

  let title = "infoGeologica";
  //let Adjust = ShortFixedAdjust;

  //export let show = false;
  let modal_show = false;
  //let compare_show;

  function doSomething() {
    starred = !starred;
  }
  setTimeout(() => {
  capes_show = true}, 4000
)
  function changeCapesState() {
    basemap_show = false;
    //compare_show = false;
    if (changeCapesState) {
      capes_show = !capes_show;
    }
  }
  function changeBasemapState() {
    capes_show = false;
    // compare_show = false;
    if (changeBasemapState) {
      basemap_show = !basemap_show;
    }
  }
  function changeLlegendaState() {
    basemap_show = false;
    capes_show = false;

    if (changeLlegendaState) {
      llegenda_show = !llegenda_show;
    }
  }
  function changeDrawerIntroState() {
    
    stateDrawerIntro.set(function() {
      
      return true;
    });
  }
  // function changeCompareState() {

  //   capes_show = false;
  //   basemap_show = false;
  //   if (changeCompareState) {
  //     compare_show = !compare_show;
  //   }
  // }
</script>

<style>
  .iconmenu {
    
    z-index: 10;
    position: fixed;
    margin-left: 0;
    /* background-color: hsla(0,0%,100%,.7); */
    border-radius: 40px;
    height: 50px;
    margin-top: -61px;
    font-family: Arial, Helvetica, sans-serif;
    color: black;
  }

@media (max-width: 624px) {
  .iconmenu {
    margin-left: 0;
    height: 50px;
    margin-top: -61px;
  
  }
  }
  @media (max-width: 415px) {
    .iconmenu {
    margin-left: 0;
    height: 50px;
    margin-top: -61px;
  
  }
  }
  @media (max-width: 321px) {
    .iconmenu {
    margin-left: 0;
    height: 50px;
    margin-top: -61px;
  
  }
  }
</style>

<div class="iconmenu" >

  <!-- ICONA CAPES -->
  <IconButton on:click={changeCapesState}  >
    <!-- <Icon class="material-icons icono" tabindex="1" on>menu</Icon> -->
    <!-- <Icon class="material-icons icono" tabindex="1" style={'font-size: 38px;'}>menu_outlined</Icon> -->
    <i class="fa fa-bars"></i>
  </IconButton>
  <!-- ICONA BASEMAP -->

  <!-- <IconButton on:click={changeBasemapState}>
    <Icon class="material-icons icono" on>border_all</Icon>
    <Icon class="material-icons icono">border_all</Icon>
  </IconButton> -->

  <!-- <div class="wrapper desplegables"> -->


    <!-- {#if basemap_show}
      <PanelBaseMap bind:show={basemap_show} />
    {/if} -->

    <!-- {#if compare_show}
      <PanelCompareBaseMap   />
    {/if} -->

  <!-- </div> -->

</div>

    {#if capes_show}
      <LeftMenu />
    {/if}