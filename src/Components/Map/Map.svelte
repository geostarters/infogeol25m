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
  // import mapbox from "mapbox-gl";
  import { miraCentreDins } from "../../Utils/Utils.svelte";
  import { mapbox } from "./mapbox.js";
  import { keyApp } from "../../config";
  import { layerTree, urlTerrainICGC } from "../../config";
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
  export let pitch;
  export let bearing;
  // export let map;
  export let map = undefined;
  //export let item;

  let overLayers = getContext("overLayers");
  const activateLayerGroup = getContext("activateLayerGroup");
  const changePaintProperty = getContext("changePaintProperty");
  let canvas 
  let container;


  onMount(async () => {
    mapbox.accessToken =
      "pk.eyJ1IjoibHN0aXoiLCJhIjoiY2s5dGtnNTZ2MWVybzNobjEyam0yd2E3MyJ9.6dCvGbS93SKGMbOqZA4Qag";

    map = new mapbox.Map({
      container,
      style,
      hash: true,
      center: [lon, lat],
      zoom,
      maxZoom,
      
      bearing,
      pitch,
      logoPosition: "top-right", //logo mapbox
      attributionControl: false,
    });

    // map.on("load", (event) => {
    //   window.devicePixelRatio=1
    //   addSources().then(function () {
    //     addTerrain3d();
    //   });
    // });
    map.once("load", (event) => {
      addSources().then(function () {
        addTerrain3d();
      
      });
      
      console.log("");
      map.resize();
      let visib = false;
      layerTree.forEach((element) => {
        if (
          element.groupId === "opt_basament" ||
          element.groupId === "opt_quaternari"
        ) {
        } else {
          activateLayerGroup(element, visib);
        }
      });




      //addlayers



      /// end
      layerTree.forEach((element) => {
        //console.log('ele', element.groupLabel)
        element.items.forEach((item) => {
          // console.log('ii', item)
          changePaintProperty(item, 50);
        });
      });
      console.log("");

    });
  });

  function resize() {
    var factor = 0.5; // percentage of the screen
    var w = window.innerWidth * factor;
    var h = window.innerHeight * factor;
    map.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
}; 
window.addEventListener("resize", resize);

  async function addSources() {
    console.log(map.getSource("mapbox-dem"));
    if (!map.getSource("mapbox-dem")) {
      try{      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
    }catch{}
      // console.log(map.getSource("mapbox-dem"));
    }
    if (!map.getSource("icgc-dem")) {
     try { map.addSource("icgc-dem", {
        type: "raster-dem",
        tiles: [urlTerrainICGC],
        tileSize: 512,
        maxzoom: 14,
      });
    }catch{}
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 50.0],
          "sky-atmosphere-sun-intensity": 5,
        },
      });
    }

  
    addOverLayerToMap();




  }
  async function addOverLayerToMap() {
    // console.log('entro overlayers')
    if (overLayers) {
      // console.log('entro add sources')
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
    // console.log('surto overlayers')
  }
  function addTerrain3d() {
    const bt3d = window.document.getElementById("bt3D").className;
    if (bt3d.indexOf("2d") !== -1) {
      console.log('');
      try {
        console.log('');
        var { longitude, latitude } = map.getCenter();
        const socDins = miraCentreDins(longitude, latitude, map.getZoom());
   
        if (socDins) {
          map.setTerrain({
            source: "icgc-dem",
            exaggeration: 1.2,
          });
        } else {
         map.setTerrain({
            source: "mapbox-dem",
            exaggeration: 1.5,
          });
        }
      } catch (err) {}
    }
  }
  //canvia opacitat al 50

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

        map.setStyle(newchangeBaseLayer)
        map.on("styledata", function () {
          addSources().then(function () {
            addTerrain3d();
          });
        });

        map.resize();
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
          // console.log("newLayerOLDooo", newLayer);
          // map.removeLayer(newLayer);                            ///he esborrat aquest removeLayer
        }

        // FALTA QUE SI HAY UN _HIGHLIGHT, QUE LO BORRE ANTES DE HACER UNO NUEVO... INDICAR CON ID ANTIGUO, DEJARLO
        //REGISTRADO EN UNA VARIABLE
        //AHORA CADA VEZ Q SE HACE CLIC SE CREA UN LAYER AUNQUE SEA IGUAL... Y ESE ES EL ERROR

        // if (itemStore.item.layer.id === "Talls geològics/5704") {
        //   //console.log("*******", itemStore.item);

        //   map.setFilter("Talls geològics/5704_highlighted", [
        //     "in",
        //     "NOM_TALL",
        //     itemStore.item.properties.NOM_TALL,
        //   ]);

        // }
        ///////////////////////////////////////////////////////////////////

        if (itemStore.id === "modificats") {
          //  console.log('modificats', itemStore)
          let highId = itemStore.item.layer.id;
          let originalFilter = itemStore.item.layer.filter;
          var new_Filter = [
            "all",
            // ["in", "_symbol", originalFilter[2]],
            ["in", "CODI_CAS", itemStore.nom],
          ];
          var layers = map.getStyle().layers;
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
            if (layers[i].id === "Terrenys antropitzats/Terrenys modificats/3") {
              firstSymbolId = layers[i].id;

              break;
            }
          }
          map.addLayer(
            {
              id: `${highId}_highlight`,
              type: "line",
              source: "infogeo",
              "source-layer": "Terrenys modificats", //quaternari
              layout: {
                visibility: "visible",
              },
              paint: {
                "line-opacity": 1,
                "line-color": "#ADE5FF",
                "line-width": 5.033333,
              },
              filter: ["in", "CODI_CAS", itemStore.item.properties.CODI_CAS], // filter idabs i codi-cas
            },
            firstSymbolId
            //falta filtre symbol
          );
          newLayer = `${highId}_highlight`;
          // console.log("newLayer?:", newLayer, new_Filter);
          //map.setFilter(`${highId}_highlight`, ["in", "IDABS", itemStore.idabs] );
          map.setFilter(`${highId}_highlight`, new_Filter);
          //map.removeSource('polygon_highlighted1')
        }



        if (itemStore.id === "antropics") {
          //  console.log('entrem antropicsssss', itemStore)
          let highId = itemStore.item.layer.id;
          let sourceL = itemStore.item.layer["source-layer"];
          let originalFilter = itemStore.item.layer.filter;
          var new_Filter = [
            "all",
            // ["in", "_symbol", originalFilter[2]],
            ["in", "CODI_CAS", itemStore.nom],
          ];
          var layers = map.getStyle().layers;
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
            if (layers[i].id === "Terrenys antropitzats/Terrenys rebaixats/3") {
              firstSymbolId = layers[i].id;

              break;
            }
          }
          map.addLayer(
            {
              id: `${highId}_highlight`,
              type: "fill",
              source: "infogeo",
              "source-layer": sourceL, //quaternari
              layout: {
                visibility: "visible",
              },
              paint: {
                "fill-outline-color": "#000000",
                "fill-color": "#ADE5FF",
                "fill-opacity": 0.75,
              },
              filter: ["in", "CODI_CAS", itemStore.item.properties.CODI_CAS], // filter idabs i codi-cas
            },
            firstSymbolId
            //falta filtre symbol
          );
          newLayer = `${highId}_highlight`;
          // console.log("newLayer?:", newLayer, new_Filter);
          //map.setFilter(`${highId}_highlight`, ["in", "IDABS", itemStore.idabs] );
          map.setFilter(`${highId}_highlight`, new_Filter);
          //map.removeSource('polygon_highlighted1')
        }



        if (itemStore.id === "terraplenats") {
          //  console.log('terraplenats', itemStore)
          let highId = itemStore.item.layer.id;
          let originalFilter = itemStore.item.layer.filter;
          var new_Filter = [
            "all",
            // ["in", "_symbol", originalFilter[2]],
            ["in", "CODI_CAS", itemStore.nom],
          ];
          var layers = map.getStyle().layers;
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
            if (layers[i].id === "Terrenys antropitzats/Terrenys terraplenats") {
              firstSymbolId = layers[i].id;

              break;
            }
          }
          map.addLayer(
            {
              id: `${highId}_highlight`,
              type: "line",
              source: "infogeo",
              "source-layer": "Terrenys terraplenats", //quaternari
              layout: {
                visibility: "visible",
              },
              paint: {
                "line-opacity": 1,
                "line-color": "#ADE5FF",
                "line-width": 5.033333,
              },
              filter: ["in", "CODI_CAS", itemStore.item.properties.CODI_CAS], // filter idabs i codi-cas
            },
            firstSymbolId
            //falta filtre symbol
          );
          newLayer = `${highId}_highlight`;
          // console.log("newLayer?:", newLayer, new_Filter);
          //map.setFilter(`${highId}_highlight`, ["in", "IDABS", itemStore.idabs] );
          map.setFilter(`${highId}_highlight`, new_Filter);
          //map.removeSource('polygon_highlighted1')
        }


        
        if (itemStore.id === "talls") {
          //  console.log('tallsgeologics', itemStore)
          let highId = itemStore.item.layer.id;
          let originalFilter = itemStore.item.layer.filter;
          var new_Filter = [
            "all",
            ["in", "_symbol", originalFilter[2]],
            ["in", "NOM_TALL", itemStore.nom],
          ];
          var layers = map.getStyle().layers;
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
            if (layers[i].id === "Talls geològics/Traces de talls geològics/5704") {
              firstSymbolId = layers[i].id;

              break;
            }
          }
          map.addLayer(
            {
              id: `${highId}_highlight`,
              type: "line",
              source: "infogeo",
              "source-layer": "Traces de talls geològics", //quaternari
              layout: {
                visibility: "visible",
              },
              paint: {
                "line-opacity": 1,
                "line-color": "#ADE5FF",
                "line-width": 5.033333,
              },
              filter: ["in", "NOM_TALL", itemStore.item.properties.NOM_TALL], // filter idabs i codi-cas
            },
            firstSymbolId
            //falta filtre symbol
          );
          newLayer = `${highId}_highlight`;
          // console.log("newLayer?:", newLayer, new_Filter);
          //map.setFilter(`${highId}_highlight`, ["in", "IDABS", itemStore.idabs] );
          map.setFilter(`${highId}_highlight`, new_Filter);
          //map.removeSource('polygon_highlighted1')
        }
        ///////////////////////////////////////////////////////////////

        /////ESQUEMES DE RELACIONS ESTRATIGRÀFIQUES

        if (itemStore.id === "polygonEsquemes") {
          //  console.log('esquemes', itemStore)
          let highId = itemStore.item.layer.id;
          // console.log('esquemesid', highId)
          let originalFilter = itemStore.item.layer.filter;
          var new_Filter = [
            "all",
            ["in", "_symbol", originalFilter[2]],
            ["in", "IDABS", itemStore.idabs],
          ];
          var layers = map.getStyle().layers;
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
            if (
              layers[i].id ===
              "Registre geològic/Esquemes de relacions estratigràfiques"
            ) {
              firstSymbolId = layers[i].id;

              break;
            }
          }
          map.addLayer(
            {
              id: `${highId}_highlight`,
              type: "line",
              source: "infogeo",
              "source-layer": "Esquemes de relacions estratigràfiques", //quaternari
              layout: {
                visibility: "visible",
              },
              paint: {
                "line-opacity": 1,
                "line-color": "#ADE5FF",
                "line-width": 5.033333,
              },
              filter: ["in", "IDABS", itemStore.item.properties.IDABS], // filter idabs i codi-cas
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

        // COLUMNESSSSSS

        // if (itemStore.id === "polygonColumnes") {
        //           console.log('poligon columnes', itemStore)

        //           let highId = itemStore.item.layer.id;
        //           let originalFilter = itemStore.item.layer.filter;
        //           let sourceL = itemStore.item.layer["source-layer"]
        //           console.log('poli', highId, originalFilter[2])
        //           var new_Filter = [
        //             "all",
        //             ["in", "_symbol", originalFilter[2]],
        //             ["in", "IDABS", itemStore.idabs],
        //           ];
        //           var layers = map.getStyle().layers
        //           var firstSymbolId;
        //           for (var i = 0; i < layers.length; i++) {
        //               if (layers[i].id === "Registre geològic/Columnes estratigràfiques/Columnes del Paleozoic/Paleozoic LINK/Paleozoic") {
        //                 console.log('1')
        //                 firstSymbolId = layers[i].id;

        //                 break;
        //               }
        //           }

        //           map.addLayer(
        //             {
        //               id: `${highId}_highlight`,
        //               type: "fill",
        //               source: "infogeo",
        //               "source-layer": sourceL, //quaternari
        //               layout: {
        //                 visibility: "visible",
        //               },
        //               paint: {
        //                 "fill-outline-color": "#000000",
        //                 "fill-color": "#ADE5FF",
        //                 "fill-opacity": 0.75,
        //               },
        //                filter: ["in", "_symbol", originalFilter[2]], // filter idabs i codi-cas
        //             },
        //             firstSymbolId
        //             //falta filtre symbol
        //           );

        //           newLayer = `${highId}_highlight`;
        //          console.log("newLayer?:", newLayer);
        //           // map.setFilter(`${highId}_highlight`, ["in", "IDABS", itemStore.idabs] );

        //           map.setFilter(`${highId}_highlight`, new_Filter);
        //            console.log('despres')//map.removeSource('polygon_highlighted1')
        //         }

        if (itemStore.id === "polygonColumnes") {
          // console.log('poligon columnes', itemStore)
// 
          let highId = itemStore.item.layer.id;
          let originalFilter = itemStore.item.layer.filter;
          let sourceL = itemStore.item.layer["source-layer"];
          // console.log('poli', highId, originalFilter[2])
          var new_Filter = [
            "all",
            ["in", "_symbol", originalFilter[2]],
            ["in", "IDABS", itemStore.idabs],
          ];
          var layers = map.getStyle().layers;
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
            if (
              layers[i].id ===
              "Registre geològic/Columnes estratigràfiques/Columnes del Paleozoic/Paleozoic LINK/Paleozoic"
            ) {
              // console.log('1')
              firstSymbolId = layers[i].id;

              break;
            }
          }

          map.addLayer(
            {
              id: `${highId}_highlight`,
              type: "fill",
              source: "infogeo",
              "source-layer": sourceL, //quaternari
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
          //  console.log("newLayer?:", newLayer);
          // map.setFilter(`${highId}_highlight`, ["in", "IDABS", itemStore.idabs] );

          map.setFilter(`${highId}_highlight`, new_Filter);
          //  console.log('despres')//map.removeSource('polygon_highlighted1')
        }

        if (itemStore.id === "polygonsQt") {
          // console.log('poligon quaternari', itemStore)
          let highId = itemStore.item.layer.id;
          let originalFilter = itemStore.item.layer.filter;
          var new_Filter = [
            "all",
            ["in", "_symbol", originalFilter[2]],
            ["in", "IDABS", itemStore.idabs],
          ];
          var layers = map.getStyle().layers;
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
            if (
              layers[i].id ===
              "Dipòsits quaternaris/Unitats geològiques del quaternari/FILLq/QHac"
            ) {
              firstSymbolId = layers[i].id;

              break;
            }
          }
          map.addLayer(
            {
              id: `${highId}_highlight`,
              type: "fill",
              source: "infogeo",
              "source-layer": "FILLq", //quaternari
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
          // console.log("poligon basemenet", itemStore);

          let highId = itemStore.item.layer.id;
          // console.log("poligon highId", highId);
          let originalFilter = itemStore.item.layer.filter;
          var new_Filter = [
            "all",
            ["in", "_symbol", originalFilter[2]],
            ["in", "IDABS", itemStore.idabs],
          ];
          var layers = map.getStyle().layers;
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
            if (
              layers[i].id ===
              "Basament prequaternari/Unitats geològiques del basament/FILL/CACe"
            ) {
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
              "source-layer": "FILL", //basament
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
      // console.log('uee', itemStore)
      myBlueLayer = []; // reset del bluelayer
      if (map && itemStore) {
        //  let blue = '#01f7f7'
        let blue = "#00fff2";
        // let blue = "#8AFDE3";
        // console.log('oo', itemStore)
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
        // console.log("CHANGE TO INITIAL COLOR PATTERN", itemStore);
        if (newLayer !== "") {
          // console.log("newLayerOLD", newLayer);
          map.removeLayer(newLayer); //funciona OK
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
    height: 100vh;
  }
</style>

<div id="map" bind:this={container}>
  {#if map}
    <slot />
    <Logo_map />
  {/if}
</div>
