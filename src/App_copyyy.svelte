<script>
  // import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
  // import "https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css";

  import { onDestroy, setContext, getContext } from "svelte";
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

  import { keyApp, baseLayers } from "./config";
  import PanelTopBar from "./Panels/PanelTopBar/PanelTopBar.svelte";
  import PanelIconMenu from "./Panels/PanelIconMenu/PanelIconMenu.svelte";
  import Map from "./Components/Map/Map.svelte";
  import MapDisplayControls from "./Components/MapControls/MapDisplayControls.svelte";
  import MapOverlayLayers from "./Components/MapOverLayers/MapOverLayers.svelte";
  import ConsultaPopUp from "./Components/MapPopup/ConsultaPopUp.svelte";
  import LegendIcon from "./Components/Llegenda/LegendIcon.svelte";
import Footer from "./Panels/PanelFooter/Footer.svelte";
  import overLayersStyle from "./infogeo_v6_style.json";
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

  function activateLayer(item, visible) {
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
        if (element.id === item.layer.id) {
//          // console.log("poligon", item.properties.IDABS);

//           //console.log("eleee", element);
          ly = element.id;
          op = element.paint;
          idabs = item.properties.IDABS;
          ty = element.type;
if(item.layer.id !== "Talls Geològics/5704" || item.layer.id !== "Talls Geològics/5704_highlighted"){
    changeColorPropertyStore.set({ ly, op, ty });
}
       
          changeHighlightItemStore.set({ item, ly, op, idabs, ty });
        }
      }
    });

    
    //console.log("itemLayer", item.layer["source-layer"]);
    // if (item.layer.id == "Talls Geològics/5704") {
    //   console.log("item1", item);
    //   let id;
    //   let id_high;
    //   let filter;
    //   id = "Talls Geològics/5704";
    //   id_high = "Talls Geològics/5704_highlighted";
    //   filter = "NOM_TALL";
    //   changeHighlightItemStore.set({ item, id, id_high, filter });
    // }



    if (item.layer["source-layer"] === "Talls Geològics") {
     
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




    if (item.layer["source-layer"] === "Unitats geològiques del quaternari") {
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

    if (item.layer["source-layer"] === "Unitats geològiques del basament") {
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
    //console.log('item', item)

    let ly;
    let op;
    let ty;
    overLayers.layers.forEach((element) => {
      if (element.layout && element.layout.visibility) {
        //console.log('eleemnt', element)

        if (element.id === item.layer.id) {
          //console.log('iiiieeee', item.layer.id)
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
    if (item.value === "Unitats geològiques del quaternari,Unitats geològiques del quaternari/label") {
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element["source-layer"] === "Unitats geològiques del quaternari") {
            ly = element.id;
            op = parseFloat(value / 100);
            element.paint["fill-opacity"] = op;

            changePaintPropertyStore.set({ ly, op });
          }
        }
      });
    }
    if (item.value === "Unitats geològiques del basament,Unitats geològiques del basament/label") {
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element["source-layer"] === "Unitats geològiques del basament") {
            ly = element.id;
            op = parseFloat(value / 100);
            element.paint["fill-opacity"] = op;

            changePaintPropertyStore.set({ ly, op });
          }
        }
      });
    }
    // if (item.value === "Contactes:1") {
    //   overLayers.layers.forEach((element) => {
    //     if (element.layout && element.layout.visibility) {
    //       if (element["source-layer"] === "Contactes:1" && element["type"] === "line") {
    //         ly = element.id;
    //         op = parseFloat(value / 100);

    //         element.paint["line-opacity"] = op;
    //         //console.log('jj1222', element.paint)
    //         changePaintPropertyStore.set({ ly, op });
    //       }
    //     }
    //   });
    // }
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
    font-family: 'Fira Sans', sans-serif;
  }
</style>

<div class="container">
  <PanelTopBar bind:openModalInfo />
  <PanelIconMenu />
  <Map lat={41.763} lon={1.443} zoom={7.58} maxZoom={16} style={estilTopo}>
    <!-- <Map lat={41.732} lon={1.732} zoom={8} maxZoom={15} style={estilTopo}> -->
    <MapDisplayControls />
    <!-- <LeftMenu /> -->
    <MapOverlayLayers />
    <ConsultaPopUp />
    <Footer />
    <!-- <LegendIcon /> -->
  </Map>
  <!-- <PanelTall /> -->
  
</div>
