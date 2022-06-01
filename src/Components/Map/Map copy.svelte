<script>
  import { onMount, setContext, onDestroy } from "svelte";
  import {
    activateLayerStore,
    changeBaseLayerStore,
    changePaintPropertyStore,
    changeColorPropertyStore,
    changeInitialColorPropertyStore,
    changePlaceStore
  } from "../../Utils/stores.js";
  import mapbox from "mapbox-gl";
  import { keyApp } from "../../config";
 
  setContext(keyApp, {
    getMap: () => map
  });

  export let lat;
  export let lon;
  export let zoom;
  export let maxZoom;
  export let style;
  // export let map;
  export let map = undefined;

  let container;

  onMount(async() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibHN0aXoiLCJhIjoiY2s5dGtnNTZ2MWVybzNobjEyam0yd2E3MyJ9.6dCvGbS93SKGMbOqZA4Qag';

    map = new mapbox.Map({
      container,
      style,
      hash: true,
      center: [lon, lat],
      zoom,
      maxZoom,
      attributionControl: false
    });
  
            // map.addSource('dem', {
            // 'type': 'raster-dem',
            // 'url': 'https://tilemaps.icgc.cat/terrenys/demextes',
            // 'tileSize': 512,
            // 'maxzoom': 14
            // });
            // // add the DEM source as a terrain layer with exaggerated height
            // map.setTerrain({ 'source': 'dem', 'exaggeration': 1.5 });
            
            // // add a sky layer that will show when the map is highly pitched
     
      

  });
    const unsubscribeLayerActive = activateLayerStore.subscribe(
      newLayerActive => {
        if (map && newLayerActive) {
          map.setLayoutProperty(
            newLayerActive.ly,
            "visibility",
            newLayerActive.vis
          );
        }
      }
    );

    onDestroy(unsubscribeLayerActive);

    const unsubscribechangeBaseLayer = changeBaseLayerStore.subscribe(
      newchangeBaseLayer => {
        if (map && newchangeBaseLayer) {
          map.setStyle(newchangeBaseLayer);
        }
      }
    );

    onDestroy(unsubscribechangeBaseLayer);

    const unsubscribechangePaintPropertyStore = changePaintPropertyStore.subscribe(
      itemStore => {
        if (map && itemStore) {
          map.setPaintProperty(itemStore.ly, "fill-opacity", itemStore.op);
        }
      }
    );

    onDestroy(unsubscribechangePaintPropertyStore);


    var myBlueLayer = [];
     // console.log('quehihaabans', myBlueLayer)
    const unsubscribechangeColorPropertyStore = changeColorPropertyStore.subscribe(
     
      itemStore => {
        myBlueLayer = [] // reset del bluelayer
         if (map && itemStore) {
           let blue = '#01f7f7'
          //  console.log('entrocolo', itemStore)
            if (itemStore.ty === 'fill'){
            
              if(itemStore.op["fill-color"] !== undefined){
              
                  map.setPaintProperty(itemStore.ly, "fill-color", blue);

              }
              if(itemStore.op["fill-pattern"] !== undefined){
                  map.setPaintProperty(itemStore.ly, "fill-pattern", undefined);
                  // map.setPaintProperty(itemStore.ly, "fill-color", blue);
                  map.setPaintProperty(itemStore.ly, "line-color", blue);
                  map.setPaintProperty(itemStore.ly, "outline-color", blue);

              }
          //     if(itemStore.op["fill-color"] !== undefined){
              
          //     map.setPaintProperty(itemStore.ly, "fill-color", itemStore.op["fill-color"]);
          //     map.setPaintProperty(itemStore.ly, "fill-outline-color", blue);
          //     map.setPaintProperty(itemStore.ly, "fill-outline-width", 4);
              

          // }
          // if(itemStore.op["fill-pattern"] !== undefined){
          //     map.setPaintProperty(itemStore.ly, "fill-pattern", itemStore.op["fill-pattern"]);
          //      map.setPaintProperty(itemStore.ly, "fill-color", itemStore.op["fill-color"]);
          //      map.setPaintProperty(itemStore.ly, "fill-outline-color", blue);
         
          //     // map.setPaintProperty(itemStore.ly, "outline-color", blue);

          // }
            
            }
            if (itemStore.ty === 'line'){
             map.setPaintProperty(itemStore.ly, "line-color", blue);
             map.setPaintProperty(itemStore.ly, "line-width", 4);
            }       
            if (itemStore.ty === 'symbol'){
             map.setPaintProperty(itemStore.ly, "icon-color", blue);
            }

        }
        myBlueLayer.push(itemStore)
       // console.log('quehihadespres', myBlueLayer)
      }
    );

    onDestroy(unsubscribechangeColorPropertyStore);


    const unsubscribechangeInitialColorPropertyStore = changeInitialColorPropertyStore.subscribe(
     
      itemStore => {
     
         if (map && itemStore) {
           // console.log('entrocoloooooooooooooooooooooo', itemStore)
            // if (itemStore.ty === 'fill'){
            // map.setPaintProperty(itemStore.ly, "fill-color", itemStore.op["fill-color"]);
         
            // }

            if (itemStore.ty === 'fill'){
            
            if(itemStore.op["fill-color"] !== undefined){
            
                map.setPaintProperty(itemStore.ly, "fill-color", itemStore.op["fill-color"]);

            }
            if(itemStore.op["fill-pattern"] !== undefined){
                map.setPaintProperty(itemStore.ly, "fill-pattern", itemStore.op["fill-pattern"]);

            }
           
          
          }
            if (itemStore.ty === 'line'){
             map.setPaintProperty(itemStore.ly, "line-color", itemStore.op["line-color"]);
             map.setPaintProperty(itemStore.ly, "line-width", itemStore.op["line-width"]);
            }       
            if (itemStore.ty === 'symbol'){
             map.setPaintProperty(itemStore.ly, "icon-color", itemStore.op["icon-color"]);
            }
        }
       // myBlueLayer.push(itemStore)
       // console.log('quehihadespres', myBlueLayer)
      }
    );

    onDestroy(unsubscribechangeInitialColorPropertyStore);



    const unsubscribechangePlaceStore = changePlaceStore.subscribe(
      coordStore => {
        if (map && coordStore) {
          const coordx = coordStore.coords.x;
          const coordy = coordStore.coords.y;

          map.jumpTo({ center: [coordx, coordy], zoom: 14 });
        }
      }
    );

    onDestroy(unsubscribechangePlaceStore);
  
</script>

<style>
  #map {
    position:absolute; 
    top:0; 
    bottom:0; 
    width:100%;
    height: 100%;
  }
</style>

<div id="map" bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>
