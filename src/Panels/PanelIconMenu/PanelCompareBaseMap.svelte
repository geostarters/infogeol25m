<script>
  import { onMount } from "svelte";
  import IconButton, { Icon } from "@smui/icon-button";
  import { getContext } from "svelte";
  import mapbox from "mapbox-gl";
  import "mapbox-gl-compare/v0.4.0/mapbox-gl-compare.css";

  import Compare from "mapbox-gl-compare";

  import { baseLayers } from "../../config";

  let basemap_show = false;

  let mapselected = baseLayers[0];

  const changeBaseLayer = getContext("changeBaseLayer");

  //console.info("hola");

  var beforeMap = new mapbox.Map({
    container: "before",
    estilTopo: "https://tilemaps.icgc.cat/tileserver/styles/fosc.json",
    center: [0, 0],
    zoom: 0
  });

  var afterMap = new mapbox.Map({
    container: "after",
    estilTopo: "https://tilemaps.icgc.cat/tileserver/styles/icgc.json",
    center: [0, 0],
    zoom: 0
  });

  // A selector or reference to HTML element
  var container = "#comparison-container";

  var map = new Compare(beforeMap, afterMap, container, {
    // Set this to enable comparing two maps by mouse movement:
    mousemove: true,
    orientation: "vertical"
  });

  //Get Current position - this will return the slider's current position, in pixels
  compare.currentPosition;

  //Set Position - this will set the slider at the specified (x) number of pixels from the left-edge or top-edge of viewport based on swiper orientation
  compare.setSlider(x);

  //Listen to slider movement - and return current position on each slideend
  compare.on("slideend", e => {
    //console.log(e.currentPosition);
  });

  //Remove - this will remove the compare control from the DOM and stop synchronizing the two maps.
  compare.remove();
</script>

<style>
  body {
    overflow: hidden;
  }

  body * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: aquamarine;
  }
</style>

<div id="comparison-container">

  <div id="before" class="map" />
  <div id="after" class="map" />

</div>
