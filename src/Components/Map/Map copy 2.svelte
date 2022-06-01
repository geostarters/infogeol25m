<script>
  import { onMount, setContext, onDestroy, getContext } from "svelte";
  import {
    activateLayerStore,
    changeHighlightItemStore,
    changeBaseLayerStore,
    changePaintPropertyStore,
    changeColorPropertyStore,
    changeInitialColorPropertyStore,
    changePlaceStore,
  } from "../../Utils/stores.js";
  import mapbox from "mapbox-gl";

  import { keyApp } from "../../config";
  import { layerTree } from "../../config";
  import { each } from "svelte/internal";
  import Logo_map from "../../UI/Logo_map.svelte";
  setContext(keyApp, {
    getMap: () => map,
  });

  export let lat;
  export let lon;
  export let zoom;
  export let maxZoom;
  export let style;
  // export let map;
  export let map = undefined;
  //export let item;

  let overLayers = getContext("overLayers");

  const changePaintProperty = getContext("changePaintProperty");

  let container;

  onMount(async () => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibHN0aXoiLCJhIjoiY2s5dGtnNTZ2MWVybzNobjEyam0yd2E3MyJ9.6dCvGbS93SKGMbOqZA4Qag";

    map = new mapbox.Map({
      container,
      style,
      hash: true,
      center: [lon, lat],
      zoom,
      maxZoom,
      attributionControl: false,
    });
  });
  //canvia opacitat al 50
  layerTree.forEach((element) => {
    //console.log('ele', element.groupLabel)
    element.items.forEach((item) => {
      // console.log('ii', item)
      changePaintProperty(item, 50);
    });
  });
  //fa visible-none
  const unsubscribeLayerActive = activateLayerStore.subscribe(
    (newLayerActive) => {
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
  //canvia baselayer
  const unsubscribechangeBaseLayer = changeBaseLayerStore.subscribe(
    (newchangeBaseLayer) => {
      if (map && newchangeBaseLayer) {
        map.setStyle(newchangeBaseLayer);
      }
    }
  );

  onDestroy(unsubscribechangeBaseLayer);
  //canvia opacitat segons la slidebar
  const unsubscribechangePaintPropertyStore = changePaintPropertyStore.subscribe(
    (itemStore) => {
      if (map && itemStore) {
        //console.log('mm', itemStore)
        map.setPaintProperty(itemStore.ly, "fill-opacity", itemStore.op);
      }
    }
  );
  onDestroy(unsubscribechangePaintPropertyStore);
  //funció ACTIVA I CREA highlight amb nou filtre
  let myOldLayer = [];
  let highOldId;
  let originalOldFilter;
  let new_OldFilter;
  let newLayer = "";
  const unsubscribechangeHighlightItem = changeHighlightItemStore.subscribe(
    (itemStore) => {
      if (map && itemStore) {
        // console.log("mm", itemStore);
        //console.log("myOldLayer", highOldId);
        // console.log('oldLayer?:', newLayer)
        if (newLayer !== "") {
          //console.log("newLayerOLD", newLayer);
          map.removeLayer(newLayer);
        }

        // FALTA QUE SI HAY UN _HIGHLIGHT, QUE LO BORRE ANTES DE HACER UNO NUEVO... INDICAR CON ID ANTIGUO, DEJARLO
        //REGISTRADO EN UNA VARIABLE
        //AHORA CADA VEZ Q SE HACE CLIC SE CREA UN LAYER AUNQUE SEA IGUAL... Y ESE ES EL ERROR
       
       
        // if (itemStore.item.layer.id === "Talls Geològics/5704") {
        //   //console.log("*******", itemStore.item);

        //   map.setFilter("Talls Geològics/5704_highlighted", [
        //     "in",
        //     "NOM_TALL",
        //     itemStore.item.properties.NOM_TALL,
        //   ]);
      
      
      
        // }
///////////////////////////////////////////////////////////////////
        if (itemStore.id === "talls") {
          // console.log('tallsgeologics', itemStore)
          let highId = itemStore.item.layer.id;
          let originalFilter = itemStore.item.layer.filter;
          var new_Filter = [
            "all",
            ["in", "_symbol", originalFilter[2]],
            ["in", "NOM_TALL", itemStore.nom],
          ];
          var layers = map.getStyle().layers
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
              if (layers[i].id === "Talls Geològics/5704") {
                firstSymbolId = layers[i].id;
                
                break;
              }
          }
          map.addLayer(
            {
              id: `${highId}_highlight`,
              type: "line",
              source: "infogeo",
              "source-layer": "Talls Geològics", //quaternari
              layout: {
                visibility: "visible",
              },
              paint: {
                "line-opacity": 1,
                "line-color": "#ADE5FF",
                "line-width": 3.033333
              },
              filter: ["in", "NOM_TALL", itemStore.item.properties.NOM_TALL], // filter idabs i codi-cas
            },
            firstSymbolId
            //falta filtre symbol
          );
          newLayer = `${highId}_highlight`;
         // console.log("newLayer?:", newLayer);
          //map.setFilter(`${highId}_highlight`, ["in", "IDABS", itemStore.idabs] );
          map.setFilter(`${highId}_highlight`, new_Filter);
          //map.removeSource('polygon_highlighted1')
        }
///////////////////////////////////////////////////////////////











        if (itemStore.id === "polygonsQt") {
          //console.log('poligon quaternari', itemStore)
          let highId = itemStore.item.layer.id;
          let originalFilter = itemStore.item.layer.filter;
          var new_Filter = [
            "all",
            ["in", "_symbol", originalFilter[2]],
            ["in", "IDABS", itemStore.idabs],
          ];
          var layers = map.getStyle().layers
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
              if (layers[i].id === "BASAMENT PREQUATERNARI/Unitats geològiques del basament/CACe") {
                firstSymbolId = layers[i].id;
                
                break;
              }
          }
          map.addLayer(
            {
              id: `${highId}_highlight`,
              type: "fill",
              source: "infogeo",
              "source-layer": "Unitats geològiques del quaternari", //quaternari
              layout: {
                visibility: "visible",
              },
              paint: {
                "fill-outline-color": "#000000",
                "fill-color": "#ADE5FF",
                "fill-opacity": 0.75,
              },
              filter: ["in", "_symbol", originalFilter[2]], // filter idabs i codi-cas
            },
            firstSymbolId
            //falta filtre symbol
          );
          newLayer = `${highId}_highlight`;
         // console.log("newLayer?:", newLayer);
          //map.setFilter(`${highId}_highlight`, ["in", "IDABS", itemStore.idabs] );
          map.setFilter(`${highId}_highlight`, new_Filter);
          //map.removeSource('polygon_highlighted1')
        }

        if (itemStore.id === "polygonsBs") {
          //console.log("poligon basemenet", itemStore.item.layer.id);

          let highId = itemStore.item.layer.id;

          let originalFilter = itemStore.item.layer.filter;
          var new_Filter = [
            "all",
            ["in", "_symbol", originalFilter[2]],
            ["in", "IDABS", itemStore.idabs],
          ];
          var layers = map.getStyle().layers
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
              if (layers[i].id === "QUATERNARI/Unitats geològiques del quaternari/QHac") {
                firstSymbolId = layers[i].id;
                
                break;
              }
          }
          /////
          map.addLayer(
            {
              id: `${highId}_highlight`,
              type: "fill",
              source: "infogeo",
              "source-layer": "Unitats geològiques del basament", //basament
              layout: {
                visibility: "visible",
              },
              paint: {
                "fill-outline-color": "#000000",
                "fill-color": "#ADE5FF",
                "fill-opacity": 0.75,
              },
              filter: ["in", "_symbol", originalFilter[2]], // filter idabs i codi-cas
            },
            firstSymbolId
            //falta filtre symbol
          );

          newLayer = `${highId}_highlight`;
          //console.log("newLayer?:", newLayer);
          map.setFilter(`${highId}_highlight`, new_Filter);

          //     //map.removeSource('polygon_highlighted2')
          //          }
        }
      }
      myOldLayer.push(itemStore);
    }
  );
  onDestroy(unsubscribechangeHighlightItem);

  //funció activa tot el que sigui mateix codi_CAS amb blueLayer
  var myBlueLayer = [];
  const unsubscribechangeColorPropertyStore = changeColorPropertyStore.subscribe(
    (itemStore) => {
      myBlueLayer = []; // reset del bluelayer
      if (map && itemStore) {
        //  let blue = '#01f7f7'
         let blue= '#00fff2'
        // let blue = "#8AFDE3";

        if (itemStore.ty === "fill") {
          if (itemStore.op["fill-color"] !== undefined) {
            map.setPaintProperty(itemStore.ly, "fill-color", blue);
          }
          if (itemStore.op["fill-pattern"] !== undefined) {
            map.setPaintProperty(itemStore.ly, "fill-pattern", undefined);
            map.setPaintProperty(itemStore.ly, "fill-color", blue);
          }
        }
        if (itemStore.ty === "line") {
          map.setPaintProperty(itemStore.ly, "line-color", blue);
          map.setPaintProperty(itemStore.ly, "line-width", 4);
        }
        if (itemStore.ty === "symbol") {
          map.setPaintProperty(itemStore.ly, "icon-color", blue);
        }
      }
      myBlueLayer.push(itemStore);
      // console.log('quehihadespres', myBlueLayer)
    }
  );
  onDestroy(unsubscribechangeColorPropertyStore);
  // funció torna aspecte original després del blueLayer
  const unsubscribechangeInitialColorPropertyStore = changeInitialColorPropertyStore.subscribe(
    (itemStore) => {
      if (map && itemStore) {
        //console.log("CHANGE TO INITIAL COLOR PATTERN", itemStore);
        if (newLayer !== "") {
          //console.log("newLayerOLD", newLayer);
          map.removeLayer(newLayer);
        }
        // if (itemStore.ty === 'fill'){
        // map.setPaintProperty(itemStore.ly, "fill-color", itemStore.op["fill-color"]);

        // }

        if (itemStore.ty === "fill") {
          if (itemStore.op["fill-color"] !== undefined) {
            map.setPaintProperty(
              itemStore.ly,
              "fill-color",
              itemStore.op["fill-color"]
            );
          }
          if (itemStore.op["fill-pattern"] !== undefined) {
            map.setPaintProperty(
              itemStore.ly,
              "fill-pattern",
              itemStore.op["fill-pattern"]
            );
            map.setPaintProperty(
              itemStore.ly,
              "fill-color",
              itemStore.op[undefined]
            );
          }
        }
        if (itemStore.ty === "line") {
          map.setPaintProperty(
            itemStore.ly,
            "line-color",
            itemStore.op["line-color"]
          );
          map.setPaintProperty(
            itemStore.ly,
            "line-width",
            itemStore.op["line-width"]
          );
        }
        if (itemStore.ty === "symbol") {
          map.setPaintProperty(
            itemStore.ly,
            "icon-color",
            itemStore.op["icon-color"]
          );
        }
      }
      // myBlueLayer.push(itemStore)
      // console.log('quehihadespres', myBlueLayer)
    }
  );
  onDestroy(unsubscribechangeInitialColorPropertyStore);
  //canvia de lloc el visor
  const unsubscribechangePlaceStore = changePlaceStore.subscribe(
    (coordStore) => {
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
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 96%;
  }
</style>

<div id="map" bind:this={container}>
  {#if map}
    <slot />
    <Logo_map />
  {/if}
</div>
