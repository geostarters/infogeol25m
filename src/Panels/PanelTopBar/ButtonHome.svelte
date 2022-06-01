<script>
    import { onMount, getContext } from "svelte";
    //import { keyApp } from "../../config";
    import { keyApp } from "../../config";
    import  { mapbox } from '../../Components/Map/mapbox';
    import Fa from "svelte-fa";
    import { miraCentreDins } from "../../Utils/Utils.svelte"
    import {
      faWind,faCube, faWater
    } from "@fortawesome/free-solid-svg-icons";
    import Icon from "@smui/textfield/icon/index";
    import IconButton from "@smui/icon-button";

  // console.log('w', window.width)
  let button3d = false;
  let seaCurrent = false;
//   const letWindyShow = getContext("letWindyShow");
//   const letCurrentShow = getContext("letCurrentShow");
//   const letshowthewind = getContext("letshowthewind");
//   const letNoshowthewind = getContext("letNoshowthewind");
    const { getMap } = getContext(keyApp);
    const map = getMap();


let pit = undefined
//  onMount(async () => {
 

//     //     console.log('abans', highliItem)
//     map.on("pitchend", function (e) {
//       setTimeout(() => {
      
        

     
//       let ur  = map['_canvas']['baseURI']
//       let purl = ur.toString()
//       purl = purl.split("/");
   
// if (purl.length > 7){

//   button3d = true
// }else{
 
//   button3d = false
// }

//     }, 250);




      
//     })

//     })



