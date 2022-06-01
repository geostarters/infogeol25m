<script>
  import { onMount, getContext } from "svelte";
  import { keyApp } from "../../config";
  import mapbox from "mapbox-gl";

  const { getMap } = getContext(keyApp);
  const map = getMap();
  let overLayers = getContext("overLayers");

  function addOverLayerToMap() {
    if (overLayers) {
      // add sources
      Object.keys(overLayers.sources).forEach(function(key, index) {
        if (!map.getSource(key)) {
          map.addSource(key, overLayers.sources[key]);
          
        }
      });

      // add Keys
      overLayers.layers.forEach(element => {
        if (!map.getLayer(element.id)) {
          map.addLayer(element, "water-name-lakeline-platja");
        }
      });
    }
  }

  map.on("styledata", () => {
    setTimeout(() => {
      if (map.isStyleLoaded()) {
        addOverLayerToMap();
      }
    }, 2000);
  });

  map.on("load", () => {
    addOverLayerToMap();
  }); //end load
</script>
