<script>
  import { onMount, getContext } from "svelte";
  import mapbox from "mapbox-gl";
  import { keyApp } from "../../config";

  const { getMap } = getContext(keyApp);
  const map = getMap();

  onMount(async() => {
   
    map.addControl(
      new mapbox.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
          watchPosition: true,
          
        },
        accessibleLabelProperty: 'name'
      }),
      "bottom-right"
    );

  });
</script>
 
  