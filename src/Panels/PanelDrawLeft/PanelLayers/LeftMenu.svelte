
 <script>
    import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
    import Button, {Label} from '@smui/button';
    import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
    import H6 from '@smui/common/H6.svelte';
    //import PanelIntro from './PanelIntro.svelte';
    import PanelSearchBar from "../../PanelSearchBar/PanelSearchBar.svelte";
    import { createEventDispatcher } from 'svelte';
    import { stateDrawerIntro } from "../../../Utils/stores.js";
    const dispatch = createEventDispatcher();
    let clicked = 'nothing yet';
    let myDrawer;
    let myDrawerOpen = false;
    let active = 'Gray Kittens';
    let myDrawer2;
    import PanelOverLayers from "../../PanelIconMenu/PanelOverLayers.svelte"
    
    export let myDrawer2Open = false;

  </script>
  
  <style>
  #container{
    z-index: 2;
    position: absolute;
    left: 0;
    width: 340px;
    /* top: 46px; */
    /* width: 250px; */
    /* height: -webkit-fill-available; */
    /* background-color: rgba(0,0,0,1); */
    background-color: white;
    height: 99%;
    overflow-y: auto;
    overflow-x: hidden;
    
  }
  #container_ppal{
    z-index: 2;
    position: absolute;
    left: 0;
    top: 46px;
    width: 250px;
    height: 96% ;
    /* background-color: rgba(0,0,0,1); */
    background-color: white;
    /* height: 924px; */
    /* overflow-y: auto; */
    font-family: Arial, Helvetica, sans-serif;
    
  }
  @media (max-width: 624px) {
    #container_ppal{
    width: 200px;
  }
  #container{
    width: 200px;
   
  }
  }
  @media (max-width: 500px) {
    #container_ppal{
    width: 200px;
    font-size: small;
  }
  #container{
    width: 200px;
    font-size: small;
  
  }
  }
  @media (max-width: 321px) {
    #container_ppal{
    width: 200px;
    font-size: small;
  }
  #container{
    width: 200px;
    font-size: small;
  }
  }
  </style>
   <div id="container_ppal">
  <div id="container">

      
  
 
      <PanelOverLayers />

       
      </div>
   </div>
       
      
   
  