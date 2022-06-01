<script>
    import { onMount, getContext } from "svelte";
   
   import { keyApp } from "../../config";
   import  { mapbox } from '../../Components/Map/mapbox';
    import PitchToggleControl from "./Custom/PitchToggleControl";
    const { getMap } = getContext(keyApp);
    const map = getMap();
      map.addControl(new PitchToggleControl(), "bottom-right");
  </script>