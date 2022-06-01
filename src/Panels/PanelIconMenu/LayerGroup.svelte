<script>
  import { getContext } from "svelte";
  import LayerCheckBox from "./LayerCheckBox.svelte";
  import Checkbox from "@smui/checkbox";
  import { columnes } from "../../config";
  import FormField from "@smui/form-field";
  import SliderOpacity from "../PanelIconMenu/SliderOpacity.svelte";
  import IconButton, { Icon } from "@smui/icon-button";
  // import { Button, Icon, MaterialApp } from 'svelte-materialify';
  // import { mdiHome, mdiAlert, mdiPen, mdiCloud } from '@mdi/js';
import InfoBox from "./InfoBox.svelte";
import Hoverable from './Hoverable.svelte';
  export let layer;
let showinfo = false;
  let display = false;
  let activated = true;
  let displayy = false;
  export let labelArray; 


  function colapseGroup() {

    display = !display;
    if (!display){
    showinfo = false
  }}
  function colapseGroupCol() {
    displayy = !displayy;
    
  }
  function removeInfoBox(){
// console.log('j')
  }
  function showInfoBox () {
    // console.log('entro info box')
    showinfo = false
      // showinfo = !showinfo
      let lyr = layer.groupLabel
      // console.log('uu', labelArray, lyr)
      if (labelArray === lyr) {
     
        labelArray= ''   
        // console.log('si incluye', labelArray)
      } else {
     
         labelArray =lyr;   
         showinfo = true
        //  console.log('no incluye', labelArray)
      }
 }

  let slider_show = true;
  const activateLayerGroup = getContext("activateLayerGroup");
</script>

<style>
  .multiselect {
    /* width: 85%; */
    padding-bottom: 10PX;
    font-family: Arial, Helvetica, sans-serif;
    
  }

  .selectBox {
    position: relative;
    cursor: pointer;
    
  }
.select{
  margin: 0px !important;
  font-size: smaller;
}
.overSelect:hover{
  border-radius: 11px;    
  border-color: #fff35d70;
    border-style: solid;
}
.overSelect:active{
  border-radius: 11px;    
  border-color: #fff35d70;
  border-style: inset;
}
.overSelect:focus{
  border-radius: 11px;    
  border-color: #fff35d70;
    border-style: solid;
}
  .selectBox select {
    width: 100%;
    font-weight: bold;
  }

  .overSelect {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .checkboxes {
    /* border: 1px #dadada solid; */
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding-right: 30px;
    width: 80%;
  }

  .headCheck {
    font-size: 14px;
    font-weight: bold;
    color:rgb(0, 0, 0)
  }
  .field{
  width: 100% !important;
  padding-left: 100px;
}
.indentedfield{

}
.iButon{
  float: right;
}

</style>

<form>
  <div class="multiselect" >
    <div style="display: flex;
    height: 32px;">

        <div style="width:100%" class="selectBox" on:click={colapseGroup}>
          <select class="select" style="border-radius: 11px;    border-color: transparent;
          background-color: #e5e5bf;">

            <option>{layer.groupLabel}</option>
      
          </select>
        
          <div class="overSelect" />
        </div>


      <div style="position:relative;right:-12px;cursor:pointer" on:click={showInfoBox} title="Informació de la capa">
            <!-- <IconButton style="position:relative;right:-3px;top:-10px" on:click={removeInfoBox}> -->
            <Icon style="font-size: 25px " class=" material-icons  "> info_outlined </Icon>

          <!-- </IconButton> -->

      </div>
  

    </div>

   
    {#if display}
      <div id={layer.groupId} class="checkboxes">
        {#if layer.groupId !=="opt_elements" }       
<div >
        <FormField>
          <Checkbox
          indeterminate={true}
            bind:checked={activated}
            class="indentedfield"
            on:change={() => activateLayerGroup(layer, activated)} />
       
        <span class="headCheck" slot="label">Visualitza-ho tot </span>
       
        </FormField>
        
    </div>
{/if}
  {#each layer.items as item, index}
{#if item.label ==="Columnes estratigràfiques" }

{#each columnes as column, index}
<form>
  <div class="multiselect"  style="    margin-left: 18px;
  margin-top: 8px;width:98%" >
    <div style="display: flex;
    height: 32px">

        <div style="width:100%; " class="selectBox" on:click={colapseGroupCol}>
          <select class="select" style="  border-style: none;">

            <option >{column.groupLabel}</option>
      
          </select>
        
          <div class="overSelect"  />
        </div>



    </div>

  
    {#if displayy}
      <div id={column.groupId} class="checkboxes">
<!-- <div >
  <div >
    <FormField>
      <Checkbox
      indeterminate={true}
        bind:checked={activated}
        class="indentedfield"
        on:change={() => activateLayerGroup(layer, activated)} />
   
    <span class="headCheck" slot="label">Visualitza totes les columnes</span>
   
    </FormField>
    
  </div>
    </div> -->

  {#each column.items as item, index}



    <LayerCheckBox  {item} {activated} />

      
  {/each}


      

      </div>
    {/if}
  </div>
</form>
{/each}




{:else}
    <LayerCheckBox  {item} {activated} />
{/if}
      
        {/each}


      

      </div>
    {/if}
  </div>


  <InfoBox groupLabel={layer.groupLabel} showinfo={showinfo} {labelArray}/>
</form>


<!-- <InfoBox groupLabel={layer.groupLabel} showinfo={showinfo} {labelArray}/> -->
