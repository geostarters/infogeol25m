<script>
  import IconButton, { Icon } from "@smui/icon-button";

  import { onMount } from "svelte";
  import { keyApp } from "../../config";
  import { getContext } from "svelte";

  import mapbox from "mapbox-gl";

  const overLayers = getContext("overLayers");
  const { getMap } = getContext(keyApp);
  const map = getMap();

  let llegenda_show = false;

  function changeLlegendaState() {
    if (changeLlegendaState) {
      llegenda_show = !llegenda_show;
    }
  }
</script>

<style>
  .container {
    width: 200px;
    background-color: white;
    right: 10px;
    padding: 5px;
    border-radius: 10px !important;
  }

  .iconmenu {
    z-index: 1 !important;
    position: absolute;
    margin-left: 16px !important;
   
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    height: 45px;
    top: 79px;
    float: right;
    width: auto;
    padding: 0px;
  }
  .llegendapdf {
    z-index: 1000;
    position: absolute;
    margin-left: 16px !important;
    
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    height: 45px;
    top: 0px;
    float: right;
    width: auto;
    padding: 0px;
    right: 56px;
  }

  @media (max-width: 540px) {
    .llegendapdf {
      display: flex;
      top: initial;
      right: 0;
    }
  }
</style>

<div class="container iconmenu wrapper">

  <IconButton on:click={changeLlegendaState}>
    <Icon class="material-icons icono" on>line_style</Icon>
    <Icon class="material-icons icono">line_style</Icon>

  </IconButton>

  {#if llegenda_show}
    <div class="llegendapdf container">
      <embed
        src="assets/icgc_geoindex.pdf"
        width="330"
        height="375"
        type="application/pdf" />
    </div>
  {/if}
</div>
