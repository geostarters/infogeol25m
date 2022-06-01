<script>
  import { onMount, getContext } from "svelte";
  import { keyApp } from "../../config";
  import RulerControl from "mapbox-gl-controls/lib/ruler";
  import "mapbox-gl-controls/theme.css";

  const { getMap } = getContext(keyApp);
  const map = getMap();
  onMount(async() => {
    map.addControl(new RulerControl({
      font:  ["FiraSans-Italic"],
      units:"meters",
      mainColor:'#263238',
      labelFormat: n => `${n.toFixed(2)} m`       
    }), "bottom-right");

    map.on("ruler.on", () => console.log("ruler: on"));
    map.on("ruler.off", () => console.log("ruler: off"));
    document.querySelector('.mapboxgl-ctrl-ruler').setAttribute('title', 'Mesura distàncies');
    
  });
</script>

<style>

</style>
 