//     onChange( () => {
//       console.log('canvi')
// pit = map['_easeOptions']['pitch']
// console.log(map['_easeOptions']['pitch'])
//     })
   let windy = true
    function getWind(){
          windy = !windy
          letWindyShow()
          if (windy){
            button3d=false
            seaCurrent = false
          }
    }
  
    function getCurrent(){
      seaCurrent = !seaCurrent
      //  letWindyShow()
       letCurrentShow()
          if (seaCurrent){
            button3d=false
            windy =false
          }
    }
    function flyHome(){
      // console.log('1')
        map.flyTo({
            center: [3.29076, 42.30306],
        zoom: 12.87,
        pitch: 0, // pitch in degrees
        bearing: 0,
            });
    }
    function see2d(){
      
      // console.log('entro per canviar a 2d')
      button3d=false
      map.easeTo({ pitch: 0, bearing: 0 });
      map.setTerrain();
      // letWindyShow()
    }
    function see3d(){
      // console.log('3')
      button3d=true
      // console.log('entro per canviar a 3d')
      // windy = false
      map.easeTo({ pitch: 70, bearing: 10 });
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
    
      // console.log('2', map['_easeOptions']['pitch'])
      // letNoshowthewind()
      
      // letWindyShow()
    }
    
  </script>
  
  <style>
  
  .buttonHome{
    z-index: 100;
      top: 77px;
      right: 16px;
      position: absolute;
  }
  .divButtons{
    z-index: 100;
  bottom: 38%;
  right: -6px;
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 158px;
  background-color: white;
  border-radius: 8px;
  width: 51px;
  }
  .iconi{
    padding-left: 10px;
  }
  @media (max-width: 500px) {
    .divButtons{
    z-index: 100;
  bottom: 32%;
  right: -4px;
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 158px;
  /* background-color: white; */
  border-radius: 8px;
  width: 37px;
  }
  }
  </style>
  
  
  
  
  {#if window.innerWidth >500}
  <!-- <div class="divButtons" > -->
  <div style="        z-index: 100;
  bottom: 38%;
  right: 8px;
  position: absolute;
  display: flex;
  flex-direction: column;

  height: auto;
  background-color: white;
  border-radius: 19px;
  ">
  <!-- <IconButton title="Torna a la vista inicial" class="buttonSurt" on:click={flyHome}>
    <Icon
   
      style="    color: black;
      
      padding: 0px;
      
      border-radius: 49px;"
      class="material-icons iconaSurt iconi">
      home
    </Icon>
  </IconButton> -->
  {#if button3d}
  <IconButton title="3D/2D" class="buttonSurt" on:click={see2d}>
    <Fa
    icon={faCube}
    size="2x"
    id="bt3D"
    class="iconi  on3d"
    style="      color: blue;
    top: -13px;
    position: relative;
    padding: 0px;
    
    border-radius: 49px;" /> <p style="bottom: 43px;
    position: relative;
    font-size: 17px;color: blue">3D</p>
  </IconButton>
  {:else}
  <IconButton title="3D/2D" class="buttonSurt" on:click={see3d}>
    <Fa
    icon={faCube}
    class="iconi off"
    size="2x"
    id="bt3D"
    style="     color: grey;
    top: -13px;
    position: relative;
    padding: 0px;
    
    border-radius: 49px;" />
    <p style="bottom: 43px;
    position: relative;
    font-size: 17px; color: grey">3D</p>
  </IconButton>
  {/if}
  
  <!-- {#if !windy}
  
  <IconButton title="Anima el vent en 2D" class="buttonSurt" on:click={getWind}>
    <Fa
    icon={faWind}
    size="2x"
    style="      color: grey;
      
    padding: 0px;
    
    border-radius: 49px;" /> 
  </IconButton>
  {:else}
  
  <IconButton title="Anima el vent en 2D" class="buttonSurt" on:click={getWind}>
    <Fa
    icon={faWind}
    size="2x"
    style="      color: blue;
      
    padding: 0px;
    
    border-radius: 49px;" />
  </IconButton>
  {/if} -->
  
  <!-- {#if !seaCurrent}
  
  <IconButton title="Anima la mar de fons en 2D" class="buttonSurt" on:click={getCurrent}>
    <Fa
    icon={faWater}
    size="2x"
    style="      color: grey;
      
    padding: 0px;
    
    border-radius: 49px;" /> 
  </IconButton>
  {:else}
  
  <IconButton title="Anima la mar de fons en 2D" class="buttonSurt" on:click={getCurrent}>
    <Fa
    icon={faWater}
    size="2x"
    style="      color: blue;
      
    padding: 0px;
    
    border-radius: 49px;" />
  </IconButton>
  {/if} -->
  
  </div>
  {/if}
  
  <!-- MENYS DE 500PX WIDTH -->
  {#if window.innerWidth <500}
  <!-- <div class="divButtons" > -->
  <div style="z-index: 10000;
  bottom: 35%;
  /* width: 70%; */
  right: 7px;
  height: 10px;
  opacity: 1.6;
  position: absolute;
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 11px 3px rgb(143 154 154 / 68%), 0 6px 20px 0 rgb(243 243 243 / 0%);
  border-radius: 10px;">
  <!--background: linear-gradient( 
    180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 24%, rgb(236 236 236) 24%,rgb(252 253 253) 100%)">
   <div style="        z-index: 100;
  bottom: 32%;
  right: -4px;
  position: absolute;
  display: flex;
  flex-direction: column;
  height: auto;
  background-color: white;
  border-radius: 10px;
  }"> -->
  <!-- <IconButton title="Torna a la vista inicial" class="buttonSurt" on:click={flyHome}>
    <Icon
   
      style="    color: black;
      
      position: relative;
      padding: 0px;
      font-size: 28px;
      
      border-radius: 49px;
  "
      class="material-icons iconaSurt iconi">
      home
    </Icon>
  </IconButton> -->
  {#if button3d}
  <IconButton title="3D/2D" class="buttonSurt" on:click={see2d}>
    <Fa
    icon={faCube}
    size="1x"
    id="bt3D"
    class="iconi iconi on3d"
    style="      color: blue;
    
    top: -10px;
    position: relative;
    padding: 0px;
    padding-top: 7px;
    right: 6px;
    border-radius: 49px;" /> <p style="bottom: -13px;
    right: 5px;
    position: absolute;
    font-size: 15px;color: blue">3D</p>
  </IconButton>
  {:else}
  <IconButton title="3D/2D" class="buttonSurt" on:click={see3d}>
    <Fa
    icon={faCube}
    class="iconi off"
    size="1x"
    id="bt3D"
    style="     color: grey;
    top: -10px;
    position: relative;
    padding: 0px;
    padding-top: 7px;
    right: 6px;
    border-radius: 49px;" />
    <p style="bottom: -13px;
    right: 5px;
    position: absolute;
    font-size: 15px; color: grey">3D</p>
  </IconButton>
  {/if}
<!--   
  {#if !windy}
  
  <IconButton title="Anima el vent en 2D" class="buttonSurt" on:click={getWind}>
    <Fa
    icon={faWind}
    size="1x"
    style="      color: grey;
      
    padding: 0px;
  
    position: relative;
    border-radius: 49px;" /> 
  </IconButton>
  {:else}
  
  <IconButton title="Anima el vent en 2D" class="buttonSurt" on:click={getWind}>
    <Fa
    icon={faWind}
    size="1x"
    style="      color: blue;
   
    position: relative;
    padding: 0px;
    
    border-radius: 49px;" />
  </IconButton>
  {/if}
  
  
  {#if !seaCurrent}
  
  <IconButton title="Anima el vent en 2D" class="buttonSurt" on:click={getCurrent}>
    <Fa
    icon={faWater}
    size="1x"
    style="      color: grey;
  
    padding: 0px;
  
    position: relative;
    border-radius: 49px;" /> 
  </IconButton>
  {:else}
  
  <IconButton title="Anima el vent en 2D" class="buttonSurt" on:click={getCurrent}>
    <Fa
    icon={faWater}
    size="1x"
    style="      color: blue;
  
    position: relative;
    padding: 0px;
    
    border-radius: 49px;" />
  </IconButton>
  {/if} -->
  
  </div>
  {/if}
  