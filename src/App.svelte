<script>
  // import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
  // import "https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css";

  import { onDestroy, onMount, setContext, getContext } from "svelte";
  import {
    stateDrawer,
    activateLayerStore,
    changeBaseLayerStore,
    changePaintPropertyStore,
    changeColorPropertyStore,
    changeInitialColorPropertyStore,
    changePlaceStore,
    changeHighlightItemStore,
    stateDrawerIntro,
    stateTallDrawer,
  } from "./Utils/stores.js";
  import ButtonHome from "./Panels/PanelTopBar/ButtonHome.svelte";
  import { keyApp, baseLayers, layerTree } from "./config";
  import PanelTopBar from "./Panels/PanelTopBar/PanelTopBar.svelte";
  import PanelIconMenu from "./Panels/PanelIconMenu/PanelIconMenu.svelte";
  import Map from "./Components/Map/Map.svelte";
  import MapDisplayControls from "./Components/MapControls/MapDisplayControls.svelte";
  import MapOverlayLayers from "./Components/MapOverLayers/MapOverLayers.svelte";
  import ConsultaPopUp from "./Components/MapPopup/ConsultaPopUp.svelte";
  import LegendIcon from "./Components/Llegenda/LegendIcon.svelte";
  import Footer from "./Panels/PanelFooter/Footer.svelte";
  import overLayersStyle from "./infogeo_v7_style.json";
  import LeftMenu from "../src/Panels/PanelDrawLeft/PanelLayers/LeftMenu.svelte";
  import PanelTall from "./Panels/PanelTall/DrawerBottom.svelte";
  import { element } from "svelte/internal";

  //import estilTopo from "./topo.json";

  let toggle = false;
  let openModalInfo;
  let overLayers = { ...overLayersStyle };
  const estilTopo = baseLayers[0].url;
  
  let activeLayerMap = null;
  const unsubscribe = stateDrawer.subscribe((value) => {
    toggle = value;
  });
  //iniciem

  onMount(async () => {

    // layerTree.forEach((element) => {
    //   if (
    //     element.groupId === "opt_basament" ||
    //     element.groupId === "opt_quaternari"
    //   ) {
    //   } else {
    //     // activateLayerGroup(element,visib)
       
    //     activ(element)
    //     // setTimeout(() => {
    //     //   activateLayerGroup(element, visib), 59000;
    //     // });
      

    //   }
    // });
  });

  //iniciem fin
  function activateLayer(item, visible) {
    // console.log('elemen', item)
    const vis = visible ? "visible" : "none";
    let ly;

    let array = item.value.split(",");
    array.forEach((capa) => {
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element["source-layer"] === capa) {
            ly = element.id;
            element.layout.visibility = vis;
            activateLayerStore.set({ ly, vis });
          }
        }
      });
    });
  }

  function activateLayerGroup(group, visible) {
    // console.log('elemen', group)
    group.items.forEach((element) => {
      activateLayer(element, visible);
    });
  }

  function changeBaseLayer(base) {
    changeBaseLayerStore.set(base.url);
  }

  function changePlace(coords) {
    changePlaceStore.set(coords);
  }

  function changeColorProperty(item) {
    let ly;
    let op;
    let ty;
    let idabs;
    overLayers.layers.forEach((element) => {
      if (element.layout && element.layout.visibility) {
        // console.log('iiiiiiiiiiiiii', item)
        if (element.id === item.layer.id) {
                  //  console.log("poligon", item.properties);

          // console.log("eleee", element);
          ly = element.id;
          op = element.paint;
          idabs = item.properties.ID_MAPA;
          ty = element.type;

          if (element.id.includes('Terrenys')) {
            // console.log('terrenys', element, item)
            idabs = item.properties.CODI_CAS;
            // changeColorPropertyStore.set({ ly, op, ty });
            changeHighlightItemStore.set({ item, ly, op, idabs, ty });
          }
          if (element.id !== "Talls geològics/Traces de talls geològics/5704" && !element.id.includes('Terrenys')) {
            // console.log('no tall', element, item)
            idabs = item.properties.CODI_CAS;
            changeColorPropertyStore.set({ ly, op, ty });
            changeHighlightItemStore.set({ item, ly, op, idabs, ty });
          } 
          else {
            // console.log('si tall')
            idabs = item.properties.NOM_TALL;
            changeHighlightItemStore.set({ item, ly, op, idabs, ty });
          }
        }
      }
    });
    // if (item.layer["source-layer"] === "Terrenys modificats") {
    //   console.log("MODIFICATS", item);
    //   overLayers.layers.forEach((element) => {
    //     if (element.layout && element.layout.visibility) {
    //       if (element.id === item.layer.id) {
    //         // console.log("poligon0000000000000000000", item.properties.IDABS);

    //         //console.log('poligon', item._vectorTileFeature._geometry)
    //         let id;
    //         let nom;
    //         id = "modificats";

    //         nom = item.properties.CODI_CAS;

    //         changeHighlightItemStore.set({ item, id, nom });
    //       }
    //     }
    //   });
    // }
    if (item.layer["source-layer"].includes('Terrenys')) {
      // console.log("REBAIXATSSSSS", item);
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element.id === item.layer.id) {
            // console.log("poligon0000000000000000000", item.properties.IDABS);

            //console.log('poligon', item._vectorTileFeature._geometry)
            let id;
            let nom;
            id = "antropics";

            nom = item.properties.CODI_CAS;

            changeHighlightItemStore.set({ item, id, nom });
          }
        }
      });
    }
    // if (item.layer["source-layer"] === "Terrenys terraplenats") {
    //   console.log("TERRAPLANATS", item);
    //   overLayers.layers.forEach((element) => {
    //     if (element.layout && element.layout.visibility) {
    //       if (element.id === item.layer.id) {
    //         // console.log("poligon0000000000000000000", item.properties.IDABS);

    //         //console.log('poligon', item._vectorTileFeature._geometry)
    //         let id;
    //         let nom;
    //         id = "terraplenats";

    //         nom = item.properties.CODI_CAS;

    //         changeHighlightItemStore.set({ item, id, nom });
    //       }
    //     }
    //   });
    // }
    if (item.layer["source-layer"] === "Traces de talls geològics") {
      // console.log("item1", item);
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element.id === item.layer.id) {
            // console.log("poligon0000000000000000000", item.properties.IDABS);

            //console.log('poligon', item._vectorTileFeature._geometry)
            let id;
            let nom;
            id = "talls";

            nom = item.properties.NOM_TALL;

            changeHighlightItemStore.set({ item, id, nom });
          }
        }
      });
    }

    if (item.layer["id"].includes("Columnes")) {
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element.id === item.layer.id) {
            // console.log("poligon0000000000000000000", item.properties.IDABS);

            //console.log('poligon', item._vectorTileFeature._geometry)
            let id;
            let idabs;
            id = "polygonColumnes";

            idabs = item.properties.IDABS;

            changeHighlightItemStore.set({ item, id, idabs });
          }
        }
      });
    }
    if (
      item.layer["source-layer"] === "Esquemes de relacions estratigràfiques"
    ) {
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element.id === item.layer.id) {
            // console.log("poligon0000000000000000000", item.properties.IDABS);

            //console.log('poligon', item._vectorTileFeature._geometry)
            let id;
            let idabs;
            id = "polygonEsquemes";

            idabs = item.properties.IDABS;
            // console.log('esquemesss', idabs)
            changeHighlightItemStore.set({ item, id, idabs });
          }
        }
      });
    }

    if (item.layer["source-layer"] === "FILLq") {
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element.id === item.layer.id) {
            // console.log("poligon0000000000000000000", item.properties.IDABS);

            //console.log('poligon', item._vectorTileFeature._geometry)
            let id;
            let idabs;
            id = "polygonsQt";

            idabs = item.properties.IDABS;

            changeHighlightItemStore.set({ item, id, idabs });
          }
        }
      });
    }

    if (item.layer["source-layer"] === "FILL") {
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element.id === item.layer.id) {
            //console.log("poligon0000000000000000000", item.properties.IDABS);

            //console.log('poligon', item._vectorTileFeature._geometry)
            let id;
            let idabs;
            id = "polygonsBs";

            idabs = item.properties.IDABS;

            changeHighlightItemStore.set({ item, id, idabs });
          }
        }
      });
    }

    //     let ly;
    //     let op;
    //     let ty;
    //     let idabs;
    //     overLayers.layers.forEach(element => {

    //       if (element.layout && element.layout.visibility) {

    //         if (element.id === item.layer.id) {
    //  console.log('poligon', item.properties.IDABS)

    //  console.log('eleee', element)
    //            ly = element.id;
    //           op =  element.paint;
    //          idabs = item.properties.IDABS
    //           ty = element.type

    //           changeColorPropertyStore.set({ ly, op , ty});
    //           changeHighlightItemStore.set({item,ly,op,idabs,ty})

    //         }

    //       }
    //     });
  }

  function changeInitialColorProperty(item) {
    // console.log('item', item)

    let ly;
    let op;
    let ty;
    overLayers.layers.forEach((element) => {
      if (element.layout && element.layout.visibility) {
        //console.log('eleemnt', element)

        if (element.id === item.layer.id) {
          // console.log('iiiieeee', item.layer.id)
          //console.log('entro',element.paint["fill-color"])
          ly = element.id;
          op = element.paint;
          ty = element.type;

          changeInitialColorPropertyStore.set({ ly, op, ty });
        }
      }
    });
  }

  function changePaintProperty(item, value) {
    let ly;
    let op;
    // console.log(item)
    if (item.value === "FILLq,PATT1q,LABELq/label") {
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element["source-layer"] === "FILLq") {
            ly = element.id;
            op = parseFloat(value / 100);
            element.paint["fill-opacity"] = op;

            changePaintPropertyStore.set({ ly, op });
          }
          if (element["source-layer"].includes("PATTq")) {
            ly = element.id;
            op = parseFloat(value / 100);
            element.paint["fill-opacity"] = op;

            changePaintPropertyStore.set({ ly, op });
          }
        }
      });
    }
    if (item.value === "FILL,PATT1,PATT2,PATT3,PATT4,LABEL/label") {
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element["source-layer"] === "FILL") {
            ly = element.id;
            op = parseFloat(value / 100);
            element.paint["fill-opacity"] = op;

            changePaintPropertyStore.set({ ly, op });
          }
          if (element["source-layer"].includes("PATT")) {
            ly = element.id;
            op = parseFloat(value / 100);
            element.paint["fill-opacity"] = op;

            changePaintPropertyStore.set({ ly, op });
          }
         
        }
      });
    }
    if (
      item.value ===
      "Columnes del Paleozoic,Columnes del Mesozoic,Paleogen LINK,Paleogen NO LINK,Neogen LINK,Neogen NO LINK"
    ) {
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (
            element["source-layer"] === "Columnes del Paleozoic" ||
            element["source-layer"] === "Columnes del Mesozoic" ||
            element["source-layer"] === "Paleogen LINK" ||
            element["source-layer"] === "Paleogen NO LINK" ||
            element["source-layer"] === "Neogen LINK" ||
            element["source-layer"] === "Neogen NO LINK"
          ) {
            // console.log('ele', element,value)
            ly = element.id;
            op = parseFloat(value / 100);

            element.paint["fill-opacity"] = op;
            //console.log('jj1222', element.paint)
            changePaintPropertyStore.set({ ly, op });
          }
        }
      });
    }
  }

  function changeStateTallDrawer(tall) {
    stateTallDrawer.set(tall);
  }

  setContext("overLayers", overLayers);
  setContext("activateLayer", activateLayer);
  setContext("activateLayerGroup", activateLayerGroup);
  setContext("changeBaseLayer", changeBaseLayer);
  setContext("estilTopo", estilTopo);
  setContext("changePaintProperty", changePaintProperty);
  setContext("changeColorProperty", changeColorProperty);
  //setContext("changeHighlightItem", changeHighlightItem);
  setContext("changeInitialColorProperty", changeInitialColorProperty);
  setContext("changePlace", changePlace);
  setContext("stateTallDrawer", stateTallDrawer);
</script>

<style>
  .container {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>

<div class="container">
  <PanelTopBar bind:openModalInfo />
  <PanelIconMenu />
  <Map
    lat={41.763}
    lon={1.443}
    zoom={7.58}
    maxZoom={15.8}
  
    pitch={0}
    bearing={0}
    style={estilTopo}>
    <!-- <Map lat={41.732} lon={1.732} zoom={8} maxZoom={15} style={estilTopo}> -->
    <MapDisplayControls />
    <!-- <LeftMenu /> -->
    <MapOverlayLayers />
    <ConsultaPopUp />
    <!-- <ButtonHome /> -->
    <!-- <Footer /> -->
    <!-- <LegendIcon /> -->
  </Map>
  <!-- <PanelTall /> -->
</div>
