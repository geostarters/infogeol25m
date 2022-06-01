
<script>

  import MapAttribution from "./MapAttribution.svelte";
  import MapGeolocateControl from "./MapGeolocateControl.svelte";
  import MapRulerControl from "./MapRulerControl.svelte"; 
  import MapScaleControl from "./MapScaleControl.svelte";
  import MapCompassControl from "./MapCompassControl.svelte";
  import MapMouseCoordControl from "./MapMouseCoordControl.svelte";
  import MapPitchToggleControl from "./MapPitchToggleControl.svelte";
  import IconButton, { Icon } from "@smui/icon-button"; 
  // import MapInspect from "./MapInspect.svelte";
let radialState = true
  function changeRadialState () {
    radialState = !radialState
    //.log (radialState)
  }

</script>

<style>
  .mapboxgl-ctrl mapboxgl-ctrl-scale{
    bottom: 31px !important;
    right: 31px !important;
    position: relative !important;
  }
  .iconoConsulta {
    position: absolute;
    margin-top: 132px;
    right: 17px;
  }
  .bottomcontrols{
display: grid;
  }

</style>

     <MapScaleControl />
     <MapAttribution />
   
  
     {#if window.innerWidth >500}
         <MapMouseCoordControl />
     {/if}
   
  

    <MapCompassControl/>  
    <MapGeolocateControl/>
    <MapRulerControl />

    <MapPitchToggleControl />

    <!-- <MapInspect />  -->