<script>
    import { getContext } from 'svelte';
    import mapbox from 'mapbox-gl';
    import { keyApp } from "../../config";


	const { getMap } = getContext(keyApp);
	const map = getMap();

 map.addControl(new mapbox.AttributionControl({ compact: true  
      }),
      "bottom-right"
    );
</script> 
<style>

</style>