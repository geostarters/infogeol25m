<script>
  import { onMount, getContext } from "svelte";
  import { keyApp } from "../../config";
  import InspectControl from "mapbox-gl-controls/lib/inspect";
  import "mapbox-gl-controls/theme.css";

  const { getMap } = getContext(keyApp);
  const map = getMap();
  onMount(async() => {
    map.addControl(new InspectControl(), "bottom-right");
  });
</script>
 