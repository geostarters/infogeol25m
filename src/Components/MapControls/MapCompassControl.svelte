<script>
  import { onMount, getContext } from "svelte";
  import { keyApp } from "../../config";
  import CompassControl from "mapbox-gl-controls/lib/compass";
  import "mapbox-gl-controls/theme.css";

  //export let radialState ;
  const { getMap } = getContext(keyApp);
  const map = getMap();

  //$:console.log('state', radialState)
 
    map.addControl(new CompassControl(), "bottom-right");
    document.querySelector('.mapboxgl-ctrl-compass').setAttribute('title', 'Torna al Nord');
   

</script>
 
