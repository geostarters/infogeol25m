<script>
    import { getContext } from 'svelte';
    import mapbox from 'mapbox-gl';
  import { keyApp } from "../../config";


	const { getMap } = getContext(keyApp);
	const map = getMap();

  map.addControl(
      new mapbox.ScaleControl({
        maxWidth: 100,
        unit: "metric"
      }),
      "bottom-right"
      

    );
    document.querySelector('.mapboxgl-ctrl-scale').setAttribute('title', 'Escala gràfica');
</script> 
<style>

</style>