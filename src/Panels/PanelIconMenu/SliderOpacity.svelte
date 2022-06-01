<script>
  import { onMount, getContext } from "svelte";
  import Button from "@smui/button";
  import mapbox from "mapbox-gl";
  import { keyApp } from "../../config";

  export let item;

  let overLayers = getContext("overLayers");

  const changePaintProperty = getContext("changePaintProperty");

  // let slider_show = false;

  // var slider = document.getElementById("slider");

  // var sliderValue = document.getElementById("slider-value");

  function changeOpacity(e) {
 
   changePaintProperty(item, event.target.value);
     
    // console.log('event target',event.target.value)
    // console.log('itemvaue', item)
  }
</script>

<style>
  .map-overlay {
    font: bold 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
    position: relative;
    width: 75% !important;
    top: 0px !important;
    left: -5px !important;
    padding: 0px;
  }

  .map-overlay .map-overlay-inner {
    background-color: #fff;
    box-shadow: 0px !important;
    border-radius: 0px !important;
    padding: 0px !important;
    margin-bottom: 0px !important;
  }

  .map-overlay label {
    display: block;
    margin: 0 0 10px;
  }

  .map-overlay input {
    background-color: transparent;
    display: inline-block;
    width: 100%;
    position: relative;
    margin: 0;
    cursor: ew-resize;
  }
</style>

<div class="map-overlay top">
  <div class="map-overlay-inner">

    <input
     
      on:change={changeOpacity}
      type="range"
      min="0"
      max="100"
      step="0"
      value="50" />
      <!-- <input
      id="slider"
      on:change={changeOpacity}
      type="range"
      min="0"
      max="100"
      step="0"
      value="50" /> -->
  </div>
</div>
